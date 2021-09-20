'use strict';

const DEFAULT_OFFERS_COUNT = 1;
const MAX_ANNOUNCE_SENTENCE_COUNT = 5;
const USER_ARGV_INDEX = 2;
const MAX_MOCK_ELEMENTS = 1000;

const FILE_NAME = `mock.json`;
const DEFAULT_COMMAND = `--help`;

const ExitCode = {
  Success: 0,
  Fail: 1
};

module.exports = {
  DEFAULT_OFFERS_COUNT,
  MAX_ANNOUNCE_SENTENCE_COUNT,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  FILE_NAME,
  MAX_MOCK_ELEMENTS,
  ExitCode,
  Titles,
  Announcements,
  Categories
};
