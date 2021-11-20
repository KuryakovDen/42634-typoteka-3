'use strict';

const {getLogger} = require("../lib/logger");
const logger = getLogger({name: `service`});
const packageJsonFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    logger.info(packageJsonFile.version);
  }
};

