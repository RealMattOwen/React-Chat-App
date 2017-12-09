import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { startSetMessages, startUpdateMessages } from './actions/messages';
import { setDetails } from './actions/user';
import { updateNetworkStatus } from './actions/network';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <MuiThemeProvider>
            <AppRouter />
        </MuiThemeProvider>
    </Provider>
);
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<MuiThemeProvider><LoadingPage /></MuiThemeProvider>, document.getElementById('app'));

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(setDetails(user.displayName ? { displayName: user.displayName, email: user.email, photoURL: user.photoURL } : undefined));
        store.dispatch(startSetMessages()).then(() => {
            renderApp();
            store.dispatch(startUpdateMessages());
            if (history.location.pathname === '/login') {
                history.push('/');
            }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/login');
    }
});

if ('onLine' in navigator) {
    window.addEventListener('online', () => {
        store.dispatch(updateNetworkStatus('online'));
    });
    window.addEventListener('offline', () => {
        store.dispatch(updateNetworkStatus('offline'));
    });
}