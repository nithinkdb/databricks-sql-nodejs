import { TGetOperationStatusResp, TOperationHandle, TOperationState } from '../../thrift/TCLIService_types';
import HiveDriver from '../hive/HiveDriver';
import Status from '../dto/Status';
import { WaitUntilReadyOptions } from '../contracts/IOperation';
import OperationStateError, { OperationStateErrorCode } from '../errors/OperationStateError';

async function delay(ms?: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export default class OperationStatusHelper {
  private readonly driver: HiveDriver;

  private readonly operationHandle: TOperationHandle;

  private state: number = TOperationState.INITIALIZED_STATE;

  // Once operation is finished or fails - cache status response, because subsequent calls
  // to `getOperationStatus()` may fail with irrelevant errors, e.g. HTTP 404
  private operationStatus?: TGetOperationStatusResp;

  public hasResultSet: boolean = false;

  constructor(driver: HiveDriver, operationHandle: TOperationHandle, operationStatus?: TGetOperationStatusResp) {
    this.driver = driver;
    this.operationHandle = operationHandle;
    this.hasResultSet = operationHandle.hasResultSet;

    if (operationStatus) {
      this.processOperationStatusResponse(operationStatus);
    }
  }

  private isInProgress(response: TGetOperationStatusResp) {
    switch (response.operationState) {
      case TOperationState.INITIALIZED_STATE:
      case TOperationState.PENDING_STATE:
      case TOperationState.RUNNING_STATE:
        return true;
      default:
        return false;
    }
  }

  private processOperationStatusResponse(response: TGetOperationStatusResp) {
    Status.assert(response.status);

    this.state = response.operationState ?? this.state;

    if (typeof response.hasResultSet === 'boolean') {
      this.hasResultSet = response.hasResultSet;
    }

    if (!this.isInProgress(response)) {
      this.operationStatus = response;
    }

    return response;
  }

  public async status(progress: boolean): Promise<TGetOperationStatusResp> {
    if (this.operationStatus) {
      return this.operationStatus;
    }

    const response = await this.driver.getOperationStatus({
      operationHandle: this.operationHandle,
      getProgressUpdate: progress,
    });

    return this.processOperationStatusResponse(response);
  }

  private async isReady(options?: WaitUntilReadyOptions): Promise<boolean> {
    const response = await this.status(Boolean(options?.progress));

    if (options?.callback) {
      await Promise.resolve(options.callback(response));
    }

    switch (response.operationState) {
      case TOperationState.INITIALIZED_STATE:
        return false;
      case TOperationState.PENDING_STATE:
        return false;
      case TOperationState.RUNNING_STATE:
        return false;
      case TOperationState.FINISHED_STATE:
        return true;
      case TOperationState.CANCELED_STATE:
        throw new OperationStateError(OperationStateErrorCode.Canceled, response);
      case TOperationState.CLOSED_STATE:
        throw new OperationStateError(OperationStateErrorCode.Closed, response);
      case TOperationState.ERROR_STATE:
        throw new OperationStateError(OperationStateErrorCode.Error, response);
      case TOperationState.TIMEDOUT_STATE:
        throw new OperationStateError(OperationStateErrorCode.Timeout, response);
      case TOperationState.UKNOWN_STATE:
      default:
        throw new OperationStateError(OperationStateErrorCode.Unknown, response);
    }
  }

  public async waitUntilReady(options?: WaitUntilReadyOptions): Promise<void> {
    if (this.state === TOperationState.FINISHED_STATE) {
      return;
    }
    const isReady = await this.isReady(options);
    if (!isReady) {
      await delay(100); // add some delay between status requests
      return this.waitUntilReady(options);
    }
  }
}
