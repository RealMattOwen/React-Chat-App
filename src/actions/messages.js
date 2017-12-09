import database from '../firebase/firebase';

// ADD_ERROR_MESSAGE
export const addErrorMessage = (message = {}) => ({
    type: 'ADD_ERROR_MESSAGE',
    message
});

// ADD_MESSAGE
export const startAddMessage = (messageData = {}) => {
    return () => {
        const {
            author,
            text,
            createdAt
        } = messageData;

        const message = {
            author,
            text,
            createdAt
        };

        return database.ref('messages').push(message);
    };
};

// SET_MESSAGES
export const setMessages = messages => ({
    type: 'SET_MESSAGES',
    messages
});

export const startSetMessages = () => {
    return dispatch => {
        return database.ref('messages').once('value').then(snapshot => {
            const messages = [];

            snapshot.forEach(childSnapshot => {
                messages.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setMessages(messages));
        });
    };
};

// UPDATE_MESSAGES
export const updateMessages = messages => ({
    type: 'UPDATE_MESSAGES',
    messages
});

export const startUpdateMessages = () => {
    return dispatch => {
        return database.ref('messages').on('value', snapshot => {

            const messages = [];

            snapshot.forEach(childSnapshot => {
                messages.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(updateMessages(messages));
        });
    };
};
