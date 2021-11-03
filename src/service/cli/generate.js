'use strict';

const {getRandomInt, shuffle, getRandomDate} = require(`../../utils`);

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {DEFAULT_OFFERS_COUNT, MAX_ANNOUNCE_SENTENCE_COUNT, FILE_NAME, MAX_ID_LENGTH} = require(`../../const`);

const MockFilesPath = {
  TITLES: `./data/titles.txt`,
  SENTENCES: `./data/sentences.txt`,
  CATEGORIES: `./data/categories.txt`,
  COMMENTS: `./data/comments.txt`
};

const readContent = async (path) => {
  try {
    const content = await fs.readFile(path, `utf8`);
    return content.trim().split(`\n`);
  } catch (error) {
    console.error(chalk.red(error));
    return [];
  }
};

const generateComments = (count, comments) => {
  const offerComments = [];

  for (let i = 0; i < count; i++) {
    offerComments.push({
      id: nanoid(MAX_ID_LENGTH),
      text: shuffle(comments).slice(0, getRandomInt(1, comments.length - 1)).join(` `)
    });
  }

  return offerComments;
};

const generateOffers = (offersCount, titles, sentences, categories, comments) => {
  const offers = [];

  for (let i = 0; i < offersCount; i++) {
    offers.push({
      id: nanoid(MAX_ID_LENGTH),
      title: titles[getRandomInt(0, titles.length - 1)],
      createdDate: getRandomDate(getRandomInt(0, 90)),
      announce: shuffle(sentences).slice(0, getRandomInt(1, MAX_ANNOUNCE_SENTENCE_COUNT)),
      fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)),
      category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
      comments: generateComments(getRandomInt(1, comments.length - 1), comments)
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
            await readContent(MockFilesPath.CATEGORIES),
            await readContent(MockFilesPath.COMMENTS)
        ));

    await fs.writeFile(FILE_NAME, content)
      .then(() => console.info(chalk.green(`Operation success. File created.`)))
      .catch(() => console.error(chalk.red(`Can't write data to file...`)));
  }
};
