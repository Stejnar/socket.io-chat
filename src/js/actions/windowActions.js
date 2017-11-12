export function setWindow(window) {
    return {
        type: 'SET_WINDOW',
        payload: window,
    }
}

export function setNotifications(permissions) {
    return {
        type: 'SET_NOTIFICATIONS',
        payload: permissions,
    }
}