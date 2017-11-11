import {getRandomAvatar} from "../components/avatars/_locations";

export default function userReducer(state = {
    name: 'Jon Snow',
    id: null,
    avatar: getRandomAvatar().alias
}, action) {
    switch (action.type) {
        case 'SET_USER': {
            return Object.assign({}, state, action.payload);
        }
        case 'SET_AVATAR': {
            return Object.assign({}, state, { avatar: action.payload.alias });
        }
    }
    return state;
};