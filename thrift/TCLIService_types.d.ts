//
// Autogenerated by Thrift Compiler (0.16.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
import Int64 = require('node-int64');


export declare enum TProtocolVersion {
  __HIVE_JDBC_WORKAROUND = -7,
  __TEST_PROTOCOL_VERSION = 65281,
  HIVE_CLI_SERVICE_PROTOCOL_V1 = 0,
  HIVE_CLI_SERVICE_PROTOCOL_V2 = 1,
  HIVE_CLI_SERVICE_PROTOCOL_V3 = 2,
  HIVE_CLI_SERVICE_PROTOCOL_V4 = 3,
  HIVE_CLI_SERVICE_PROTOCOL_V5 = 4,
  HIVE_CLI_SERVICE_PROTOCOL_V6 = 5,
  HIVE_CLI_SERVICE_PROTOCOL_V7 = 6,
  HIVE_CLI_SERVICE_PROTOCOL_V8 = 7,
  HIVE_CLI_SERVICE_PROTOCOL_V9 = 8,
  HIVE_CLI_SERVICE_PROTOCOL_V10 = 9,
  SPARK_CLI_SERVICE_PROTOCOL_V1 = 42241,
  SPARK_CLI_SERVICE_PROTOCOL_V2 = 42242,
  SPARK_CLI_SERVICE_PROTOCOL_V3 = 42243,
  SPARK_CLI_SERVICE_PROTOCOL_V4 = 42244,
  SPARK_CLI_SERVICE_PROTOCOL_V5 = 42245,
  SPARK_CLI_SERVICE_PROTOCOL_V6 = 42246,
  SPARK_CLI_SERVICE_PROTOCOL_V7 = 42247,
}

export declare enum TTypeId {
  BOOLEAN_TYPE = 0,
  TINYINT_TYPE = 1,
  SMALLINT_TYPE = 2,
  INT_TYPE = 3,
  BIGINT_TYPE = 4,
  FLOAT_TYPE = 5,
  DOUBLE_TYPE = 6,
  STRING_TYPE = 7,
  TIMESTAMP_TYPE = 8,
  BINARY_TYPE = 9,
  ARRAY_TYPE = 10,
  MAP_TYPE = 11,
  STRUCT_TYPE = 12,
  UNION_TYPE = 13,
  USER_DEFINED_TYPE = 14,
  DECIMAL_TYPE = 15,
  NULL_TYPE = 16,
  DATE_TYPE = 17,
  VARCHAR_TYPE = 18,
  CHAR_TYPE = 19,
  INTERVAL_YEAR_MONTH_TYPE = 20,
  INTERVAL_DAY_TIME_TYPE = 21,
}

export declare enum TSparkRowSetType {
  ARROW_BASED_SET = 0,
  COLUMN_BASED_SET = 1,
  ROW_BASED_SET = 2,
  URL_BASED_SET = 3,
}

export declare enum TDBSqlCompressionCodec {
  NONE = 0,
  LZ4_FRAME = 1,
  LZ4_BLOCK = 2,
}

export declare enum TDBSqlArrowLayout {
  ARROW_BATCH = 0,
  ARROW_STREAMING = 1,
}

export declare enum TOperationIdempotencyType {
  UNKNOWN = 0,
  NON_IDEMPOTENT = 1,
  IDEMPOTENT = 2,
}

export declare enum TOperationTimeoutLevel {
  CLUSTER = 0,
  SESSION = 1,
}

export declare enum TStatusCode {
  SUCCESS_STATUS = 0,
  SUCCESS_WITH_INFO_STATUS = 1,
  STILL_EXECUTING_STATUS = 2,
  ERROR_STATUS = 3,
  INVALID_HANDLE_STATUS = 4,
}

export declare enum TOperationState {
  INITIALIZED_STATE = 0,
  RUNNING_STATE = 1,
  FINISHED_STATE = 2,
  CANCELED_STATE = 3,
  CLOSED_STATE = 4,
  ERROR_STATE = 5,
  UKNOWN_STATE = 6,
  PENDING_STATE = 7,
  TIMEDOUT_STATE = 8,
}

export declare enum TOperationType {
  EXECUTE_STATEMENT = 0,
  GET_TYPE_INFO = 1,
  GET_CATALOGS = 2,
  GET_SCHEMAS = 3,
  GET_TABLES = 4,
  GET_TABLE_TYPES = 5,
  GET_COLUMNS = 6,
  GET_FUNCTIONS = 7,
  UNKNOWN = 8,
}

