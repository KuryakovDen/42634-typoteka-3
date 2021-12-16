'use strict';

const Sequelize = require(`sequelize`);
const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT} = process.env;

const isExistsNotDefinedVariable = [DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT].some((value) => {
  return value === undefined;
});

if (isExistsNotDefinedVariable) {
  throw new Error(`One or more environmental variables are not defined`);
}
