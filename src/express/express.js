'use strict';

const express = require(`express`);
const {DEFAULT_SERVER_PORT} = require(`../const`);
const mainRoutes = require(`./routes/main-routes`);

const app = express();
app.use(`/`, mainRoutes);

app.listen(DEFAULT_SERVER_PORT);
