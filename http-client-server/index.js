"use strict";

const http = require('http');
const querystring = require('querystring');

function getData(req) {
    return new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => {
            const user = querystring.parse(data);
            resolve(user);
        });
    });
}

function getSecretKey(user) {
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
    return new Promise((resolve, reject) => {
        let request = http.request(options);

        function handler(response) {
            let data = '';
            response.on('data', function(chunk) {
                data += chunk;
            });
            response.on('end', function() {
                user.secretKey = JSON.parse(data).hash;
                resolve(user);
            });
        }

        request.on('response', handler);
        request.end();
    });
}

const port = 1080;
const server = http.createServer();

const serverAnswer = function(req, res) {
    getData(req).then(user => {
        getSecretKey(user).then(user => {
            res.writeHead(200, 'OK', {'Content-Type': 'application/json'});
            let answer = JSON.stringify(user);
            res.write(answer);
            res.end();
        });
    });
};

server.on('error', err => console.error(err));
server.on('request', serverAnswer);
server.on('listening', function() {
    console.log('Start HTTP on port %d', port);
});

server.listen(port);