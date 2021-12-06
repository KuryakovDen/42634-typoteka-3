'use strict';

const {getLogger} = require("./lib/logger");
const {Cli} = require(`./cli/index`);
const logger = getLogger({name: `service`});
const {DEFAULT_COMMAND, USER_ARGV_INDEX, ExitCode, MAX_MOCK_ELEMENTS} = require(`../const`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.Success);
}

const MockElementsCount = userArguments.slice(1);

if (MockElementsCount > MAX_MOCK_ELEMENTS) {
  logger.error(`Не больше ${MAX_MOCK_ELEMENTS} публикаций`);
  process.exit(ExitCode.Fail);
}

Cli[userCommand].run(MockElementsCount);