export declare enum TGetInfoType {
  CLI_MAX_DRIVER_CONNECTIONS = 0,
  CLI_MAX_CONCURRENT_ACTIVITIES = 1,
  CLI_DATA_SOURCE_NAME = 2,
  CLI_FETCH_DIRECTION = 8,
  CLI_SERVER_NAME = 13,
  CLI_SEARCH_PATTERN_ESCAPE = 14,
  CLI_DBMS_NAME = 17,
  CLI_DBMS_VER = 18,
  CLI_ACCESSIBLE_TABLES = 19,
  CLI_ACCESSIBLE_PROCEDURES = 20,
  CLI_CURSOR_COMMIT_BEHAVIOR = 23,
  CLI_DATA_SOURCE_READ_ONLY = 25,
  CLI_DEFAULT_TXN_ISOLATION = 26,
  CLI_IDENTIFIER_CASE = 28,
  CLI_IDENTIFIER_QUOTE_CHAR = 29,
  CLI_MAX_COLUMN_NAME_LEN = 30,
  CLI_MAX_CURSOR_NAME_LEN = 31,
  CLI_MAX_SCHEMA_NAME_LEN = 32,
  CLI_MAX_CATALOG_NAME_LEN = 34,
  CLI_MAX_TABLE_NAME_LEN = 35,
  CLI_SCROLL_CONCURRENCY = 43,
  CLI_TXN_CAPABLE = 46,
  CLI_USER_NAME = 47,
  CLI_TXN_ISOLATION_OPTION = 72,
  CLI_INTEGRITY = 73,
  CLI_GETDATA_EXTENSIONS = 81,
  CLI_NULL_COLLATION = 85,
  CLI_ALTER_TABLE = 86,
  CLI_ORDER_BY_COLUMNS_IN_SELECT = 90,
  CLI_SPECIAL_CHARACTERS = 94,
  CLI_MAX_COLUMNS_IN_GROUP_BY = 97,
  CLI_MAX_COLUMNS_IN_INDEX = 98,
  CLI_MAX_COLUMNS_IN_ORDER_BY = 99,
  CLI_MAX_COLUMNS_IN_SELECT = 100,
  CLI_MAX_COLUMNS_IN_TABLE = 101,
  CLI_MAX_INDEX_SIZE = 102,
  CLI_MAX_ROW_SIZE = 104,
  CLI_MAX_STATEMENT_LEN = 105,
  CLI_MAX_TABLES_IN_SELECT = 106,
  CLI_MAX_USER_NAME_LEN = 107,
  CLI_OJ_CAPABILITIES = 115,
  CLI_XOPEN_CLI_YEAR = 10000,
  CLI_CURSOR_SENSITIVITY = 10001,
  CLI_DESCRIBE_PARAMETER = 10002,
  CLI_CATALOG_NAME = 10003,
  CLI_COLLATION_SEQ = 10004,
  CLI_MAX_IDENTIFIER_LEN = 10005,
}

export declare enum TResultPersistenceMode {
  ONLY_LARGE_RESULTS = 0,
  ALL_QUERY_RESULTS = 1,
  ALL_RESULTS = 2,
}

export declare enum TCacheLookupResult {
  CACHE_INELIGIBLE = 0,
  LOCAL_CACHE_HIT = 1,
  REMOTE_CACHE_HIT = 2,
  CACHE_MISS = 3,
}

export declare enum TCloudFetchDisabledReason {
  ARROW_SUPPORT = 0,
  CLOUD_FETCH_SUPPORT = 1,
  PROTOCOL_VERSION = 2,
  REGION_SUPPORT = 3,
  BLOCKLISTED_OPERATION = 4,
  SMALL_RESULT_SIZE = 5,
  CUSTOMER_STORAGE_SUPPORT = 6,
  UNKNOWN = 7,
}

export declare enum TDBSqlManifestFileFormat {
  THRIFT_GET_RESULT_SET_METADATA_RESP = 0,
}

export declare enum TFetchOrientation {
  FETCH_NEXT = 0,
  FETCH_PRIOR = 1,
  FETCH_RELATIVE = 2,
  FETCH_ABSOLUTE = 3,
  FETCH_FIRST = 4,
  FETCH_LAST = 5,
}

export declare enum TDBSqlFetchDisposition {
  DISPOSITION_UNSPECIFIED = 0,
  DISPOSITION_INLINE = 1,
  DISPOSITION_EXTERNAL_LINKS = 2,
  DISPOSITION_INTERNAL_DBFS = 3,
}

export declare enum TJobExecutionStatus {
  IN_PROGRESS = 0,
  COMPLETE = 1,
  NOT_AVAILABLE = 2,
}

export declare class TTypeQualifierValue {
  i32Value?: number;
  stringValue?: string;

    constructor(args?: { i32Value?: number; stringValue?: string; });
}

export declare class TTypeQualifiers {
  qualifiers: { [k: string]: TTypeQualifierValue; };

    constructor(args?: { qualifiers: { [k: string]: TTypeQualifierValue; }; });
}

export declare class TPrimitiveTypeEntry {
  type: TTypeId;
  typeQualifiers?: TTypeQualifiers;

    constructor(args?: { type: TTypeId; typeQualifiers?: TTypeQualifiers; });
}

export declare class TArrayTypeEntry {
  objectTypePtr: number;

    constructor(args?: { objectTypePtr: number; });
}

export declare class TMapTypeEntry {
  keyTypePtr: number;
  valueTypePtr: number;

    constructor(args?: { keyTypePtr: number; valueTypePtr: number; });
}

export declare class TStructTypeEntry {
  nameToTypePtr: { [k: string]: number; };

    constructor(args?: { nameToTypePtr: { [k: string]: number; }; });
}

export declare class TUnionTypeEntry {
  nameToTypePtr: { [k: string]: number; };

    constructor(args?: { nameToTypePtr: { [k: string]: number; }; });
}

export declare class TUserDefinedTypeEntry {
  typeClassName: string;

    constructor(args?: { typeClassName: string; });
}

export declare class TTypeEntry {
  primitiveEntry?: TPrimitiveTypeEntry;
  arrayEntry?: TArrayTypeEntry;
  mapEntry?: TMapTypeEntry;
  structEntry?: TStructTypeEntry;
  unionEntry?: TUnionTypeEntry;
  userDefinedTypeEntry?: TUserDefinedTypeEntry;

    constructor(args?: { primitiveEntry?: TPrimitiveTypeEntry; arrayEntry?: TArrayTypeEntry; mapEntry?: TMapTypeEntry; structEntry?: TStructTypeEntry; unionEntry?: TUnionTypeEntry; userDefinedTypeEntry?: TUserDefinedTypeEntry; });
}

