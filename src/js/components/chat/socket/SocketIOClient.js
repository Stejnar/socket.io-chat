import {createMessage} from "../../../actions/messagesActions";
import {
    addUser, fetchUsersReceived, removeUser, fetchUsersRequest
} from "../../../actions/usersActions";
import logger from "./Logger";
import {setUser} from "../../../actions/userActions";

const io = require('socket.io-client');
const uri = 'http://public-void.org:3000';
let socket = null;

export default class SocketIOClient {
    constructor(store) {
        this.store = store;
        this.connect = this.connect.bind(this);
        this.emitMessage = this.emitMessage.bind(this);
        this.emitUser = this.emitUser.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.handleConnection = this.handleConnection.bind(this);
    }
    fetchUsers() {
        return this.handleConnection(() => {
            this.store.dispatch(fetchUsersRequest());
            logger(false, 'fetch users request');
            socket.emit('fetch users request');
        });
    }
    emitMessage(message) {
        return this.handleConnection(() => {
            this.store.dispatch(createMessage(message));
            logger(false, 'chat message', message);
            socket.emit('chat message', message);
        });
    }

    emitUser(user) {
        return this.handleConnection(() => {
            this.store.dispatch(setUser(user));
            logger(false, 'new user', user);
            socket.emit('new user', user);
        });
    }

    static disconnect() {
        if (socket) {
            logger(false, 'disconnecting');
            socket.disconnect();
            socket = null;
        }
    }

    connect() {
        if (!socket || !socket.connected) {
            logger(false, 'connecting', uri);
            socket = io.connect(uri, {transports: ['websocket']});
            socket.on('new user', (user) => {
                logger(true, 'new user', user);
                this.store.dispatch(addUser(user));
            });
            socket.on('user left', (user) => {
                logger(true, 'user left', user);
                this.store.dispatch(removeUser(user.name));
            });
            socket.on('chat message', (message) => {
                logger(true, 'chat message', message);
                this.store.dispatch(createMessage(message));
            });
            socket.on('fetch users received', (users) => {
               logger(true, 'fetch users received', users);
               this.store.dispatch(fetchUsersReceived(users));
            });
            return socket.connected;
        }
        return false;
    }

    static isConnected() {
        if (!socket || !socket.connected) {
            socket = null;
            throw new Error('Not connected');
        }
    }

    handleConnection(submit) {
        try {
            SocketIOClient.isConnected();
            submit();
            return true;
        } catch (e) {
            console.groupCollapsed('\'%c  Connection Error 500', 'color: #f00;');
            console.log(e);
            console.log('%c Retrying...', 'color: #000;');
            console.groupEnd();
            // retry
            const retry = this.connect();
            if (retry) {
                submit();
                return true
            } else {
                return false;
            }
        }
    }
}