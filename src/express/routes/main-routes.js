'use strict';

const api = require(`../api`).getAPI();
const {Router} = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.render(`main`));

mainRouter.get(`/`, async (req, res) => {
  const offers = await api.getArticles();
  res.render(`main`, {offers});
});

mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, (req, res) => res.render(`search`));
mainRouter.get(`/categories`, (req, res) => res.render(`all-categories`));

module.exports = mainRouter;