export declare class TTypeDesc {
  types: TTypeEntry[];

    constructor(args?: { types: TTypeEntry[]; });
}

export declare class TColumnDesc {
  columnName: string;
  typeDesc: TTypeDesc;
  position: number;
  comment?: string;

    constructor(args?: { columnName: string; typeDesc: TTypeDesc; position: number; comment?: string; });
}

export declare class TTableSchema {
  columns: TColumnDesc[];

    constructor(args?: { columns: TColumnDesc[]; });
}

export declare class TBoolValue {
  value?: boolean;

    constructor(args?: { value?: boolean; });
}

export declare class TByteValue {
  value?: any;

    constructor(args?: { value?: any; });
}

export declare class TI16Value {
  value?: number;

    constructor(args?: { value?: number; });
}

export declare class TI32Value {
  value?: number;

    constructor(args?: { value?: number; });
}

export declare class TI64Value {
  value?: Int64;

    constructor(args?: { value?: Int64; });
}

export declare class TDoubleValue {
  value?: number;

    constructor(args?: { value?: number; });
}

export declare class TStringValue {
  value?: string;

    constructor(args?: { value?: string; });
}

export declare class TColumnValue {
  boolVal?: TBoolValue;
  byteVal?: TByteValue;
  i16Val?: TI16Value;
  i32Val?: TI32Value;
  i64Val?: TI64Value;
  doubleVal?: TDoubleValue;
  stringVal?: TStringValue;

    constructor(args?: { boolVal?: TBoolValue; byteVal?: TByteValue; i16Val?: TI16Value; i32Val?: TI32Value; i64Val?: TI64Value; doubleVal?: TDoubleValue; stringVal?: TStringValue; });
}

export declare class TRow {
  colVals: TColumnValue[];

    constructor(args?: { colVals: TColumnValue[]; });
}

export declare class TBoolColumn {
  values: boolean[];
  nulls: Buffer;

    constructor(args?: { values: boolean[]; nulls: Buffer; });
}

export declare class TByteColumn {
  values: any[];
  nulls: Buffer;

    constructor(args?: { values: any[]; nulls: Buffer; });
}

export declare class TI16Column {
  values: number[];
  nulls: Buffer;

    constructor(args?: { values: number[]; nulls: Buffer; });
}

export declare class TI32Column {
  values: number[];
  nulls: Buffer;

    constructor(args?: { values: number[]; nulls: Buffer; });
}

export declare class TI64Column {
  values: Int64[];
  nulls: Buffer;

    constructor(args?: { values: Int64[]; nulls: Buffer; });
}

export declare class TDoubleColumn {
  values: number[];
  nulls: Buffer;

    constructor(args?: { values: number[]; nulls: Buffer; });
}

export declare class TStringColumn {
  values: string[];
  nulls: Buffer;

    constructor(args?: { values: string[]; nulls: Buffer; });
}

export declare class TBinaryColumn {
  values: Buffer[];
  nulls: Buffer;

    constructor(args?: { values: Buffer[]; nulls: Buffer; });
}

export declare class TColumn {
  boolVal?: TBoolColumn;
  byteVal?: TByteColumn;
  i16Val?: TI16Column;
  i32Val?: TI32Column;
  i64Val?: TI64Column;
  doubleVal?: TDoubleColumn;
  stringVal?: TStringColumn;
  binaryVal?: TBinaryColumn;

    constructor(args?: { boolVal?: TBoolColumn; byteVal?: TByteColumn; i16Val?: TI16Column; i32Val?: TI32Column; i64Val?: TI64Column; doubleVal?: TDoubleColumn; stringVal?: TStringColumn; binaryVal?: TBinaryColumn; });
}

export declare class TDBSqlJsonArrayFormat {
  compressionCodec?: TDBSqlCompressionCodec;

    constructor(args?: { compressionCodec?: TDBSqlCompressionCodec; });
}

export declare class TDBSqlCsvFormat {
  compressionCodec?: TDBSqlCompressionCodec;

    constructor(args?: { compressionCodec?: TDBSqlCompressionCodec; });
}

export declare class TDBSqlArrowFormat {
  arrowLayout?: TDBSqlArrowLayout;
  compressionCodec?: TDBSqlCompressionCodec;

    constructor(args?: { arrowLayout?: TDBSqlArrowLayout; compressionCodec?: TDBSqlCompressionCodec; });
}

export declare class TDBSqlResultFormat {
  arrowFormat?: TDBSqlArrowFormat;
  csvFormat?: TDBSqlCsvFormat;
  jsonArrayFormat?: TDBSqlJsonArrayFormat;

    constructor(args?: { arrowFormat?: TDBSqlArrowFormat; csvFormat?: TDBSqlCsvFormat; jsonArrayFormat?: TDBSqlJsonArrayFormat; });
}

export declare class TSparkArrowBatch {
  batch: Buffer;
  rowCount: Int64;

    constructor(args?: { batch: Buffer; rowCount: Int64; });
}

export declare class TSparkArrowResultLink {
  fileLink: string;
  expiryTime: Int64;
  startRowOffset: Int64;
  rowCount: Int64;
  bytesNum: Int64;
  httpHeaders?: { [k: string]: string; };

    constructor(args?: { fileLink: string; expiryTime: Int64; startRowOffset: Int64; rowCount: Int64; bytesNum: Int64; httpHeaders?: { [k: string]: string; }; });
}

export declare class TDBSqlCloudResultFile {
  filePath?: string;
  startRowOffset?: Int64;
  rowCount?: Int64;
  uncompressedBytes?: Int64;
  compressedBytes?: Int64;
  fileLink?: string;
  linkExpiryTime?: Int64;
  httpHeaders?: { [k: string]: string; };

