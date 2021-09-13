'use strict';

const {getRandomInt, shuffle, getRandomDate} = require(`../../utils`);
const {DEFAULT_OFFERS_COUNT, MAX_ANNOUNCE_SENTENCE_COUNT, Titles, Announcements, Categories} = require(`../../const`);

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

console.log(generateOffers(2));

module.exports = {
  name: `--generate`,
  run(offersCount) {
    generateOffers(offersCount);
  }
};
