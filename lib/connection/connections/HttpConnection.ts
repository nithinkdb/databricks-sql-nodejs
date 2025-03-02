import thrift from 'thrift';
import https from 'https';
import http, { IncomingMessage } from 'http';

import IThriftConnection from '../contracts/IThriftConnection';
import IConnectionProvider from '../contracts/IConnectionProvider';
import IConnectionOptions, { Options } from '../contracts/IConnectionOptions';
import globalConfig from '../../globalConfig';

type NodeOptions = {
  ca?: Buffer | string;
  cert?: Buffer | string;
  key?: Buffer | string;
  rejectUnauthorized?: boolean;
};

export default class HttpConnection implements IConnectionProvider, IThriftConnection {
  private thrift = thrift;

  private connection: any;

  async connect(options: IConnectionOptions): Promise<IThriftConnection> {
    const agentOptions: http.AgentOptions = {
      keepAlive: true,
      maxSockets: 5,
      keepAliveMsecs: 10000,
      timeout: options.options?.socketTimeout ?? globalConfig.socketTimeout,
    };

    const agent = options.options?.https
      ? new https.Agent({ ...agentOptions, minVersion: 'TLSv1.2' })
      : new http.Agent(agentOptions);

    const thriftOptions = {
      transport: thrift.TBufferedTransport,
      protocol: thrift.TBinaryProtocol,
      ...options.options,
      nodeOptions: {
        agent,
        ...this.getNodeOptions(options.options || {}),
        ...(options.options?.nodeOptions || {}),
        timeout: options.options?.socketTimeout ?? globalConfig.socketTimeout,
      },
    };

    this.connection = this.thrift.createHttpConnection(options.host, options.port, thriftOptions);
    this.addCookieHandler();

    return this;
  }

  getConnection() {
    return this.connection;
  }

  isConnected(): boolean {
    if (this.connection) {
      return true;
    }
    return false;
  }

  private getNodeOptions(options: Options): object {
    const { ca, cert, key, https: useHttps } = options;
    const nodeOptions: NodeOptions = {};

    if (ca) {
      nodeOptions.ca = ca;
    }
    if (cert) {
      nodeOptions.cert = cert;
    }
    if (key) {
      nodeOptions.key = key;
    }

    if (useHttps) {
      nodeOptions.rejectUnauthorized = false;
    }

    return nodeOptions;
  }

  private addCookieHandler() {
    const { responseCallback } = this.connection;

    this.connection.responseCallback = (response: IncomingMessage, ...rest: Array<unknown>) => {
      if (Array.isArray(response.headers['set-cookie'])) {
        const cookie = [this.connection.nodeOptions.headers.cookie];

        this.connection.nodeOptions.headers.cookie = cookie
          .concat(response.headers['set-cookie'])
          .filter(Boolean)
          .join(';');
      }

      responseCallback.call(this.connection, response, ...rest);
    };
  }
}
