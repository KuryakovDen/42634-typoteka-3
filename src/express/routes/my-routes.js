'use strict';

const api = require(`../api`).getAPI();
const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const myArticles = await api.getArticles();
  res.render(`my/my`, {myArticles});
});

myRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`comments`, { articles: articles.slice(0, 3) })
});

module.exports = myRouter;
