require('dotenv').config();

const express = require('express');
const path = require('path');
const gzipStatic = require('connect-gzip-static');
const compression = require('compression');

const {notFound} = require('./middlewares/404');
const {emailRouter} = require('./routes/email');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(compression());
app.use(gzipStatic(path.join(__dirname, 'public')));

app.use('/email', emailRouter);
app.use(notFound);

module.exports = app;
