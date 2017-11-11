const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let users = [];

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
        const isNotUnique = (name) => {
            console.log(users.find((u) => {
                return u.user.name === name;
            }));
            return !!users.find((u) => {
                return u.user.name === name;
            });
        };
        if (isNotUnique(user.name)) {
            let name = '' + user.name;
            let i = 2;
            while (isNotUnique(name)) {
                name = user.name + '#' + i;
                i++;
            }
            user.name = name;
        }
        users.push({
            socket: socket,
            user: user
        });
        socket.broadcast.emit('new user', user);
        console.log(user.name + ' joined the room', user);
    });
    socket.on('fetch users request', function () {
        let self = users.find(function (user) {
            return user.socket.id === socket.id;
        });
        if (self) {
            self = self.user;
            const response = users
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
        for (let i = 0; i < users.length; i++) {
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
