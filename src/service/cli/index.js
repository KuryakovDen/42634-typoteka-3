'use strict';

const versionModule = require('../cli/version');
const helpModule = require('../cli/help');
const generateModule = require('../cli/generate');

const Cli = {
  [versionModule.name]: versionModule,
  [helpModule.name]: helpModule,
  [generateModule.name]: generateModule
};

module.exports = {
  Cli
};
