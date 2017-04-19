"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.get('/hello', (req, res) => {
    res.send(`Hello stranger!`);
});

app.get('/hello/:name', (req, res) => {
    res.send(`Hello ${req.params.name}!`);
});

app.all('/sub/*/?*?', (req, res) => {
    res.send(`You requested URI: ${req.url}`);
});

const mddlware = (req, res, next) => {
    if (!req.header('Key')) {
        res.status(401).send('err');
    }
    next();
};

app.post('/post', mddlware, (req, res) => {
    if (req.header('Key')) {
        if (Object.keys(req.body).length > 0) {
            res.json(req.body);
        } else {
            res.status(404).send('404 Not Found');
        }
    }
});

app.use(function(err, req, res, next) {
    res.json(err.stack);
    next();
});

app.listen(1235, () => {
    console.log('Server start');
});