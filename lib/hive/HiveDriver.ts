import TCLIService from '../../thrift/TCLIService';
import {
  TOpenSessionReq,
  TCloseSessionReq,
  TExecuteStatementReq,
  TGetResultSetMetadataReq,
  TFetchResultsReq,
  TGetInfoReq,
  TGetTypeInfoReq,
  TGetCatalogsReq,
  TGetSchemasReq,
  TGetTablesReq,
  TGetTableTypesReq,
  TGetColumnsReq,
  TGetFunctionsReq,
  TGetPrimaryKeysReq,
  TGetCrossReferenceReq,
  TGetOperationStatusReq,
  TCancelOperationReq,
  TCloseOperationReq,
  TGetDelegationTokenReq,
  TCancelDelegationTokenReq,
  TRenewDelegationTokenReq,
} from '../../thrift/TCLIService_types';
import OpenSessionCommand from './Commands/OpenSessionCommand';
import CloseSessionCommand from './Commands/CloseSessionCommand';
import ExecuteStatementCommand from './Commands/ExecuteStatementCommand';
import GetResultSetMetadataCommand from './Commands/GetResultSetMetadataCommand';
import FetchResultsCommand from './Commands/FetchResultsCommand';
import GetInfoCommand from './Commands/GetInfoCommand';
import GetTypeInfoCommand from './Commands/GetTypeInfoCommand';
import GetCatalogsCommand from './Commands/GetCatalogsCommand';
import GetSchemasCommand from './Commands/GetSchemasCommand';
import GetTablesCommand from './Commands/GetTablesCommand';
import GetTableTypesCommand from './Commands/GetTableTypesCommand';
import GetColumnsCommand from './Commands/GetColumnsCommand';
import GetFunctionsCommand from './Commands/GetFunctionsCommand';
import GetPrimaryKeysCommand from './Commands/GetPrimaryKeysCommand';
import GetCrossReferenceCommand from './Commands/GetCrossReferenceCommand';
import GetOperationStatusCommand from './Commands/GetOperationStatusCommand';
import CancelOperationCommand from './Commands/CancelOperationCommand';
import CloseOperationCommand from './Commands/CloseOperationCommand';
import GetDelegationTokenCommand from './Commands/GetDelegationTokenCommand';
import CancelDelegationTokenCommand from './Commands/CancelDelegationTokenCommand';
import RenewDelegationTokenCommand from './Commands/RenewDelegationTokenCommand';

export type ClientFactory = () => Promise<TCLIService.Client>;

export default class HiveDriver {
  private readonly clientFactory: ClientFactory;

  constructor(clientFactory: ClientFactory) {
    this.clientFactory = clientFactory;
  }

  async openSession(request: TOpenSessionReq) {
    const client = await this.clientFactory();
    const action = new OpenSessionCommand(client);
    return action.execute(request);
  }

  async closeSession(request: TCloseSessionReq) {
    const client = await this.clientFactory();
    const command = new CloseSessionCommand(client);
    return command.execute(request);
  }

  async executeStatement(request: TExecuteStatementReq) {
    const client = await this.clientFactory();
    const command = new ExecuteStatementCommand(client);
    return command.execute(request);
  }

  async getResultSetMetadata(request: TGetResultSetMetadataReq) {
    const client = await this.clientFactory();
    const command = new GetResultSetMetadataCommand(client);
    return command.execute(request);
  }

  async fetchResults(request: TFetchResultsReq) {
    const client = await this.clientFactory();
    const command = new FetchResultsCommand(client);
    return command.execute(request);
  }

  async getInfo(request: TGetInfoReq) {
    const client = await this.clientFactory();
    const command = new GetInfoCommand(client);
    return command.execute(request);
  }

  async getTypeInfo(request: TGetTypeInfoReq) {
    const client = await this.clientFactory();
    const command = new GetTypeInfoCommand(client);
    return command.execute(request);
  }

  async getCatalogs(request: TGetCatalogsReq) {
    const client = await this.clientFactory();
    const command = new GetCatalogsCommand(client);
    return command.execute(request);
  }

  async getSchemas(request: TGetSchemasReq) {
    const client = await this.clientFactory();
    const command = new GetSchemasCommand(client);
    return command.execute(request);
  }

  async getTables(request: TGetTablesReq) {
    const client = await this.clientFactory();
    const command = new GetTablesCommand(client);
    return command.execute(request);
  }

  async getTableTypes(request: TGetTableTypesReq) {
    const client = await this.clientFactory();
    const command = new GetTableTypesCommand(client);
    return command.execute(request);
  }

  async getColumns(request: TGetColumnsReq) {
    const client = await this.clientFactory();
    const command = new GetColumnsCommand(client);
    return command.execute(request);
  }

  async getFunctions(request: TGetFunctionsReq) {
    const client = await this.clientFactory();
    const command = new GetFunctionsCommand(client);
    return command.execute(request);
  }

  async getPrimaryKeys(request: TGetPrimaryKeysReq) {
    const client = await this.clientFactory();
    const command = new GetPrimaryKeysCommand(client);
    return command.execute(request);
  }

  async getCrossReference(request: TGetCrossReferenceReq) {
    const client = await this.clientFactory();
    const command = new GetCrossReferenceCommand(client);
    return command.execute(request);
  }

  async getOperationStatus(request: TGetOperationStatusReq) {
    const client = await this.clientFactory();
    const command = new GetOperationStatusCommand(client);
    return command.execute(request);
  }

  async cancelOperation(request: TCancelOperationReq) {
    const client = await this.clientFactory();
    const command = new CancelOperationCommand(client);
    return command.execute(request);
  }

  async closeOperation(request: TCloseOperationReq) {
    const client = await this.clientFactory();
    const command = new CloseOperationCommand(client);
    return command.execute(request);
  }

  async getDelegationToken(request: TGetDelegationTokenReq) {
    const client = await this.clientFactory();
    const command = new GetDelegationTokenCommand(client);
    return command.execute(request);
  }

  async cancelDelegationToken(request: TCancelDelegationTokenReq) {
    const client = await this.clientFactory();
    const command = new CancelDelegationTokenCommand(client);
    return command.execute(request);
  }

  async renewDelegationToken(request: TRenewDelegationTokenReq) {
    const client = await this.clientFactory();
    const command = new RenewDelegationTokenCommand(client);
    return command.execute(request);
  }
}
