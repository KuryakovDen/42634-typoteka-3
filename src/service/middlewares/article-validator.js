'use strict';

const {HttpCode} = require(`../../const`);

const articleKeys = [
  `title`,
  `createdDate`,
  `category`,
  `announce`,
  `fullText`
];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const newArticleKeys = Object.keys(newArticle);

  const isKeyExists = articleKeys.every((articleKey) => newArticleKeys.includes(articleKey));

  if (!isKeyExists) {
    res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  next();
};
