'use strict';

const express = require(`express`);
const {DEFAULT_SERVER_PORT} = require(`../const`);
const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const articlesRoutes = require(`./routes/articles-routes`);

const app = express();
app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

app.listen(DEFAULT_SERVER_PORT);
