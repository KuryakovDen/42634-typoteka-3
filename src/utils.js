'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getDoubleCount = (number) => number < 10 ? `0${number}` : number;

const getRandomDate = () => {
  const YearRandomRestrict = {
    MIN: 1950,
    MAX: 2021,
  };

  const MonthRandomRestrict = {
    MIN: 1,
    MAX: 12,
  };

  const DayRandomRestrict = {
    MIN: 1,
    MAX: 31,
  };

  const getRandomYear = getRandomInt(YearRandomRestrict.MIN, YearRandomRestrict.MAX);
  const getRandomMonth = getDoubleCount(getRandomInt(MonthRandomRestrict.MIN, MonthRandomRestrict.MAX));
  const getRandomDay = getDoubleCount(getRandomInt(DayRandomRestrict.MIN, DayRandomRestrict.MAX));

  return new Date(`${getRandomYear}-${getRandomMonth}-${getRandomDay}T03:24:00`);
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }

  return array;
};

module.exports = {
  getRandomInt,
  getRandomDate,
  shuffle
}
