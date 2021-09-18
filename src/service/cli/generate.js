'use strict';

const {getRandomInt, shuffle, getRandomDate} = require(`../../utils`);
const fs = require(`fs`);
const chalk = require(`chalk`);
const util = require(`util`);
const {DEFAULT_OFFERS_COUNT, MAX_ANNOUNCE_SENTENCE_COUNT, FILE_NAME, Titles, Announcements, Categories} = require(`../../const`);

const generateOffers = (offersCount) => {
  const offers = [];

  for (let i = 0; i < offersCount; i++) {
    offers.push({
      title: Titles[getRandomInt(0, Titles.length - 1)],
      createdDate: getRandomDate(getRandomInt(0, 90)),
      announce: shuffle(Announcements).slice(0, getRandomInt(1, MAX_ANNOUNCE_SENTENCE_COUNT)),
      fullText: shuffle(Announcements).slice(0, getRandomInt(1, Announcements.length - 1)),
      category: shuffle(Categories).slice(0, getRandomInt(1, Categories.length - 1))
    });
  }

  return offers;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_OFFERS_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    const writeFilePromise = util.promisify(fs.writeFile);

    await writeFilePromise(FILE_NAME, content)
      .then(() => console.info(chalk.green(`Operation success. File created.`)))
      .catch(() => console.error(chalk.red(`Can't write data to file...`)))
  }
};
