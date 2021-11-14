'use strict';

const express = require(`express`);
const {getLogger} = require("../lib/logger");
const fs = require(`fs`).promises;
const {DEFAULT_PORT, FILE_NAME, HttpCode, NOT_FOUND_TEXT} = require(`../../const`);

const logger = getLogger({name: `api`});

module.exports = {
  name: `--server`,
  run(args) {
    const [enteredPort] = args;
    const port = Number.parseInt(enteredPort, 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());

    app.get(`/posts`, async (req, res) => {
      try {
        const fileContent = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(fileContent);

        res.json(mocks);
      } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
        res.send([]);
      }
    });

    app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(NOT_FOUND_TEXT));

    logger.info(`Listening to connections on ${port}`);
    app.listen(port);
  }
};
