'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../const`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }

  getArticle(articleId) {
    return this._articles.find((article) => article.id === articleId);
  }

  createArticle(article) {
    const newArticle = Object.assign({
      id: nanoid(MAX_ID_LENGTH),
      comments: []
    }, article);

    this._articles.push(newArticle);

    return newArticle;
  }

  updateArticle(id, article) {
    const updatedArticle = this._articles.find((post) => post.id === id);

    return Object.assign(updatedArticle, article);
  }

  deleteArticle(deletedId) {
    const deletedArticle = this._articles.find((article) => article.id === deletedId);

    if (!deletedArticle) {
      return null;
    }

    this._articles.filter((article) => article.id !== deletedArticle.id);

    return deletedArticle;
  }
}

module.exports = ArticleService;
