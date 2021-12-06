'use strict';

const api = require(`../api`).getAPI();
const {Router} = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`main`, {articles});
});

mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));


mainRouter.get(`/search`, async (req, res) => {
  try {
    const {query} = req.query;
    const result = await api.search(query);
    res.render(`search`, { result });
  } catch (error) {
    res.render(`search`, { result: [] });
  }
});


mainRouter.get(`/categories`, (req, res) => res.render(`all-categories`));

module.exports = mainRouter;
