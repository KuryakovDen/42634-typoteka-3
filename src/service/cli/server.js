'use strict';

const express = require(`express`);
const {getLogger} = require("../lib/logger");
const fs = require(`fs`).promises;
const routes = require(`../api`);
const {DEFAULT_PORT, FILE_NAME, HttpCode, NOT_FOUND_TEXT, API_PREFIX} = require(`../../const`);

const logger = getLogger({name: `api`});

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

app.use(API_PREFIX, routes);

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

    app.use((req, res) => {
      res
        .status(HttpCode.NOT_FOUND)
        .send(NOT_FOUND_TEXT)
      logger.error(`Route not found: ${req.url}`)
    });

    app.use((err, _req, _res, _next) => {
      logger.error(`An error occured on processing request: ${err.message}`);
    });

    app.use((req, res, next) => {
      logger.debug(`Request on route ${req.url}`);
      res.on(`finish`, () => {
        logger.info(`Response status code ${res.statusCode}`);
      });
      next();
    });

    logger.info(`Listening to connections on ${port}`);
    app.listen(port);
  }
};
