const express = require('express');
const app = express();

app.use(require('./usuarios'));
app.use(require('./login'));
app.use(require('./login2'));

module.exports = app;