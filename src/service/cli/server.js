'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const {DEFAULT_PORT} = require(`../../const`);

module.exports = {
  name: `--server`,
  run(args) {
    const [enteredPort] = args;
    const port = Number.parseInt(enteredPort, 10) || DEFAULT_PORT;

    const onClientConnect = () => {};

    const onSendResponse = () => {};

    http.createServer(onClientConnect())
      .listen(port)
      .on(`listening`, () => console.info(chalk.green(`Ожидаю подключений на порту ${port}`)))
      .on(`error`, ({message}) => console.error(chalk.red(`Ошибка при создании сервера: ${message}`)))
  }
};
