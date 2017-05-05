/*
* contact = {
*   firstname:
*   lastname:
*   phone:
* }
* */

"use strict";

const   express = require('express'),
        bodyParser = require('body-parser'),
        app = module.exports = express(),
        mClient = require('mongodb').MongoClient,
        url = 'mongodb://localhost:27017/mongoStart';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

mClient.connect(url, (err, db) => {
    if (err) {
        console.log('connection error',err);
    } else {
        const collection = db.collection('contacts');

        const ObjectID = require('mongodb').ObjectID;

        //Список телефонов с фамилией и именем - localhost:1080/api/v0/contacts
        app.get('/', (req, res) => {
            collection.find({}, {_id: 0}).toArray((error, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
        });

        //Добавление нового контакта - localhost:1080/api/v0/contacts/add
        app.post('/add', (req, res) => {
            let contact = req.body;
            const validate = (contact.hasOwnProperty('firstname')) && (contact.hasOwnProperty('lastname')) && (contact.hasOwnProperty('phone'));
            if (validate) {
                collection.insert(contact, (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send('Contact added');
                    }
                });
            } else {
                res.send('Not enough data');
            }
        });

        //Редактирование старой информации - localhost:1080/api/v0/contacts/edit/<id>
        app.put('/edit/:id', (req, res) => {
            const id = req.params.id;
            const newInfo = req.body;
            collection.find({_id: new ObjectID(id)}).toArray((err, result) => {
                const config = {
                    $set: {
                    }
                };
                if (newInfo.firstname !== result[0].firstname) {config.$set.firstname = newInfo.firstname;}
                if (newInfo.lastname !== result[0].lastname) {config.$set.lastname = newInfo.lastname;}
                if (newInfo.phone !== result[0].phone) {config.$set.phone = newInfo.phone;}

                collection.update({_id: new ObjectID(id)}, config, (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send('Update success');
                    }
                });
            });
        });

        //Удаление контакта - localhost:1080/api/v0/contacts/delete/<id>
        app.delete('/delete/:id', (req, res) => {
            const id = req.params.id;
            collection.remove({_id: new ObjectID(id)}, (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send('Contact deleted');
                }
            });
        });

        //Поиск по номеру телефона, фамилии, имени - localhost:1080/api/v0/contacts/find?string=<поисковый запрос>
        app.get('/find', (req, res) => {
            const query = req.query.string;
            collection.find({$or: [{firstname: query}, {lastname: query}, {phone: query}]}).toArray((err, result) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(result);
                }
            });
        });
    }
});