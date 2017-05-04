"use strict";
const socket = io();
$('form').submit(() => {
    socket.emit('message', $('input').val());
    $('input').val('');
    return false;
});
$(window).load(() => {
    socket.emit('add user');
});

socket.on('new message', (msg) => {
    $('#messages').append($('<div class="item"/>').text(msg));
});

socket.on('user joined', () => {
    $('#messages').append('<div class="item">New user joined</div>');
});