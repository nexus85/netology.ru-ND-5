"use strict";

const   express = require('express'),
        app = module.exports = express();

app.use('/users', require('./users'));
app.use('/tasks', require('./tasks'));