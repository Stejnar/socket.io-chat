import { combineReducers } from 'redux';
import client from './clientReducer';
import user from './userReducer';
import users from './usersReducer';
import messages from './messagesReducer';

export default combineReducers({
    client,
    user,
    users,
    messages
});