    constructor(args?: { filePath?: string; startRowOffset?: Int64; rowCount?: Int64; uncompressedBytes?: Int64; compressedBytes?: Int64; fileLink?: string; linkExpiryTime?: Int64; httpHeaders?: { [k: string]: string; }; });
}

export declare class TRowSet {
  startRowOffset: Int64;
  rows: TRow[];
  columns?: TColumn[];
  binaryColumns?: Buffer;
  columnCount?: number;
  arrowBatches?: TSparkArrowBatch[];
  resultLinks?: TSparkArrowResultLink[];
  cloudFetchResults?: TDBSqlCloudResultFile[];

    constructor(args?: { startRowOffset: Int64; rows: TRow[]; columns?: TColumn[]; binaryColumns?: Buffer; columnCount?: number; arrowBatches?: TSparkArrowBatch[]; resultLinks?: TSparkArrowResultLink[]; cloudFetchResults?: TDBSqlCloudResultFile[]; });
}

export declare class TDBSqlTempView {
  name?: string;
  sqlStatement?: string;
  properties?: { [k: string]: string; };
  viewSchema?: string;

    constructor(args?: { name?: string; sqlStatement?: string; properties?: { [k: string]: string; }; viewSchema?: string; });
}

export declare class TDBSqlSessionCapabilities {
  supportsMultipleCatalogs?: boolean;

    constructor(args?: { supportsMultipleCatalogs?: boolean; });
}

export declare class TExpressionInfo {
  className?: string;
  usage?: string;
  name?: string;
  extended?: string;
  db?: string;
  arguments?: string;
  examples?: string;
  note?: string;
  group?: string;
  since?: string;
  deprecated?: string;
  source?: string;

    constructor(args?: { className?: string; usage?: string; name?: string; extended?: string; db?: string; arguments?: string; examples?: string; note?: string; group?: string; since?: string; deprecated?: string; source?: string; });
}

export declare class TDBSqlConfValue {
  value?: string;

    constructor(args?: { value?: string; });
}

export declare class TDBSqlSessionConf {
  confs?: { [k: string]: string; };
  tempViews?: TDBSqlTempView[];
  currentDatabase?: string;
  currentCatalog?: string;
  sessionCapabilities?: TDBSqlSessionCapabilities;
  expressionsInfos?: TExpressionInfo[];
  internalConfs?: { [k: string]: TDBSqlConfValue; };

    constructor(args?: { confs?: { [k: string]: string; }; tempViews?: TDBSqlTempView[]; currentDatabase?: string; currentCatalog?: string; sessionCapabilities?: TDBSqlSessionCapabilities; expressionsInfos?: TExpressionInfo[]; internalConfs?: { [k: string]: TDBSqlConfValue; }; });
}

export declare class TStatus {
  statusCode: TStatusCode;
  infoMessages?: string[];
  sqlState?: string;
  errorCode?: number;
  errorMessage?: string;
  displayMessage?: string;
  errorDetailsJson?: string;
  responseValidation?: Buffer;

    constructor(args?: { statusCode: TStatusCode; infoMessages?: string[]; sqlState?: string; errorCode?: number; errorMessage?: string; displayMessage?: string; errorDetailsJson?: string; responseValidation?: Buffer; });
}

export declare class TNamespace {
  catalogName?: string;
  schemaName?: string;

    constructor(args?: { catalogName?: string; schemaName?: string; });
}

export declare class THandleIdentifier {
  guid: Buffer;
  secret: Buffer;
  executionVersion?: number;

    constructor(args?: { guid: Buffer; secret: Buffer; executionVersion?: number; });
}

export declare class TSessionHandle {
  sessionId: THandleIdentifier;
  serverProtocolVersion?: TProtocolVersion;

    constructor(args?: { sessionId: THandleIdentifier; serverProtocolVersion?: TProtocolVersion; });
}

export declare class TOperationHandle {
  operationId: THandleIdentifier;
  operationType: TOperationType;
  hasResultSet: boolean;
  modifiedRowCount?: number;

    constructor(args?: { operationId: THandleIdentifier; operationType: TOperationType; hasResultSet: boolean; modifiedRowCount?: number; });
}

export declare class TOpenSessionReq {
  client_protocol?: TProtocolVersion;
  username?: string;
  password?: string;
  configuration?: { [k: string]: string; };
  getInfos?: TGetInfoType[];
  client_protocol_i64?: Int64;
  connectionProperties?: { [k: string]: string; };
  initialNamespace?: TNamespace;
  canUseMultipleCatalogs?: boolean;
  sessionId?: THandleIdentifier;

    constructor(args?: { client_protocol?: TProtocolVersion; username?: string; password?: string; configuration?: { [k: string]: string; }; getInfos?: TGetInfoType[]; client_protocol_i64?: Int64; connectionProperties?: { [k: string]: string; }; initialNamespace?: TNamespace; canUseMultipleCatalogs?: boolean; sessionId?: THandleIdentifier; });
}

export declare class TOpenSessionResp {
  status: TStatus;
  serverProtocolVersion: TProtocolVersion;
  sessionHandle?: TSessionHandle;
  configuration?: { [k: string]: string; };
  initialNamespace?: TNamespace;
  canUseMultipleCatalogs?: boolean;
  getInfos?: TGetInfoValue[];

    constructor(args?: { status: TStatus; serverProtocolVersion: TProtocolVersion; sessionHandle?: TSessionHandle; configuration?: { [k: string]: string; }; initialNamespace?: TNamespace; canUseMultipleCatalogs?: boolean; getInfos?: TGetInfoValue[]; });
}

