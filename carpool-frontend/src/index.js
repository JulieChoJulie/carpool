import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, profile } from "./modules/user";
import { setupSocket, socketLogin } from './modules/socket';
import { setupSocketMsg } from './modules/message';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)));

const user = localStorage.getItem('user');

function loadUser() {
    try {
        if (!user) return;
        store.dispatch(tempSetUser(user));
        store.dispatch(profile());
        const userJSON   = JSON.parse(user);
        store.dispatch(socketLogin(userJSON.id));
    } catch (e) {
        console.log('localStorage is not working.');
    }
}

export const socket = setupSocket(store.dispatch);
export const socketMsg = setupSocketMsg(store.dispatch);
sagaMiddleware.run(rootSaga);

loadUser();

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
