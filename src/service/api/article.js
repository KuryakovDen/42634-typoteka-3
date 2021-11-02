'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../const`);
const articleValidator = require(`../middlewares/article-validator`);

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
    const newArticle = articleService.create(req.body);

    return res.status(HttpCode.CREATED).json(newArticle);
  });

  route.put(`/:articleId`, articleValidator, (req, res) => {
    const {articleId} = req.params;

    const isArticleExists = articleService.getArticle(articleId);

    if (!isArticleExists) {
      return res
        .status(HttpCode.NOT_FOUND).send(`Not found article with id ${articleId}`);
    }

    const updatedArticle = articleService.updateArticle(articleId, req.body);

    return res.status(HttpCode.SUCCESS).json(updatedArticle);
  });

  route.delete(`/:articleId`, articleValidator, (req, res) => {
    const {deletedId} = req.params;

    const deletedArticle = articleService.getArticle(deletedId);

    if (!deletedArticle) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found article with id ${deletedId}`);
    }

    return res.status(HttpCode.SUCCESS).json(deletedArticle);
  });

  route.get(`/:articleId/comments`, articleValidator, (req, res) => {

  });

  route.delete(`/:articleId/comments/:commentId`, articleValidator, (req, res) => {

  });

  route.post(`/:articleId/comments`, articleValidator, (req, res) => {

  });
};
