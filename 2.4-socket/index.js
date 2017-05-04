"use strict";
const   express = require('express'),
        app = require('express')(),
        http = require('http').Server(app),
        io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    socket.on('add user', () => {
        socket.broadcast.emit('user joined');
    });

    socket.on('new message', (msg) => {
        io.emit('new message', msg);
    });

});

http.listen(3000, () => {
    console.log('listening on port: 3000');
});