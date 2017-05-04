const express = require('express');
const bodyParser = require('body-parser');
const app = module.exports = express();

const users = [];

function rand(min, max) {
    return Math.ceil((max - min + 1) * Math.random()) + min - 1;
}
function generateId() {
    return rand(1000, 9999);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.post('/', (req, res) => {
    user = req.body;
    user.id = generateId();
    users.push(user);
    res.send(`${user.id}: User added`);
});

app.get('/', (req, res) => {
        res.json(users);
});
app.get('/:id', (req, res) => {
    for (let user of users) {
        if (user.id == req.params.id) {
            res.json(user);
        }
    }
});
app.put('/:id', (req, res) => {
    for (let user of users) {
        if (user.id == req.params.id) {
            if (req.query) {
                user.score = parseInt(user.score);
                let newScore = req.query.score !==undefined ? parseInt(req.query.score) : 0;
                user.score += newScore;
            }
            res.json(user);
        }
    }
});
app.delete('/:id', (req, res) => {
    for (let user of users) {
        if (user.id == req.params.id) {
            users.splice(users.indexOf(user),1);
        }
    }
    res.json(users);
});