export declare class TCloseSessionReq {
  sessionHandle: TSessionHandle;

    constructor(args?: { sessionHandle: TSessionHandle; });
}

export declare class TCloseSessionResp {
  status: TStatus;

    constructor(args?: { status: TStatus; });
}

export declare class TGetInfoValue {
  stringValue?: string;
  smallIntValue?: number;
  integerBitmask?: number;
  integerFlag?: number;
  binaryValue?: number;
  lenValue?: Int64;

    constructor(args?: { stringValue?: string; smallIntValue?: number; integerBitmask?: number; integerFlag?: number; binaryValue?: number; lenValue?: Int64; });
}

export declare class TGetInfoReq {
  sessionHandle: TSessionHandle;
  infoType: TGetInfoType;
  sessionConf?: TDBSqlSessionConf;

    constructor(args?: { sessionHandle: TSessionHandle; infoType: TGetInfoType; sessionConf?: TDBSqlSessionConf; });
}

export declare class TGetInfoResp {
  status: TStatus;
  infoValue: TGetInfoValue;

    constructor(args?: { status: TStatus; infoValue: TGetInfoValue; });
}

export declare class TSparkGetDirectResults {
  maxRows: Int64;
  maxBytes?: Int64;

    constructor(args?: { maxRows: Int64; maxBytes?: Int64; });
}

export declare class TSparkDirectResults {
  operationStatus?: TGetOperationStatusResp;
  resultSetMetadata?: TGetResultSetMetadataResp;
  resultSet?: TFetchResultsResp;
  closeOperation?: TCloseOperationResp;

    constructor(args?: { operationStatus?: TGetOperationStatusResp; resultSetMetadata?: TGetResultSetMetadataResp; resultSet?: TFetchResultsResp; closeOperation?: TCloseOperationResp; });
}

export declare class TSparkArrowTypes {
  timestampAsArrow?: boolean;
  decimalAsArrow?: boolean;
  complexTypesAsArrow?: boolean;
  intervalTypesAsArrow?: boolean;
  nullTypeAsArrow?: boolean;

    constructor(args?: { timestampAsArrow?: boolean; decimalAsArrow?: boolean; complexTypesAsArrow?: boolean; intervalTypesAsArrow?: boolean; nullTypeAsArrow?: boolean; });
}

export declare class TExecuteStatementReq {
  sessionHandle: TSessionHandle;
  statement: string;
  confOverlay?: { [k: string]: string; };
  runAsync?: boolean;
  getDirectResults?: TSparkGetDirectResults;
  queryTimeout?: Int64;
  canReadArrowResult?: boolean;
  canDownloadResult?: boolean;
  canDecompressLZ4Result?: boolean;
  maxBytesPerFile?: Int64;
  useArrowNativeTypes?: TSparkArrowTypes;
  resultRowLimit?: Int64;
  parameters?: TSparkParameter[];
  maxBytesPerBatch?: Int64;
  statementConf?: TStatementConf;
  operationId?: THandleIdentifier;
  sessionConf?: TDBSqlSessionConf;
  rejectHighCostQueries?: boolean;
  estimatedCost?: number;
  executionVersion?: number;
  requestValidation?: Buffer;
  resultPersistenceMode?: TResultPersistenceMode;
  trimArrowBatchesToLimit?: boolean;
  fetchDisposition?: TDBSqlFetchDisposition;
  enforceResultPersistenceMode?: boolean;
  statementList?: TDBSqlStatement[];
  persistResultManifest?: boolean;
  resultRetentionSeconds?: Int64;
  resultByteLimit?: Int64;
  resultDataFormat?: TDBSqlResultFormat;
  originatingClientIdentity?: string;
  preferSingleFileResult?: boolean;
  preferDriverOnlyUpload?: boolean;
  enforceEmbeddedSchemaCorrectness?: boolean;
  idempotencyToken?: string;

    constructor(args?: { sessionHandle: TSessionHandle; statement: string; confOverlay?: { [k: string]: string; }; runAsync?: boolean; getDirectResults?: TSparkGetDirectResults; queryTimeout?: Int64; canReadArrowResult?: boolean; canDownloadResult?: boolean; canDecompressLZ4Result?: boolean; maxBytesPerFile?: Int64; useArrowNativeTypes?: TSparkArrowTypes; resultRowLimit?: Int64; parameters?: TSparkParameter[]; maxBytesPerBatch?: Int64; statementConf?: TStatementConf; operationId?: THandleIdentifier; sessionConf?: TDBSqlSessionConf; rejectHighCostQueries?: boolean; estimatedCost?: number; executionVersion?: number; requestValidation?: Buffer; resultPersistenceMode?: TResultPersistenceMode; trimArrowBatchesToLimit?: boolean; fetchDisposition?: TDBSqlFetchDisposition; enforceResultPersistenceMode?: boolean; statementList?: TDBSqlStatement[]; persistResultManifest?: boolean; resultRetentionSeconds?: Int64; resultByteLimit?: Int64; resultDataFormat?: TDBSqlResultFormat; originatingClientIdentity?: string; preferSingleFileResult?: boolean; preferDriverOnlyUpload?: boolean; enforceEmbeddedSchemaCorrectness?: boolean; idempotencyToken?: string; });
}

export declare class TDBSqlStatement {
  statement?: string;

    constructor(args?: { statement?: string; });
}

export declare class TSparkParameterValue {
  stringValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;

    constructor(args?: { stringValue?: string; doubleValue?: number; booleanValue?: boolean; });
}

