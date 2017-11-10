export function setUser(user) {
    return {
        type: 'SET_USER',
        payload: user,
    }
}

export function setAvatar(avatar) {
    return {
        type: 'SET_AVATAR',
        payload: avatar,
    }
}