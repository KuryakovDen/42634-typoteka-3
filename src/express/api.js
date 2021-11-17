'use strict';

const axios = require(`axios`);

class API {
  constructor(baseUrl, timeout) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});

    return response.data;
  }

  async createOffer(data) {
    return this._load(`/articles`, {
      method: `POST`,
      data
    });
  }

  async getCategories() {
    return this._load(`/categories`);
  }

  getArticles() {
    return this._load(`/articles`);
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  search(query) {
    return this._load(`/search`, { params: {query} });
  }
}
