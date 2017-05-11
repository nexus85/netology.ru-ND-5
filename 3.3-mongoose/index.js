"use strict";

const   express = require('express'),
    bodyParser = require('body-parser'),
    app = module.exports = express(),
    mongoose = require('mongoose'),
    db = mongoose.connection,
    url = 'mongodb://localhost:27017/toDoList',
    api = require('./api');

mongoose.connect(url);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Mongoose сonnected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api);

app.listen(1080, () => {
    console.log('Server started');
});