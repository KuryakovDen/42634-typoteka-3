'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../const`);

const route = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const articles = await articleService.findAll();

    return res.status(HttpCode.SUCCESS).json(articles);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const currentArticle = articleService.getArticle(articleId);

    if (!currentArticle) {
      return res.status(HttpCode.NOT_FOUND).send(`Not article with id ${articleId}`);
    }

    return res.status(HttpCode.SUCCESS).json(currentArticle);
  });

  route.post(`/`, (req, res) => {
    const newArticle = req.body;

    articleService.create(newArticle);
  });
};
