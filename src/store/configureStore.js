import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import messagesReducer from '../reducers/messages';
import networkReducer from '../reducers/network';
import userReducer from '../reducers/user';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            messages: messagesReducer,
            network: networkReducer,
            user: userReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};