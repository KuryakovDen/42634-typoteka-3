'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
  const getRandomMonth = getRandomInt(MonthRandomRestrict.MIN, MonthRandomRestrict.MAX).toString().padStart(2, '0');
  const getRandomDay = getRandomInt(DayRandomRestrict.MIN, DayRandomRestrict.MAX).toString().padStart(2, '0');

  return new Date(`${getRandomYear}-${getRandomMonth}-${getRandomDay}T03:24:00`);
};

const shuffle = (array) => array.slice().sort(() => Math.random() - 0.5);

module.exports = {
  getRandomInt,
  getRandomDate,
  shuffle
}
