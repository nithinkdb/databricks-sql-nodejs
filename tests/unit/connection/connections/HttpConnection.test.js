const http = require('http');
const { expect } = require('chai');
const HttpConnection = require('../../../../dist/connection/connections/HttpConnection').default;

const thriftMock = (connection) => ({
  createHttpConnection(host, port, options) {
    this.host = host;
    this.port = port;
    this.options = options;
    this.executed = true;
    return connection;
  },
});

describe('HttpConnection.connect', () => {
  it('should successfully connect', () => {
    const connection = new HttpConnection();
    const resultConnection = {
      responseCallback() {},
    };
    connection.thrift = thriftMock(resultConnection);

    expect(connection.isConnected()).to.be.false;

    return connection
      .connect({
        host: 'localhost',
        port: 10001,
        options: {
          path: '/hive',
        },
      })
      .then(() => {
        expect(connection.thrift.executed).to.be.true;
        expect(connection.thrift.host).to.be.eq('localhost');
        expect(connection.thrift.port).to.be.eq(10001);
        expect(connection.thrift.options.path).to.be.eq('/hive');
        expect(connection.getConnection()).to.be.eq(resultConnection);
        expect(connection.isConnected()).to.be.true;
      });
  });

  it('should set SSL certificates and disable rejectUnauthorized', () => {
    const connection = new HttpConnection();
    const resultConnection = {
      responseCallback() {},
    };
    connection.thrift = thriftMock(resultConnection);

    return connection
      .connect({
        host: 'localhost',
        port: 10001,
        options: {
          path: '/hive',
          https: true,
          ca: 'ca',
          cert: 'cert',
          key: 'key',
        },
      })
      .then(() => {
        expect(connection.thrift.options.nodeOptions.rejectUnauthorized).to.be.false;
        expect(connection.thrift.options.nodeOptions.ca).to.be.eq('ca');
        expect(connection.thrift.options.nodeOptions.cert).to.be.eq('cert');
        expect(connection.thrift.options.nodeOptions.key).to.be.eq('key');
      });
  });

  it('should set cookie', () => {
    const connection = new HttpConnection();
    const resultConnection = {
      nodeOptions: { headers: { cookie: '' } },
      responseCallback() {},
    };
    connection.thrift = thriftMock(resultConnection);

    return connection
      .connect({
        host: 'localhost',
        port: 10001,
        options: {
          path: '/hive',
        },
      })
      .then(() => {
        resultConnection.responseCallback({
          headers: {
            'set-cookie': ['token=token'],
          },
        });

        expect(resultConnection.nodeOptions.headers.cookie).to.be.eq('token=token');
      });
  });

  it('should overlay rejectUnauthorized', () => {
    const connection = new HttpConnection();
    const resultConnection = {
      responseCallback() {},
    };
    connection.thrift = thriftMock(resultConnection);

    return connection
      .connect({
        host: 'localhost',
        port: 10001,
        options: {
          path: '/hive',
          https: true,
          nodeOptions: {
            rejectUnauthorized: true,
          },
        },
      })
      .then(() => {
        expect(connection.thrift.options.nodeOptions.rejectUnauthorized).to.be.true;
      });
  });

  it('should call response callback if cookie is not set', () => {
    const connection = new HttpConnection();
    const resultConnection = {
      responseCallback() {
        this.executed = true;
      },
    };
    connection.thrift = thriftMock(resultConnection);

    return connection
      .connect({
        host: 'localhost',
        port: 10001,
      })
      .then(() => {
        resultConnection.responseCallback({ headers: {} });
        expect(resultConnection.executed).to.be.true;
        expect(Object.keys(connection.thrift.options.nodeOptions)).to.be.deep.eq(['agent', 'timeout']);
      });
  });

  it('should use a http agent if https is not enabled', () => {
    const connection = new HttpConnection();
    const resultConnection = {
      responseCallback() {},
    };
    connection.thrift = thriftMock(resultConnection);

    return connection
      .connect({
        host: 'localhost',
        port: 10001,
        options: {
          https: false,
          path: '/hive',
        },
      })
      .then(() => {
        expect(connection.thrift.options.nodeOptions.agent).to.be.instanceOf(http.Agent);
      });
  });
});
