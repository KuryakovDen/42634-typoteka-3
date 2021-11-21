'use strict';

const express = require(`express`);
const {getLogger} = require("../lib/logger");
const {DEFAULT_PORT, HttpCode, API_PREFIX} = require(`../../const`);
const routes = require(`../api`);

const app = express();
const logger = getLogger({
  name: `api`,
});


app.use(express.json());
app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);

  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });

  return next();
});
app.use(API_PREFIX, routes);
app.use((req, res) => {
  logger.error(`Route not found: ${req.url}`);

  return res.status(HttpCode.NOT_FOUND).send(`Not found`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    const server = app.listen(port, () => {
      return logger.info(`Listening to connections on ${port}`);
    });

    server.once(`error`, (err) => {
      return logger.error(`An error occurred on server creation: ${err.message}`);
    });
  },
};
