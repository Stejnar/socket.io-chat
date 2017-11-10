export function addUser(user) {
    return {
        type: 'ADD_USER',
        payload: user,
    }
}

export function removeUser(name) {
    return {
        type: 'REMOVE_USER',
        payload: name,
    }
}

export function fetchUsersReceived(users) {
    return {
        type: 'FETCH_USERS_RECEIVED',
        payload: users,
    }
}

export function fetchUsersRequest() {
    return {
        type: 'FETCH_USERS_REQUEST'
    }
}

export function setSocket(socket) {
    return {
        type: 'SET_SOCKET',
        payload: socket,
    }
}
