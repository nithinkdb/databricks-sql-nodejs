const { expect, AssertionError } = require('chai');
const sinon = require('sinon');
const DBSQLClient = require('../../dist/DBSQLClient').default;
const DBSQLSession = require('../../dist/DBSQLSession').default;

const PlainHttpAuthentication = require('../../dist/connection/auth/PlainHttpAuthentication').default;
const DatabricksOAuth = require('../../dist/connection/auth/DatabricksOAuth').default;
const { AWSOAuthManager, AzureOAuthManager } = require('../../dist/connection/auth/DatabricksOAuth/OAuthManager');

const HttpConnectionModule = require('../../dist/connection/connections/HttpConnection');

class AuthProviderMock {
  constructor() {
    this.authResult = {};
  }

  authenticate() {
    return Promise.resolve(this.authResult);
  }
}

describe('DBSQLClient.connect', () => {
  const options = {
    host: '127.0.0.1',
    path: '',
    token: 'dapi********************************',
  };

  it('should prepend "/" to path if it is missing', async () => {
    const client = new DBSQLClient();

    const path = 'example/path';
    const connectionOptions = client.getConnectionOptions({ ...options, path }, {});

    expect(connectionOptions.options.path).to.equal(`/${path}`);
  });

  it('should not prepend "/" to path if it is already available', async () => {
    const client = new DBSQLClient();

    const path = '/example/path';
    const connectionOptions = client.getConnectionOptions({ ...options, path }, {});

    expect(connectionOptions.options.path).to.equal(path);
  });

  it('should initialize connection state', async () => {
    const client = new DBSQLClient();

    expect(client.client).to.be.null;
    expect(client.authProvider).to.be.null;
    expect(client.connectionOptions).to.be.null;

    await client.connect(options);

    expect(client.client).to.be.null; // it should not be initialized at this point
    expect(client.authProvider).to.be.instanceOf(PlainHttpAuthentication);
    expect(client.connectionOptions).to.be.deep.equal(options);
  });
});

describe('DBSQLClient.openSession', () => {
  it('should successfully open session', async () => {
    const client = new DBSQLClient();

    sinon.stub(client, 'getClient').returns(
      Promise.resolve({
        OpenSession(req, cb) {
          cb(null, { status: {}, sessionHandle: {} });
        },
      }),
    );

    client.authProvider = {};
    client.connectionOptions = {};

    const session = await client.openSession();
    expect(session).instanceOf(DBSQLSession);
  });

  it('should use initial namespace options', async () => {
    const client = new DBSQLClient();

    sinon.stub(client, 'getClient').returns(
      Promise.resolve({
        OpenSession(req, cb) {
          cb(null, { status: {}, sessionHandle: {} });
        },
      }),
    );

    client.authProvider = {};
    client.connectionOptions = {};

    case1: {
      const session = await client.openSession({ initialCatalog: 'catalog' });
      expect(session).instanceOf(DBSQLSession);
    }

    case2: {
      const session = await client.openSession({ initialSchema: 'schema' });
      expect(session).instanceOf(DBSQLSession);
    }

    case3: {
      const session = await client.openSession({ initialCatalog: 'catalog', initialSchema: 'schema' });
      expect(session).instanceOf(DBSQLSession);
    }
  });

  it('should throw an exception when not connected', async () => {
    const client = new DBSQLClient();
    client.connection = null;

    try {
      await client.openSession();
      expect.fail('It should throw an error');
    } catch (error) {
      expect(error.message).to.be.eq('DBSQLClient: not connected');
    }
  });

  it('should throw an exception when the connection is lost', async () => {
    const client = new DBSQLClient();
    client.connection = {
      isConnected() {
        return false;
      },
    };

    try {
      await client.openSession();
      expect.fail('It should throw an error');
    } catch (error) {
      expect(error.message).to.be.eq('DBSQLClient: not connected');
    }
  });
});

describe('DBSQLClient.getClient', () => {
  const options = {
    host: '127.0.0.1',
    path: '',
    token: 'dapi********************************',
  };

  it('should throw an error if not connected', async () => {
    const client = new DBSQLClient();
    try {
      await client.getClient();
      expect.fail('It should throw an error');
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      expect(error.message).to.contain('DBSQLClient: not connected');
    }
  });

  it("should create client if wasn't not initialized yet", async () => {
    const client = new DBSQLClient();

    const thriftClient = {};

    client.authProvider = new AuthProviderMock();
    client.connectionOptions = { ...options };
    client.thrift = {
      createClient: sinon.stub().returns(thriftClient),
    };
    sinon.stub(client, 'createConnection').returns({
      getConnection: () => null,
    });

    const result = await client.getClient();
    expect(client.thrift.createClient.called).to.be.true;
    expect(client.createConnection.called).to.be.true;
    expect(result).to.be.equal(thriftClient);
  });

  it('should re-create client if auth credentials change', async () => {
    const client = new DBSQLClient();

    const thriftClient = {};

    client.authProvider = new AuthProviderMock();
    client.connectionOptions = { ...options };
    client.thrift = {
      createClient: sinon.stub().returns(thriftClient),
    };
    sinon.stub(client, 'createConnection').returns({
      getConnection: () => null,
    });

    // initialize client
    firstCall: {
      const result = await client.getClient();
      expect(client.thrift.createClient.callCount).to.be.equal(1);
      expect(client.createConnection.callCount).to.be.equal(1);
      expect(result).to.be.equal(thriftClient);
    }

    // credentials stay the same, client should not be re-created
    secondCall: {
      const result = await client.getClient();
      expect(client.thrift.createClient.callCount).to.be.equal(1);
      expect(client.createConnection.callCount).to.be.equal(1);
      expect(result).to.be.equal(thriftClient);
    }

    // change credentials mock - client should be re-created
    thirdCall: {
      client.authProvider.authResult = { b: 2 };

      const result = await client.getClient();
      expect(client.thrift.createClient.callCount).to.be.equal(2);
      expect(client.createConnection.callCount).to.be.equal(2);
      expect(result).to.be.equal(thriftClient);
    }
  });
});

