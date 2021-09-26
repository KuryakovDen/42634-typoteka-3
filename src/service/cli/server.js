'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const http = require(`http`);
const {DEFAULT_PORT, FILE_NAME, HttpCode, NOT_FOUND_TEXT} = require(`../../const`);

module.exports = {
  name: `--server`,
  run(args) {
    const [enteredPort] = args;
    const port = Number.parseInt(enteredPort, 10) || DEFAULT_PORT;

    const sendResponse = (res, statusCode, message) => {
      const template = `
        <!Doctype html>
          <html lang="ru">
          <head>
            <title>With love from Node</title>
          </head>
          <body>${message}</body>
        </html>`.trim();

      res.writeHead(statusCode, {
        'Content-Type': `text/html; charset=UTF-8`,
      });

      res.end(template);
    };

    const onClientConnect = async (req, res) => {
      switch (req.url) {
        case `/`:
          try {
            const fileContent = await fs.readFile(FILE_NAME);
            const mocks = JSON.parse(fileContent);
            const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
            sendResponse(res, HttpCode.SUCCESS, `<ul>${message}</ul>`);
          } catch (error) {
            console.error(chalk.red(error));
            sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_TEXT);
          }

          break;
        default:
          sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_TEXT);
      }
    };

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, () => console.info(chalk.green(`Ожидаю подключений на порту ${port}`)))
      .on(`error`, ({message}) => console.error(chalk.red(`Ошибка при создании сервера: ${message}`)));
  }
};
