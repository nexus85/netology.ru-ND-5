"use strict";

const http = require('http');
const user = {
    firstname: 'Sergey',
    lastname: 'Baranov'
};
const options = {
    hostname: 'netology.tomilomark.ru',
    port: 80,
    path: '/api/v1/hash',
    method: 'POST',
    headers: {
        'firstname': user.firstname,
        'Content-Type': 'application/json'
    }
};
const data = JSON.stringify({
    "lastname": user.lastname
});

let request = http.request(options);
request.write(data);
request.end();

function handler(response) {
    let data = '';
    response.on('data', function(chunk) {
        data += chunk;
    });
    response.on('end', function() {
        user.secretKey = JSON.parse(data).hash;
    });
}

request.on('response', handler);


const port = 1080;
const server = http.createServer();

const serverAnswer = function(req, res) {
    res.writeHead(200, 'OK', {'Content-Type': 'application/json'});
    let answer = JSON.stringify(user);
    res.write(answer);
    res.end();
};

server.on('error', err => console.error(err));
server.on('request', serverAnswer);
server.on('listening', function() {
    console.log('Start HTTP on port %d', port);
});

server.listen(port);