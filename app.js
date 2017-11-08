var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];

app.use(express.static(__dirname + '/src/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/src/views/index.html');
});

io.on('connection', function(socket) {
    var socket_room;
    console.log(socket.id);
    socket.on('new user', function(name) {
        if (name === 'Anonymous') {
            name += users.length;
        }
        users.push({
            socket: socket,
            username: name
        });
        socket.broadcast.emit('new user', name);
        console.log(name + ' joined the room');
    });
    socket.on('fetch users', function(name) {
        socket_room = name;
        socket.join(socket_room);
        console.log(name + ' is fetching users');
        io.sockets.in(name).emit('fetch users', users);
    });
    socket.on('disconnect', function() {
        if (socket_room) {
            socket.leave(socket_room);
        }
        for (var i = 0; i < users.length; i++) {
            if (socket === users[i].socket) {
                io.emit('user left', users[i].username);
                console.log(users[i].username + ' disconnected');
                users.splice(i, 1);
            }
        }
    });
    socket.on('chat message', function(msg) {
        socket.broadcast.emit('chat message', msg);
        console.log('message: ' + msg);
    });
});

http.listen(3000, function() {
    console.log('listening on port: 3000');
});
