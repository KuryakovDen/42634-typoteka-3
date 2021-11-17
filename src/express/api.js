'use strict';

const axios = require(`axios`);

class API {
  constructor(baseUrl, timeout) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }
}
