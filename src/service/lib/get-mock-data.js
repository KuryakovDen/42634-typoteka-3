'use strict';

const {getLogger} = require("./logger");
const {FILE_NAME} = require(`../../const`);
const fs = require(`fs`).promises;
const logger = getLogger({name: `service`});

let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    logger.error(err);
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

(async () => {
  try {
    const fileContent = await fs.readFile(FILE_NAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    logger.error(err);
  }
})();

module.exports = getMockData;
