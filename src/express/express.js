'use strict';

const {DEFAULT_SERVER_PORT} = require(`../const`);
const express = require(`express`);

const app = express();

app.listen(DEFAULT_SERVER_PORT);
