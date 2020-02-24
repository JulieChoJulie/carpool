import io from 'socket.io-client';
import { createAction, handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import { socket } from '../index';

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
            default:
                break;
        }
    });
    return socket
};

export function* handleNewNotification() {
    yield takeEvery(ADD_NOTIFICATION, (action) => {
        socket.emit('message', JSON.stringify(action))
    });
}

const initialState = {
    message: '',
    author: ''
};

const socketReducer = handleActions({
    [NOTIFICATION_RECEIVED]: (state, { payload: data }) => ({
        ...state,
        message: 'it worked',
    })
}, initialState);

export default socketReducer;