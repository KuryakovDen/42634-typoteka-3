'use strict';

const express = require(`express`);
const {getLogger} = require(`../lib/logger`);
const {DEFAULT_PORT, HttpCode, API_PREFIX, ExitCode} = require(`../../const`);
const sequelize = require(`../lib/sequelize`);
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

app.get(`/posts`, async (req, res) => {
  res.send([]);
});


app.use((req, res) => {
  logger.error(`Route not found: ${req.url}`);

  return res.status(HttpCode.NOT_FOUND).send(`Not found`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});

module.exports = {
  name: `--server`,
  async run(args) {
    try {
      logger.info(`Trying to connect database...`);
      await sequelize.authenticate();
    } catch (error) {
      logger.error(`An error occurred: ${error.message}`);
      process.exit(ExitCode.Fail);
    }

    logger.info(`Connection to database established`);

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
