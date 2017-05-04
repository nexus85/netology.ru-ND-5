"use strict";
const   mClient = require('mongodb').MongoClient,
        url = 'mongodb://localhost:27017/mongoStart';

mClient.connect(url, (err, db) => {
    if (err) {
        console.log('connection error',err);
    } else {
        const collection = db.collection('names'),
        names = [
            {name: 'Ivan'},
            {name: 'Sergei'},
            {name: 'John'},
            {name: 'Pete'},
            {name: 'Aleksey'}
        ];
        collection.insert(names, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                collection.find({}).toArray((err, res) => {
                    console.log(res);
                });
                collection.updateMany({name: 'John'}, {$set: {name: 'Evgeny'}}, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        collection.find({}).toArray((err, res) => {
                            console.log(res);
                        });
                        collection.find((err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                collection.remove({name: 'Evgeny'});

                                collection.find({}).toArray((err, res) => {
                                    console.log(res);
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});