var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var user = [];

app.use(express.static(__dirname + '/src/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/src/views/index.html');
});

io.on('connection', function(socket) {
    socket.on('new user', function(name) {
        if (name === 'Anonymous') {
            name += user.length;
        }
        user.push({
            socket: socket,
            username: name
        });
        socket.broadcast.emit('new user', name);
        console.log(name + ' joined the room');
    })
    socket.on('disconnect', function() {
        for (var i = 0; i < user.length; i++) {
            if (socket === user[i].socket) {
                io.emit('user left', user[i].username);
                console.log(user[i].username + ' disconnected');
                user.splice(i, 1);
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
