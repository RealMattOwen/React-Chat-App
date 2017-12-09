export default (state = 'online', action) => {
    switch (action.type) {
        case 'UPDATE_NETWORK_STATUS':
            return action.status;
        default:
            return state;
    }
};