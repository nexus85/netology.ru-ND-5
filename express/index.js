"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const api = require('./api');
const app = express();

app.use('/api', api);

app.all('*', (req, res) => {
    res.send('ok');
});

app.use(function(err, req, res, next) {
    res.json(err.stack);
});

app.listen(1234, () => {
    console.log('Server start');
});

