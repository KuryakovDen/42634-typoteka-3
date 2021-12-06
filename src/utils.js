'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = (daysCount) => new Date(Date.now() - daysCount * 24 * 60 * 60 * 1000);

const shuffle = (array) => array.slice().sort(() => Math.random() - 0.5);

const ensureArray = (value) => Array.isArray(value) ? value : [value];

module.exports = {
  getRandomInt,
  getRandomDate,
  shuffle,
  ensureArray
};
