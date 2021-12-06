'use strict';

const DEFAULT_ARTICLES_COUNT = 1;
const MAX_ANNOUNCE_SENTENCE_COUNT = 5;
const USER_ARGV_INDEX = 2;
const MAX_MOCK_ELEMENTS = 1000;
const DEFAULT_PORT = 3000;
const DEFAULT_SERVER_PORT = 7775;
const MAX_ID_LENGTH = 6;

const LOG_FILE_PATH = `./logs/api.log`;
const FILE_NAME = `mock.json`;
const DEFAULT_COMMAND = `--help`;
const NOT_FOUND_TEXT = `Not Found`;
const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;
const API_PREFIX = `/api`;

const ExitCode = {
  Success: 0,
  Fail: 1
};

const HttpCode = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404
};

const ApplicationMode = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {
  DEFAULT_ARTICLES_COUNT,
  MAX_ANNOUNCE_SENTENCE_COUNT,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  DEFAULT_PORT,
  DEFAULT_SERVER_PORT,
  MAX_ID_LENGTH,
  PUBLIC_DIR,
  UPLOAD_DIR,
  API_PREFIX,
  LOG_FILE_PATH,
  FILE_NAME,
  MAX_MOCK_ELEMENTS,
  NOT_FOUND_TEXT,
  ExitCode,
  ApplicationMode,
  HttpCode
};