export declare class TSparkParameter {
  ordinal?: number;
  name?: string;
  type?: string;
  value?: TSparkParameterValue;

    constructor(args?: { ordinal?: number; name?: string; type?: string; value?: TSparkParameterValue; });
}

export declare class TStatementConf {
  sessionless?: boolean;
  initialNamespace?: TNamespace;
  client_protocol?: TProtocolVersion;
  client_protocol_i64?: Int64;

    constructor(args?: { sessionless?: boolean; initialNamespace?: TNamespace; client_protocol?: TProtocolVersion; client_protocol_i64?: Int64; });
}

export declare class TExecuteStatementResp {
  status: TStatus;
  operationHandle?: TOperationHandle;
  directResults?: TSparkDirectResults;
  executionRejected?: boolean;
  maxClusterCapacity?: number;
  queryCost?: number;
  sessionConf?: TDBSqlSessionConf;
  currentClusterLoad?: number;
  idempotencyType?: TOperationIdempotencyType;
  remoteResultCacheEnabled?: boolean;
  isServerless?: boolean;
  operationHandles?: TOperationHandle[];

    constructor(args?: { status: TStatus; operationHandle?: TOperationHandle; directResults?: TSparkDirectResults; executionRejected?: boolean; maxClusterCapacity?: number; queryCost?: number; sessionConf?: TDBSqlSessionConf; currentClusterLoad?: number; idempotencyType?: TOperationIdempotencyType; remoteResultCacheEnabled?: boolean; isServerless?: boolean; operationHandles?: TOperationHandle[]; });
}

export declare class TGetTypeInfoReq {
  sessionHandle: TSessionHandle;
  getDirectResults?: TSparkGetDirectResults;
  runAsync?: boolean;
  operationId?: THandleIdentifier;
  sessionConf?: TDBSqlSessionConf;

    constructor(args?: { sessionHandle: TSessionHandle; getDirectResults?: TSparkGetDirectResults; runAsync?: boolean; operationId?: THandleIdentifier; sessionConf?: TDBSqlSessionConf; });
}

export declare class TGetTypeInfoResp {
  status: TStatus;
  operationHandle?: TOperationHandle;
  directResults?: TSparkDirectResults;

    constructor(args?: { status: TStatus; operationHandle?: TOperationHandle; directResults?: TSparkDirectResults; });
}

export declare class TGetCatalogsReq {
  sessionHandle: TSessionHandle;
  getDirectResults?: TSparkGetDirectResults;
  runAsync?: boolean;
  operationId?: THandleIdentifier;
  sessionConf?: TDBSqlSessionConf;

    constructor(args?: { sessionHandle: TSessionHandle; getDirectResults?: TSparkGetDirectResults; runAsync?: boolean; operationId?: THandleIdentifier; sessionConf?: TDBSqlSessionConf; });
}

export declare class TGetCatalogsResp {
  status: TStatus;
  operationHandle?: TOperationHandle;
  directResults?: TSparkDirectResults;

    constructor(args?: { status: TStatus; operationHandle?: TOperationHandle; directResults?: TSparkDirectResults; });
}

export declare class TGetSchemasReq {
  sessionHandle: TSessionHandle;
  catalogName?: string;
  schemaName?: string;
  getDirectResults?: TSparkGetDirectResults;
  runAsync?: boolean;
  operationId?: THandleIdentifier;
  sessionConf?: TDBSqlSessionConf;

    constructor(args?: { sessionHandle: TSessionHandle; catalogName?: string; schemaName?: string; getDirectResults?: TSparkGetDirectResults; runAsync?: boolean; operationId?: THandleIdentifier; sessionConf?: TDBSqlSessionConf; });
}

export declare class TGetSchemasResp {
  status: TStatus;
  operationHandle?: TOperationHandle;
  directResults?: TSparkDirectResults;

    constructor(args?: { status: TStatus; operationHandle?: TOperationHandle; directResults?: TSparkDirectResults; });
}

export declare class TGetTablesReq {
  sessionHandle: TSessionHandle;
  catalogName?: string;
  schemaName?: string;
  tableName?: string;
  tableTypes?: string[];
  getDirectResults?: TSparkGetDirectResults;
  runAsync?: boolean;
  operationId?: THandleIdentifier;
  sessionConf?: TDBSqlSessionConf;

    constructor(args?: { sessionHandle: TSessionHandle; catalogName?: string; schemaName?: string; tableName?: string; tableTypes?: string[]; getDirectResults?: TSparkGetDirectResults; runAsync?: boolean; operationId?: THandleIdentifier; sessionConf?: TDBSqlSessionConf; });
}

export declare class TGetTablesResp {
  status: TStatus;
  operationHandle?: TOperationHandle;
  directResults?: TSparkDirectResults;

    constructor(args?: { status: TStatus; operationHandle?: TOperationHandle; directResults?: TSparkDirectResults; });
}

export declare class TGetTableTypesReq {
  sessionHandle: TSessionHandle;
  getDirectResults?: TSparkGetDirectResults;
  runAsync?: boolean;
  operationId?: THandleIdentifier;
  sessionConf?: TDBSqlSessionConf;

    constructor(args?: { sessionHandle: TSessionHandle; getDirectResults?: TSparkGetDirectResults; runAsync?: boolean; operationId?: THandleIdentifier; sessionConf?: TDBSqlSessionConf; });
}

export declare class TGetTableTypesResp {
  status: TStatus;
  operationHandle?: TOperationHandle;
  directResults?: TSparkDirectResults;

    constructor(args?: { status: TStatus; operationHandle?: TOperationHandle; directResults?: TSparkDirectResults; });
}

