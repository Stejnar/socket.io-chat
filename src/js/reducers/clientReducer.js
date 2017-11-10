
export default function clientReducer (state = {
    fetchingUsers: false,
    socket: null,
}, action) {
    switch (action.type) {
        case 'SET_SOCKET': {
            return Object.assign({}, state, { socket: action.payload });
        }
        case 'FETCH_USERS_REQUEST': {
            return Object.assign({}, state, { fetchingUsers: true });
        }
        case 'FETCH_USERS_RECEIVED': {
            return Object.assign({}, state, { fetchingUsers: false });
        }
    }
    return state;
};