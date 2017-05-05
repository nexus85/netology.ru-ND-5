const express = require('express');
const app = module.exports = express();

app.use('/contacts', require('./contacts'));