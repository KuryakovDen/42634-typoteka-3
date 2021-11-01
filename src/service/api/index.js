'use strict';

const {Router} = require(`express`);
const category = require(`../api/category`);

const getMockData = require(`../lib/get-mock-data`);

const {CategoryService} = require(`../data-service/category`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
})();

module.exports = app;
