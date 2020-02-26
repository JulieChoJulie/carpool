import io from 'socket.io-client';
import { createAction, handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import { socket } from '../index';
import produce from 'immer';

/* TO SERVER */
const SOCKET_LOGIN = 'socket/LOGIN';
export const socketLogin = createAction(SOCKET_LOGIN, userId => userId);

/* FROM SOCKET */
const GET_NOTIFICATION = 'socket/GET_NOTIFICATION';
export const getNotification = createAction(GET_NOTIFICATION);

const ADD_NOTIFICATION = 'socket/ADD_NOTIFICATION';
const NOTIFICATION_RECEIVED = 'socket/NOTIFICATION_RECEIVED';

export const addNotification = createAction(ADD_NOTIFICATION);
export const notificationReceived = createAction(NOTIFICATION_RECEIVED);


export const setupSocket = (dispatch) => {
    const socket = io('http://localhost:4000/notification');

    socket.on('receive', (data) => {
        switch (data.type) {
            case ADD_NOTIFICATION:
                dispatch(notificationReceived());
                break;
            case GET_NOTIFICATION:
                console.log('here get_request');
                dispatch(getNotification(data));
                break;
            default:
                break;
        }
    });
    return socket
};

export function* handleNewNotification() {
    yield takeEvery(SOCKET_LOGIN,  (action) => {
        socket.emit('message', JSON.stringify(action));
    })
    yield takeEvery(ADD_NOTIFICATION, (action) => {
        socket.emit('message', JSON.stringify(action))
    });
}

const initialState = {
    notifications: [],
};

const socketReducer = handleActions({
    [NOTIFICATION_RECEIVED]: (state, { payload: data }) => ({
        ...state,
        message: 'it worked',
    }),
    [GET_NOTIFICATION]: (state, { payload: data }) => {
        return produce(state, draft => {
            draft.notifications.push(data);
        })
    }
}, initialState);

export default socketReducer;