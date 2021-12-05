'use strict';

const api = require(`../api`).getAPI();
const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const myArticles = await api.getArticles();
  res.render(`my/my`, {myArticles});
});

myRouter.get(`/comments`, async (req, res) => {
  const myArticles = await api.getArticles();
  res.render(`my/comments`, { myArticles: myArticles.slice(0, 3) })
});

module.exports = myRouter;
