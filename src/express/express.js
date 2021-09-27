'use strict';

const express = require(`express`);
const {DEFAULT_SERVER_PORT} = require(`../const`);
const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);

const app = express();
app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);

app.listen(DEFAULT_SERVER_PORT);
