'use strict';

const {getRandomInt, shuffle, getRandomDate} = require(`../../utils`);
const fs = require(`fs`);
const chalk = require(`chalk`);
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
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_OFFERS_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(chalk.red(`Can't write data to file...`));
      }

      return console.info(chalk.green(`Operation success. File created.`));
    });
  }
};
