'use strict';

const {getRandomInt, shuffle, getRandomDate} = require(`../../utils`);

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {DEFAULT_OFFERS_COUNT, MAX_ANNOUNCE_SENTENCE_COUNT, FILE_NAME} = require(`../../const`);

const MockFilesPath = {
  TITLES: `./data/titles.txt`,
  SENTENCES: `./data/sentences.txt`,
  CATEGORIES: `./data/categories.txt`
}

const readContent = async (path) => {
  try {
    const content = await fs.readFile(path, `utf8`);
    return content.trim().split(`\n`);
  } catch (error) {
    console.error(chalk.red(error));
    return [];
  }
};

const generateOffers = (offersCount, titles, sentences, categories) => {
  const offers = [];

  for (let i = 0; i < offersCount; i++) {
    offers.push({
      title: titles[getRandomInt(0, titles.length - 1)],
      createdDate: getRandomDate(getRandomInt(0, 90)),
      announce: shuffle(sentences).slice(0, getRandomInt(1, MAX_ANNOUNCE_SENTENCE_COUNT)),
      fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)),
      category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1))
    });
  }

  return offers;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_OFFERS_COUNT;
    const content = JSON.stringify(
      generateOffers(
        countOffer,
        await readContent(MockFilesPath.TITLES),
        await readContent(MockFilesPath.SENTENCES),
        await readContent(MockFilesPath.CATEGORIES)
      ));

    await fs.writeFile(FILE_NAME, content)
      .then(() => console.info(chalk.green(`Operation success. File created.`)))
      .catch(() => console.error(chalk.red(`Can't write data to file...`)));
  }
};
