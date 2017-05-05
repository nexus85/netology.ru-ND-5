"use strict";

const   express = require('express'),
        bodyParser = require('body-parser'),
        app = module.exports = express(),
        mClient = require('mongodb').MongoClient,
        url = 'mongodb://localhost:27017/mongoStart',
        api = require('./api');

app.use('/api', api);

app.use(function(err, req, res, next) {
    res.json(err.stack);
});

//Список телефонов с фамилией и именем - localhost:1080
mClient.connect(url, (err, db) => {
    if (err) {
        console.log('connection error', err);
    } else {
        const collection = db.collection('contacts');
        app.get('/', (req, res) => {
            collection.find({}).toArray((error, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
        });
    }
});

app.listen(1080, () => {
    console.log('Server start');
});