'use strict';

const DEFAULT_OFFERS_COUNT = 1;
const MAX_ANNOUNCE_SENTENCE_COUNT = 5;
const USER_ARGV_INDEX = 2;
const MAX_MOCK_ELEMENTS = 1000;
const DEFAULT_PORT = 3000;

const FILE_NAME = `mock.json`;
const DEFAULT_COMMAND = `--help`;
const NOT_FOUND_TEXT = `Not Found`;

const ExitCode = {
  Success: 0,
  Fail: 1
};

const HttpCode = {
  SUCCESS: 200,
  NOT_FOUND: 404
};

module.exports = {
  DEFAULT_OFFERS_COUNT,
  MAX_ANNOUNCE_SENTENCE_COUNT,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  DEFAULT_PORT,
  FILE_NAME,
  MAX_MOCK_ELEMENTS,
  NOT_FOUND_TEXT,
  ExitCode,
  HttpCode
};
