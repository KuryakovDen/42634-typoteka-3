'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, FILE_NAME, HttpCode} = require(`../../const`);

module.exports = {
  name: `--server`,
  run(args) {
    const [enteredPort] = args;
    const port = Number.parseInt(enteredPort, 10) || DEFAULT_PORT;

    const sendResponse = () => {};

    const onClientConnect = async (req, res) => {
      switch (req.url) {
        case `/`:
          try {
            const fileContent = await fs.readFile(FILE_NAME);
            const mocks = JSON.parse(fileContent);
            const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
            sendResponse();
          } catch (error) {
            console.error(chalk.red(error));
            sendResponse();
          }

          break;
        default:
          sendResponse();
      }
    };

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, () => console.info(chalk.green(`Ожидаю подключений на порту ${port}`)))
      .on(`error`, ({message}) => console.error(chalk.red(`Ошибка при создании сервера: ${message}`)))
  }
};
