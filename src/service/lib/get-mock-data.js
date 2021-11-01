'use strict';

const fs = require(`fs`).promises;
const {FILE_NAME} = require(`../../const`);

let data = [];

const getMockData = async () => {
  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME);
    data = JSON.parse(fileContent);
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = getMockData;
