const messagesReducerDefaultState = [];

export default (state = messagesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_ERROR_MESSAGE':
            return [
                ...state,
                action.message
            ];
        case 'ADD_MESSAGE':
            return [
                ...state,
                action.message
            ];
        case 'SET_MESSAGES':
            return action.messages;
        case 'UPDATE_MESSAGES':
            return action.messages;
        default:
            return state;
    }
};