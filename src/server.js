const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const events = require('./events');

const NEW_USER = events.NEW_USER;
const FETCH_USERS_REQUEST = events.FETCH_USERS_REQUEST;
const DISCONNECT = events.DISCONNECT;
const CHAT_MESSAGE = events.CHAT_MESSAGE;

app.use(express.static(__dirname));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/download', function (req, res) {
    res.sendFile(__dirname + '../download/chat-client.apk');
});
io.on('connection', function (socket) {
    // console.log(socket.id);
    socket.on(NEW_USER.name, (user) => {
        NEW_USER.listener(socket, user);
    });
    socket.on(FETCH_USERS_REQUEST.name, () => {
        FETCH_USERS_REQUEST.listener(socket);
    });
    socket.on(DISCONNECT.name, () => {
        DISCONNECT.listener(io, socket);
    });
    socket.on(CHAT_MESSAGE.name, (msg) => {
        CHAT_MESSAGE.listener(msg, socket);
    });
});

http.listen(3000, function () {
    console.log('listening on port: 3000');
});
