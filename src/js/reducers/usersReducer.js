
export default function usersReducer (state = [], action) {
    switch (action.type) {
        case 'ADD_USER': {
            return state.concat(action.payload);
        }
        case 'REMOVE_USER': {
            return state.filter((user) => { return user.name !== action.payload; });
        }
        case 'FETCH_USERS_RECEIVED': {
            return [].concat(action.payload);
        }
    }
    return state;
};