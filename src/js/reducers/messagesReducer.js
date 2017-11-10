
export default function messagesReducer (state = [], action) {
    switch (action.type) {
        case 'CREATE_MESSAGE': {
            return state.concat(action.payload);
        }
        case 'ADD_USER': {
            return state.concat(userJoinedMsg(action.payload.name))
        }
        case 'REMOVE_USER': {
            return state.concat(userLeftMsg(action.payload))
        }
    }
    return state;
};

function userJoinedMsg(name) {
    return {
        from: 'server',
        message: name + ' joined the room.',
    };
}
function userLeftMsg(name) {
    return {
        from: 'server',
        message: name + ' left the room.',
    };
}