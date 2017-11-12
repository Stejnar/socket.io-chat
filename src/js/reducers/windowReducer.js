export default function WindowReducer(state = {
    width: window.innerWidth,
    height: window.innerHeight,
    isActive: true,
    url: '/',
    notifications: {
        permission: Notification.permission,
        asked: false,
    }
}, action) {
    switch (action.type) {
        case 'SET_WINDOW': {
            return Object.assign({}, state, action.payload);
        }
        case 'SET_NOTIFICATIONS': {
            const notifications = Object.assign({}, state.notifications, action.payload);
            return Object.assign({}, state, {notifications: notifications});
        }
    }
    return state;
};