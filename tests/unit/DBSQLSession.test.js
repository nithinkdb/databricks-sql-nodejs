const { expect, AssertionError } = require('chai');
const { DBSQLLogger, LogLevel } = require('../../dist');
const sinon = require('sinon');
const DBSQLSession = require('../../dist/DBSQLSession').default;
const InfoValue = require('../../dist/dto/InfoValue').default;
const Status = require('../../dist/dto/Status').default;
const DBSQLOperation = require('../../dist/DBSQLOperation').default;

// Create logger that won't emit
//
const logger = new DBSQLLogger({ level: LogLevel.error });

function createDriverMock(customMethodHandler) {
  customMethodHandler = customMethodHandler || ((methodName, value) => value);

  return new Proxy(
    {},
    {
      get: function (target, prop) {
        return () =>
          Promise.resolve(
            customMethodHandler(prop, {
              status: {
                statusCode: 0,
              },
              operationHandle: 'operationHandle',
              infoValue: {},
            }),
          );
      },
    },
  );
}

function createSession(customMethodHandler) {
  const driver = createDriverMock(customMethodHandler);
  return new DBSQLSession(driver, { sessionId: 'id' }, logger);
}

async function expectFailure(fn) {
  try {
    await fn();
    expect.fail('It should throw an error');
  } catch (error) {
    if (error instanceof AssertionError) {
      throw error;
    }
  }
}