describe('DBSQLClient.createConnection', () => {
  afterEach(() => {
    HttpConnectionModule.default.restore?.();
  });

  it('should create connection', async () => {
    const thriftConnection = {
      on: sinon.stub(),
    };

    const connectionMock = {
      getConnection: sinon.stub().returns(thriftConnection),
    };

    const connectionProviderMock = {
      connect: sinon.stub().returns(Promise.resolve(connectionMock)),
    };

    sinon.stub(HttpConnectionModule, 'default').returns(connectionProviderMock);

    const client = new DBSQLClient();

    const result = await client.createConnection({});
    expect(result).to.be.equal(connectionMock);
    expect(connectionProviderMock.connect.called).to.be.true;
    expect(connectionMock.getConnection.called).to.be.true;
    expect(thriftConnection.on.called).to.be.true;
  });
});

describe('DBSQLClient.close', () => {
  it('should close the connection if it was initiated', async () => {
    const client = new DBSQLClient();
    client.client = {};
    client.authProvider = {};
    client.connectionOptions = {};

    await client.close();
    expect(client.client).to.be.null;
    expect(client.authProvider).to.be.null;
    expect(client.connectionOptions).to.be.null;
    // No additional asserts needed - it should just reach this point
  });

  it('should do nothing if the connection does not exist', async () => {
    const client = new DBSQLClient();

    await client.close();
    expect(client.client).to.be.null;
    expect(client.authProvider).to.be.null;
    expect(client.connectionOptions).to.be.null;
    // No additional asserts needed - it should just reach this point
  });

  it('should close sessions that belong to it', async () => {
    const client = new DBSQLClient();

    const thriftClientMock = {
      OpenSession(req, cb) {
        cb(null, {
          status: {},
          sessionHandle: {
            sessionId: {
              guid: Buffer.alloc(16),
              secret: Buffer.alloc(0),
            },
          },
        });
      },
      CloseSession(req, cb) {
        cb(null, { status: {} });
      },
    };
    client.client = thriftClientMock;
    sinon.stub(client, 'getClient').returns(Promise.resolve(thriftClientMock));

    const session = await client.openSession();
    expect(session.onClose).to.be.not.undefined;
    expect(session.isOpen).to.be.true;
    expect(client.sessions.items.size).to.eq(1);

    sinon.spy(thriftClientMock, 'CloseSession');
    sinon.spy(client.sessions, 'closeAll');
    sinon.spy(session, 'close');

    await client.close();
    expect(client.sessions.closeAll.called).to.be.true;
    expect(session.close.called).to.be.true;
    expect(session.onClose).to.be.undefined;
    expect(session.isOpen).to.be.false;
    expect(client.sessions.items.size).to.eq(0);
    expect(thriftClientMock.CloseSession.called).to.be.true;
  });
});

describe('DBSQLClient.getAuthProvider', () => {
  it('should use access token auth method', () => {
    const client = new DBSQLClient();

    const testAccessToken = 'token';
    const provider = client.getAuthProvider({
      authType: 'access-token',
      token: testAccessToken,
    });

    expect(provider).to.be.instanceOf(PlainHttpAuthentication);
    expect(provider.password).to.be.equal(testAccessToken);
  });

  it('should use access token auth method by default (compatibility)', () => {
    const client = new DBSQLClient();

    const testAccessToken = 'token';
    const provider = client.getAuthProvider({
      // note: no `authType` provided
      token: testAccessToken,
    });

    expect(provider).to.be.instanceOf(PlainHttpAuthentication);
    expect(provider.password).to.be.equal(testAccessToken);
  });

  it('should use Databricks OAuth method (AWS)', () => {
    const client = new DBSQLClient();

    const provider = client.getAuthProvider({
      authType: 'databricks-oauth',
      // host is used when creating OAuth manager, so make it look like a real AWS instance
      host: 'example.dev.databricks.com',
    });

    expect(provider).to.be.instanceOf(DatabricksOAuth);
    expect(provider.manager).to.be.instanceOf(AWSOAuthManager);
  });

  it('should use Databricks OAuth method (Azure)', () => {
    const client = new DBSQLClient();

    const provider = client.getAuthProvider({
      authType: 'databricks-oauth',
      // host is used when creating OAuth manager, so make it look like a real Azure instance
      host: 'example.databricks.azure.us',
    });

    expect(provider).to.be.instanceOf(DatabricksOAuth);
    expect(provider.manager).to.be.instanceOf(AzureOAuthManager);
  });

  it('should throw error when OAuth not supported for host', () => {
    const client = new DBSQLClient();

    expect(() => {
      client.getAuthProvider({
        authType: 'databricks-oauth',
        // use host which is not supported for sure
        host: 'example.com',
      });
    }).to.throw();
  });

  it('should use custom auth method', () => {
    const client = new DBSQLClient();

    const customProvider = {};

    const provider = client.getAuthProvider({
      authType: 'custom',
      provider: customProvider,
    });

    expect(provider).to.be.equal(customProvider);
  });

  it('should use custom auth method (legacy way)', () => {
    const client = new DBSQLClient();

    const customProvider = {};

    const provider = client.getAuthProvider(
      // custom provider from second arg should be used no matter what's specified in config
      { authType: 'access-token', token: 'token' },
      customProvider,
    );

    expect(provider).to.be.equal(customProvider);
  });
});
