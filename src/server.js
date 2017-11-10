var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];

app.use(express.static(__dirname));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/download', function (req, res) {
    res.sendFile(__dirname + '../download/chat-client.apk');
});
io.on('connection', function (socket) {
    console.log(socket.id);
    socket.on('new user', function (user) {
        if (user.name === 'Anonymous') {
            user.name += users.length;
        }
        users.push({
            socket: socket,
            user: user
        });
        socket.broadcast.emit('new user', user);
        console.log(user.name + ' joined the room', user);
    });
    socket.on('fetch users request', function () {
        var self = users.find(function (user) {
            return user.socket.id === socket.id;
        });
        if (self) {
            self = self.user;
            var response = users
                .map(function (item) { // don't send sockets
                    return item.user;
                })
                .filter(function (user) { // don't send the user himself
                    return user.name !== self.name;
                });
            console.log(self.name + ' is fetching users');
            console.log('users: ', response);
            socket.emit('fetch users received', response);
        }
    });
    socket.on('disconnect', function () {
        for (var i = 0; i < users.length; i++) {
            if (socket === users[i].socket) {
                io.emit('user left', users[i].user);
                console.log(users[i].user.name + ' disconnected');
                users.splice(i, 1);
            }
        }
    });
    socket.on('chat message', function (msg) {
        socket.broadcast.emit('chat message', msg);
        console.log('message: ' + msg);
    });
});

http.listen(3000, function () {
    console.log('listening on port: 3000');
});
