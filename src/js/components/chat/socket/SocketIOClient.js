import {createMessage} from "../../../actions/messagesActions";
import {
    addUser, fetchUsersReceived, removeUser, fetchUsersRequest
} from "../../../actions/usersActions";
import logger from "./Logger";
import {setUser} from "../../../actions/userActions";

const io = require('socket.io-client');
const uri = 'http://localhost:3000';
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
            logger(false, 'FETCH_USERS_REQUEST');
            socket.emit('FETCH_USERS_REQUEST');
        });
    }
    emitMessage(message) {
        return this.handleConnection(() => {
            this.store.dispatch(createMessage(message));
            logger(false, 'CHAT_MESSAGE', message);
            socket.emit('CHAT_MESSAGE', message);
        });
    }

    emitUser(user) {
        return this.handleConnection(() => {
            this.store.dispatch(setUser(user));
            logger(false, 'NEW_USER', user);
            socket.emit('NEW_USER', user);
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
            socket.on('NEW_USER', (user) => {
                logger(true, 'NEW_USER', user);
                this.store.dispatch(addUser(user));
            });
            socket.on('USER_LEFT', (user) => {
                logger(true, 'USER_LEFT', user);
                this.store.dispatch(removeUser(user.name));
            });
            socket.on('CHAT_MESSAGE', (message) => {
                logger(true, 'CHAT_MESSAGE', message);
                this.store.dispatch(createMessage(message));
            });
            socket.on('FETCH_USERS_RECEIVED', (users) => {
               logger(true, 'FETCH_USERS_RECEIVED', users);
               this.store.dispatch(fetchUsersReceived(users));
            });
            socket.on('NEW_USER_RECEIVED', (user) => {
                logger(true, 'NEW_USER_RECEIVED', user);
                this.store.dispatch(setUser(user));
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