describe('DBSQLSession', () => {
  describe('getInfo', () => {
    it('should run operation', async () => {
      const session = createSession();
      const result = await session.getInfo(1);
      expect(result).instanceOf(InfoValue);
    });
  });

  describe('executeStatement', () => {
    it('should execute statement', async () => {
      const session = createSession();
      const result = await session.executeStatement('SELECT * FROM table');
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should use direct results', async () => {
      const session = createSession();
      const result = await session.executeStatement('SELECT * FROM table', { maxRows: 10 });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should disable direct results', async () => {
      const session = createSession();
      const result = await session.executeStatement('SELECT * FROM table', { maxRows: null });
      expect(result).instanceOf(DBSQLOperation);
    });

    describe('Arrow support', () => {
      it('should not use Arrow if disabled in options', async () => {
        const session = createSession();
        const result = await session.executeStatement('SELECT * FROM table', { enableArrow: false });
        expect(result).instanceOf(DBSQLOperation);
      });

      it('should apply defaults for Arrow options', async () => {
        const session = createSession();

        case1: {
          const result = await session.executeStatement('SELECT * FROM table', { enableArrow: true });
          expect(result).instanceOf(DBSQLOperation);
        }

        case2: {
          const result = await session.executeStatement('SELECT * FROM table', {
            enableArrow: true,
            arrowOptions: {},
          });
          expect(result).instanceOf(DBSQLOperation);
        }

        case3: {
          const result = await session.executeStatement('SELECT * FROM table', {
            enableArrow: true,
            arrowOptions: {
              useNativeTimestamps: false,
            },
          });
          expect(result).instanceOf(DBSQLOperation);
        }

        case4: {
          const result = await session.executeStatement('SELECT * FROM table', {
            enableArrow: true,
            arrowOptions: {
              useNativeDecimals: false,
            },
          });
          expect(result).instanceOf(DBSQLOperation);
        }

        case5: {
          const result = await session.executeStatement('SELECT * FROM table', {
            enableArrow: true,
            arrowOptions: {
              useNativeComplexTypes: false,
            },
          });
          expect(result).instanceOf(DBSQLOperation);
        }
      });
    });
  });

  describe('getTypeInfo', () => {
    it('should run operation', async () => {
      const session = createSession();
      const result = await session.getTypeInfo();
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should use direct results', async () => {
      const session = createSession();
      const result = await session.getTypeInfo({ maxRows: 10 });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should disable direct results', async () => {
      const session = createSession();
      const result = await session.getTypeInfo({ maxRows: null });
      expect(result).instanceOf(DBSQLOperation);
    });
  });

  describe('getCatalogs', () => {
    it('should run operation', async () => {
      const session = createSession();
      const result = await session.getCatalogs();
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should use direct results', async () => {
      const session = createSession();
      const result = await session.getCatalogs({ maxRows: 10 });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should disable direct results', async () => {
      const session = createSession();
      const result = await session.getCatalogs({ maxRows: null });
      expect(result).instanceOf(DBSQLOperation);
    });
  });

  describe('getSchemas', () => {
    it('should run operation', async () => {
      const session = createSession();
      const result = await session.getSchemas();
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should use filters', async () => {
      const session = createSession();
      const result = await session.getSchemas({
        catalogName: 'catalog',
        schemaName: 'schema',
      });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should use direct results', async () => {
      const session = createSession();
      const result = await session.getSchemas({ maxRows: 10 });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should disable direct results', async () => {
      const session = createSession();
      const result = await session.getSchemas({ maxRows: null });
      expect(result).instanceOf(DBSQLOperation);
    });
  });

  describe('getTables', () => {
    it('should run operation', async () => {
      const session = createSession();
      const result = await session.getTables();
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should use filters', async () => {
      const session = createSession();
      const result = await session.getTables({
        catalogName: 'catalog',
        schemaName: 'default',
        tableName: 't1',
        tableTypes: ['external'],
      });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should use direct results', async () => {
      const session = createSession();
      const result = await session.getTables({ maxRows: 10 });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should disable direct results', async () => {
      const session = createSession();
      const result = await session.getTables({ maxRows: null });
      expect(result).instanceOf(DBSQLOperation);
    });
  });

  describe('getTableTypes', () => {
    it('should run operation', async () => {
      const session = createSession();
      const result = await session.getTableTypes();
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should use direct results', async () => {
      const session = createSession();
      const result = await session.getTableTypes({ maxRows: 10 });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should disable direct results', async () => {
      const session = createSession();
      const result = await session.getTableTypes({ maxRows: null });
      expect(result).instanceOf(DBSQLOperation);
    });
  });

  describe('getColumns', () => {
    it('should run operation', async () => {
      const session = createSession();
      const result = await session.getColumns();
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should use filters', async () => {
      const session = createSession();
      const result = await session.getColumns({
        catalogName: 'catalog',
        schemaName: 'schema',
        tableName: 'table',
        columnName: 'column',
      });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should use direct results', async () => {
      const session = createSession();
      const result = await session.getColumns({ maxRows: 10 });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should disable direct results', async () => {
      const session = createSession();
      const result = await session.getColumns({ maxRows: null });
      expect(result).instanceOf(DBSQLOperation);
    });
  });

  describe('getFunctions', () => {
    it('should run operation', async () => {
      const session = createSession();
      const result = await session.getFunctions({
        catalogName: 'catalog',
        schemaName: 'schema',
        functionName: 'avg',
      });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should use direct results', async () => {
      const session = createSession();
      const result = await session.getFunctions({
        catalogName: 'catalog',
        schemaName: 'schema',
        functionName: 'avg',
        maxRows: 10,
      });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should disable direct results', async () => {
      const session = createSession();
      const result = await session.getFunctions({
        catalogName: 'catalog',
        schemaName: 'schema',
        functionName: 'avg',
        maxRows: null,
      });
      expect(result).instanceOf(DBSQLOperation);
    });
  });

  describe('getPrimaryKeys', () => {
    it('should run operation', async () => {
      const session = createSession();
      const result = await session.getPrimaryKeys({
        catalogName: 'catalog',
        schemaName: 'schema',
        tableName: 't1',
      });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should use direct results', async () => {
      const session = createSession();
      const result = await session.getPrimaryKeys({
        catalogName: 'catalog',
        schemaName: 'schema',
        tableName: 't1',
        maxRows: 10,
      });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should disable direct results', async () => {
      const session = createSession();
      const result = await session.getPrimaryKeys({
        catalogName: 'catalog',
        schemaName: 'schema',
        tableName: 't1',
        maxRows: null,
      });
      expect(result).instanceOf(DBSQLOperation);
    });
  });

  describe('getCrossReference', () => {
    it('should run operation', async () => {
      const session = createSession();
      const result = await session.getCrossReference({
        parentCatalogName: 'parentCatalogName',
        parentSchemaName: 'parentSchemaName',
        parentTableName: 'parentTableName',
        foreignCatalogName: 'foreignCatalogName',
        foreignSchemaName: 'foreignSchemaName',
        foreignTableName: 'foreignTableName',
      });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should use direct results', async () => {
      const session = createSession();
      const result = await session.getCrossReference({
        parentCatalogName: 'parentCatalogName',
        parentSchemaName: 'parentSchemaName',
        parentTableName: 'parentTableName',
        foreignCatalogName: 'foreignCatalogName',
        foreignSchemaName: 'foreignSchemaName',
        foreignTableName: 'foreignTableName',
        maxRows: 10,
      });
      expect(result).instanceOf(DBSQLOperation);
    });

    it('should disable direct results', async () => {
      const session = createSession();
      const result = await session.getCrossReference({
        parentCatalogName: 'parentCatalogName',
        parentSchemaName: 'parentSchemaName',
        parentTableName: 'parentTableName',
        foreignCatalogName: 'foreignCatalogName',
        foreignSchemaName: 'foreignSchemaName',
        foreignTableName: 'foreignTableName',
        maxRows: null,
      });
      expect(result).instanceOf(DBSQLOperation);
    });
  });

  describe('close', () => {
    it('should run operation', async () => {
      const driverMethodStub = sinon.stub().returns({
        status: {
          statusCode: 0,
        },
      });

      const session = createSession(driverMethodStub);
      expect(session.isOpen).to.be.true;

      const result = await session.close();
      expect(result).instanceOf(Status);
      expect(session.isOpen).to.be.false;
      expect(driverMethodStub.callCount).to.eq(1);
    });

    it('should not run operation twice', async () => {
      const driverMethodStub = sinon.stub().returns({
        status: {
          statusCode: 0,
        },
      });

      const session = createSession(driverMethodStub);
      expect(session.isOpen).to.be.true;

      const result = await session.close();
      expect(result).instanceOf(Status);
      expect(session.isOpen).to.be.false;
      expect(driverMethodStub.callCount).to.eq(1);

      const result2 = await session.close();
      expect(result2).instanceOf(Status);
      expect(session.isOpen).to.be.false;
      expect(driverMethodStub.callCount).to.eq(1); // second time it should not be called
    });

    it('should close operations that belong to it', async () => {
      const session = createSession();
      const operation = await session.executeStatement('SELECT * FROM table');
      expect(operation.onClose).to.be.not.undefined;
      expect(operation.closed).to.be.false;
      expect(session.operations.items.size).to.eq(1);

      sinon.spy(session.operations, 'closeAll');
      sinon.spy(operation, 'close');

      await session.close();
      expect(operation.close.called).to.be.true;
      expect(session.operations.closeAll.called).to.be.true;
      expect(operation.onClose).to.be.undefined;
      expect(operation.closed).to.be.true;
      expect(session.operations.items.size).to.eq(0);
    });

    it('should reject all methods once closed', async () => {
      const session = createSession();
      await session.close();
      expect(session.isOpen).to.be.false;

      await expectFailure(() => session.getInfo(1));
      await expectFailure(() => session.executeStatement('SELECT * FROM table'));
      await expectFailure(() => session.getTypeInfo());
      await expectFailure(() => session.getCatalogs());
      await expectFailure(() => session.getSchemas());
      await expectFailure(() => session.getTables());
      await expectFailure(() => session.getTableTypes());
      await expectFailure(() => session.getColumns());
      await expectFailure(() => session.getFunctions());
      await expectFailure(() => session.getPrimaryKeys());
      await expectFailure(() => session.getCrossReference());
    });
  });
});
