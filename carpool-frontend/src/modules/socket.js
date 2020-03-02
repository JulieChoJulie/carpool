import io from 'socket.io-client';
import { createAction, handleActions } from 'redux-actions';
import { takeEvery } from 'redux-saga/effects';
import { socket } from '../index';
import produce from 'immer';

/* TO SOCKET SERVER */
const SOCKET_LOGIN = 'socket/LOGIN';
export const socketLogin = createAction(SOCKET_LOGIN, userId => userId);

/* FROM SOCKET */
const GET_NOTIFICATION = 'socket/GET_NOTIFICATION';
export const getNotification = createAction(GET_NOTIFICATION);
const OFFLINE_NOTI = 'socket/OFFLINE_NOTI';
export const offlineNoti = createAction(OFFLINE_NOTI);

/* ALARM */
const SWITCH_ALARM = 'notifications/SWITCH_ALARM';
export const switchAlarm = createAction(SWITCH_ALARM, value => value);


export const setupSocket = (dispatch) => {
    const socket = io('http://localhost:4000/notification');

    socket.on('receive', (data) => {
        switch (data.type) {
            case GET_NOTIFICATION:
                dispatch(getNotification(data.data));
                break;
            default:
                break;
        }
    });
    socket.on('offline', (data) => {
        dispatch(offlineNoti(JSON.parse(data)));
    });

    return socket;
};

export function* handleNewNotification() {
    yield takeEvery(SOCKET_LOGIN,  (action) => {
        socket.emit('message', JSON.stringify(action));
    });
}

const initialState = {
    notifications: [],
    alarm: false,
    error: null,
};

const socketReducer = handleActions({
    [GET_NOTIFICATION]: (state, { payload: data }) => {
        return produce(state, draft => {
            const { ride, title, from } = data;
            draft.notifications.unshift({
                ride,
                title,
                from,
                date: data.createdAt,
                username: data.SendUsers[0].username,
            });
            draft.alarm = true;
        })
    },
    [SWITCH_ALARM]: (state, { payload: value }) => ({
        ...state,
        alarm: value,
    }),
    [OFFLINE_NOTI]: (state, { payload: data }) => (
        produce(state, draft => {
            if (data.length > 0) {
                const arr = data.map(n => ({
                    username: n.SendUsers[0].username,
                    ride: n.ride,
                    title: n.title,
                    from: n.from,
                    date: n.createdAt,
                }));
                draft.notifications = arr;
                draft.error= null;
                draft.alarm = true;
            }
        })
    )
}, initialState);

export default socketReducer;