export declare class TGetColumnsReq {
  sessionHandle: TSessionHandle;
  catalogName?: string;
  schemaName?: string;
  tableName?: string;
  columnName?: string;
  getDirectResults?: TSparkGetDirectResults;
  runAsync?: boolean;
  operationId?: THandleIdentifier;
  sessionConf?: TDBSqlSessionConf;

    constructor(args?: { sessionHandle: TSessionHandle; catalogName?: string; schemaName?: string; tableName?: string; columnName?: string; getDirectResults?: TSparkGetDirectResults; runAsync?: boolean; operationId?: THandleIdentifier; sessionConf?: TDBSqlSessionConf; });
}

export declare class TGetColumnsResp {
  status: TStatus;
  operationHandle?: TOperationHandle;
  directResults?: TSparkDirectResults;

    constructor(args?: { status: TStatus; operationHandle?: TOperationHandle; directResults?: TSparkDirectResults; });
}

export declare class TGetFunctionsReq {
  sessionHandle: TSessionHandle;
  catalogName?: string;
  schemaName?: string;
  functionName: string;
  getDirectResults?: TSparkGetDirectResults;
  runAsync?: boolean;
  operationId?: THandleIdentifier;
  sessionConf?: TDBSqlSessionConf;

    constructor(args?: { sessionHandle: TSessionHandle; catalogName?: string; schemaName?: string; functionName: string; getDirectResults?: TSparkGetDirectResults; runAsync?: boolean; operationId?: THandleIdentifier; sessionConf?: TDBSqlSessionConf; });
}

export declare class TGetFunctionsResp {
  status: TStatus;
  operationHandle?: TOperationHandle;
  directResults?: TSparkDirectResults;

    constructor(args?: { status: TStatus; operationHandle?: TOperationHandle; directResults?: TSparkDirectResults; });
}

export declare class TGetPrimaryKeysReq {
  sessionHandle: TSessionHandle;
  catalogName?: string;
  schemaName?: string;
  tableName?: string;
  getDirectResults?: TSparkGetDirectResults;
  runAsync?: boolean;
  operationId?: THandleIdentifier;
  sessionConf?: TDBSqlSessionConf;

    constructor(args?: { sessionHandle: TSessionHandle; catalogName?: string; schemaName?: string; tableName?: string; getDirectResults?: TSparkGetDirectResults; runAsync?: boolean; operationId?: THandleIdentifier; sessionConf?: TDBSqlSessionConf; });
}

export declare class TGetPrimaryKeysResp {
  status: TStatus;
  operationHandle?: TOperationHandle;
  directResults?: TSparkDirectResults;

    constructor(args?: { status: TStatus; operationHandle?: TOperationHandle; directResults?: TSparkDirectResults; });
}

export declare class TGetCrossReferenceReq {
  sessionHandle: TSessionHandle;
  parentCatalogName?: string;
  parentSchemaName?: string;
  parentTableName?: string;
  foreignCatalogName?: string;
  foreignSchemaName?: string;
  foreignTableName?: string;
  getDirectResults?: TSparkGetDirectResults;
  runAsync?: boolean;
  operationId?: THandleIdentifier;
  sessionConf?: TDBSqlSessionConf;

    constructor(args?: { sessionHandle: TSessionHandle; parentCatalogName?: string; parentSchemaName?: string; parentTableName?: string; foreignCatalogName?: string; foreignSchemaName?: string; foreignTableName?: string; getDirectResults?: TSparkGetDirectResults; runAsync?: boolean; operationId?: THandleIdentifier; sessionConf?: TDBSqlSessionConf; });
}

export declare class TGetCrossReferenceResp {
  status: TStatus;
  operationHandle?: TOperationHandle;
  directResults?: TSparkDirectResults;

    constructor(args?: { status: TStatus; operationHandle?: TOperationHandle; directResults?: TSparkDirectResults; });
}

export declare class TGetOperationStatusReq {
  operationHandle: TOperationHandle;
  getProgressUpdate?: boolean;

    constructor(args?: { operationHandle: TOperationHandle; getProgressUpdate?: boolean; });
}

export declare class TGetOperationStatusResp {
  status: TStatus;
  operationState?: TOperationState;
  sqlState?: string;
  errorCode?: number;
  errorMessage?: string;
  taskStatus?: string;
  operationStarted?: Int64;
  operationCompleted?: Int64;
  hasResultSet?: boolean;
  progressUpdateResponse?: TProgressUpdateResp;
  numModifiedRows?: Int64;
  displayMessage?: string;
  diagnosticInfo?: string;
  errorDetailsJson?: string;
  responseValidation?: Buffer;
  idempotencyType?: TOperationIdempotencyType;
  statementTimeout?: Int64;
  statementTimeoutLevel?: TOperationTimeoutLevel;

    constructor(args?: { status: TStatus; operationState?: TOperationState; sqlState?: string; errorCode?: number; errorMessage?: string; taskStatus?: string; operationStarted?: Int64; operationCompleted?: Int64; hasResultSet?: boolean; progressUpdateResponse?: TProgressUpdateResp; numModifiedRows?: Int64; displayMessage?: string; diagnosticInfo?: string; errorDetailsJson?: string; responseValidation?: Buffer; idempotencyType?: TOperationIdempotencyType; statementTimeout?: Int64; statementTimeoutLevel?: TOperationTimeoutLevel; });
}

export declare class TCancelOperationReq {
  operationHandle: TOperationHandle;
  executionVersion?: number;
  replacedByNextAttempt?: boolean;

    constructor(args?: { operationHandle: TOperationHandle; executionVersion?: number; replacedByNextAttempt?: boolean; });
}

