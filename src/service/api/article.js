'use strict';

const {Router} = require(`express`);
const {HttpCode, NOT_FOUND_TEXT} = require(`../../const`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExist = require(`../middlewares/article-exist`);
const commentValidator = require(`../middlewares/comment-validator`);

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

  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;

    const comments = commentService.findAll(article);

    return res.status(HttpCode.SUCCESS).json(comments);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;

    const deletedComment = commentService.deleteComment(article, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND).send(NOT_FOUND_TEXT);
    }

    return res.status(HttpCode.SUCCESS).json(deletedComment);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const newComment = commentService.createComment(article, req.body);

    return res.status(HttpCode.CREATED).json(newComment);
  });
};
