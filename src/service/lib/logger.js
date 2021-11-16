'use strict';

const pino = require(`pino`);
const {ApplicationMode, LOG_FILE_PATH} = require(`../../const`);

const isDevMode = process.env.NODE_ENV === ApplicationMode.DEVELOPMENT;
const defaultLogLevel = isDevMode ? `info` : `error`;

const logger = pino({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  prettyPrint: isDevMode
}, isDevMode ? process.stdout : pino.destination(LOG_FILE_PATH));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
