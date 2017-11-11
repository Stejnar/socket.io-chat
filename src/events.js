let users = [];

const events = {
    NEW_USER: {
        name: 'NEW_USER',
        listener: (socket, user) => {
            user.id = socket.id;
            const isNotUnique = (name) => {
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
            socket.emit('NEW_USER_RECEIVED', user);
            socket.broadcast.emit('NEW_USER', user);
            console.log(user.name + ' joined the room', user);
        }
    },
    FETCH_USERS_REQUEST: {
        name: 'FETCH_USERS_REQUEST',
        listener: (socket) => {
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
                socket.emit('FETCH_USERS_RECEIVED', response);
            }
        }
    },
    DISCONNECT: {
        name: 'DISCONNECT',
        listener: (io, socket) => {
            for (let i = 0; i < users.length; i++) {
                if (socket === users[i].socket) {
                    io.emit('USER_LEFT', users[i].user);
                    console.log(users[i].user.name + ' disconnected');
                    users.splice(i, 1);
                }
            }
        }
    },
    CHAT_MESSAGE: {
        name: 'CHAT_MESSAGE',
        listener: (msg, socket) => {
            socket.broadcast.emit('CHAT_MESSAGE', msg);
            console.log('message: ' + msg);
        }
    }
};

module.exports = events;