'use strict';

const {HttpCode} = require(`../../const`);

const commentKeys = [`text`];

module.exports = (req, res, next) => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const keyExists = commentKeys.every((key) => keys.includes(key));

  if (!keyExists) {
    res
      .status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  next();
};
