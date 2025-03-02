import { Thrift } from 'thrift';
import TCLIService from '../thrift/TCLIService';
import TCLIService_types from '../thrift/TCLIService_types';
import DBSQLClient from './DBSQLClient';
import DBSQLSession from './DBSQLSession';
import { DBSQLParameter } from './DBSQLParameter';
import DBSQLLogger from './DBSQLLogger';
import PlainHttpAuthentication from './connection/auth/PlainHttpAuthentication';
import HttpConnection from './connection/connections/HttpConnection';
import { formatProgress } from './utils';
import { LogLevel } from './contracts/IDBSQLLogger';

export const auth = {
  PlainHttpAuthentication,
};

const { TException, TApplicationException, TApplicationExceptionType, TProtocolException, TProtocolExceptionType } =
  Thrift;

export { TException, TApplicationException, TApplicationExceptionType, TProtocolException, TProtocolExceptionType };

export const connections = {
  HttpConnection,
};

export const thrift = {
  TCLIService,
  TCLIService_types,
};

export const utils = {
  formatProgress,
};

export { DBSQLClient, DBSQLSession, DBSQLParameter, DBSQLLogger, LogLevel };
