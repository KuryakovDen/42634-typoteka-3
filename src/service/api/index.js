'use strict';

const {Router} = require(`express`);
const category = require(`../api/category`);
const search = require(`../api/search`);
const article = require(`../api/article`);

const getMockData = require(`../lib/get-mock-data`);

const {CategoryService} = require(`../data-service/category`)
const {SearchService} = require(`../data-service/search`)
const {ArticleService} = require(`../data-service/article`)
const {CommentService} = require(`../data-service/comment`)

const app = new Router();

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  article(app, new ArticleService(mockData), new CommentService());
})();

module.exports = app;