export declare class TCancelOperationResp {
  status: TStatus;

    constructor(args?: { status: TStatus; });
}

export declare class TCloseOperationReq {
  operationHandle: TOperationHandle;

    constructor(args?: { operationHandle: TOperationHandle; });
}

export declare class TCloseOperationResp {
  status: TStatus;

    constructor(args?: { status: TStatus; });
}

export declare class TGetResultSetMetadataReq {
  operationHandle: TOperationHandle;
  includeCloudResultFiles?: boolean;

    constructor(args?: { operationHandle: TOperationHandle; includeCloudResultFiles?: boolean; });
}

export declare class TGetResultSetMetadataResp {
  status: TStatus;
  schema?: TTableSchema;
  resultFormat?: TSparkRowSetType;
  lz4Compressed?: boolean;
  arrowSchema?: Buffer;
  cacheLookupResult?: TCacheLookupResult;
  uncompressedBytes?: Int64;
  compressedBytes?: Int64;
  isStagingOperation?: boolean;
  reasonForNoCloudFetch?: TCloudFetchDisabledReason;
  resultFiles?: TDBSqlCloudResultFile[];
  manifestFile?: string;
  manifestFileFormat?: TDBSqlManifestFileFormat;
  cacheLookupLatency?: Int64;
  remoteCacheMissReason?: string;
  fetchDisposition?: TDBSqlFetchDisposition;
  remoteResultCacheEnabled?: boolean;
  isServerless?: boolean;
  resultDataFormat?: TDBSqlResultFormat;
  truncatedByThriftLimit?: boolean;
  resultByteLimit?: Int64;

    constructor(args?: { status: TStatus; schema?: TTableSchema; resultFormat?: TSparkRowSetType; lz4Compressed?: boolean; arrowSchema?: Buffer; cacheLookupResult?: TCacheLookupResult; uncompressedBytes?: Int64; compressedBytes?: Int64; isStagingOperation?: boolean; reasonForNoCloudFetch?: TCloudFetchDisabledReason; resultFiles?: TDBSqlCloudResultFile[]; manifestFile?: string; manifestFileFormat?: TDBSqlManifestFileFormat; cacheLookupLatency?: Int64; remoteCacheMissReason?: string; fetchDisposition?: TDBSqlFetchDisposition; remoteResultCacheEnabled?: boolean; isServerless?: boolean; resultDataFormat?: TDBSqlResultFormat; truncatedByThriftLimit?: boolean; resultByteLimit?: Int64; });
}

export declare class TFetchResultsReq {
  operationHandle: TOperationHandle;
  orientation?: TFetchOrientation;
  maxRows: Int64;
  fetchType?: number;
  maxBytes?: Int64;
  startRowOffset?: Int64;
  includeResultSetMetadata?: boolean;

    constructor(args?: { operationHandle: TOperationHandle; orientation?: TFetchOrientation; maxRows: Int64; fetchType?: number; maxBytes?: Int64; startRowOffset?: Int64; includeResultSetMetadata?: boolean; });
}

export declare class TFetchResultsResp {
  status: TStatus;
  hasMoreRows?: boolean;
  results?: TRowSet;
  resultSetMetadata?: TGetResultSetMetadataResp;
  responseValidation?: Buffer;

    constructor(args?: { status: TStatus; hasMoreRows?: boolean; results?: TRowSet; resultSetMetadata?: TGetResultSetMetadataResp; responseValidation?: Buffer; });
}

export declare class TGetDelegationTokenReq {
  sessionHandle: TSessionHandle;
  owner: string;
  renewer: string;
  sessionConf?: TDBSqlSessionConf;

    constructor(args?: { sessionHandle: TSessionHandle; owner: string; renewer: string; sessionConf?: TDBSqlSessionConf; });
}

export declare class TGetDelegationTokenResp {
  status: TStatus;
  delegationToken?: string;

    constructor(args?: { status: TStatus; delegationToken?: string; });
}

export declare class TCancelDelegationTokenReq {
  sessionHandle: TSessionHandle;
  delegationToken: string;
  sessionConf?: TDBSqlSessionConf;

    constructor(args?: { sessionHandle: TSessionHandle; delegationToken: string; sessionConf?: TDBSqlSessionConf; });
}

export declare class TCancelDelegationTokenResp {
  status: TStatus;

    constructor(args?: { status: TStatus; });
}

export declare class TRenewDelegationTokenReq {
  sessionHandle: TSessionHandle;
  delegationToken: string;
  sessionConf?: TDBSqlSessionConf;

    constructor(args?: { sessionHandle: TSessionHandle; delegationToken: string; sessionConf?: TDBSqlSessionConf; });
}

export declare class TRenewDelegationTokenResp {
  status: TStatus;

    constructor(args?: { status: TStatus; });
}

export declare class TProgressUpdateResp {
  headerNames: string[];
  rows: string[][];
  progressedPercentage: number;
  status: TJobExecutionStatus;
  footerSummary: string;
  startTime: Int64;

    constructor(args?: { headerNames: string[]; rows: string[][]; progressedPercentage: number; status: TJobExecutionStatus; footerSummary: string; startTime: Int64; });
}

export declare var PRIMITIVE_TYPES: TTypeId[];

export declare var COMPLEX_TYPES: TTypeId[];

export declare var COLLECTION_TYPES: TTypeId[];

export declare var TYPE_NAMES: { [k: number /*TTypeId*/]: string; };

export declare var CHARACTER_MAXIMUM_LENGTH: string;

export declare var PRECISION: string;

export declare var SCALE: string;
