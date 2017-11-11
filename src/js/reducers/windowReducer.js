
export default function WindowReducer (state = {
    width: window.innerWidth,
    height: window.innerHeight,
    url: '/',
}, action) {
    switch (action.type) {
        case 'SET_WINDOW': {
            return Object.assign({}, state, action.payload);
        }
    }
    return state;
};