import io from 'socket.io-client';
import { createAction, handleActions } from 'redux-actions';
import { takeEvery, takeLatest } from 'redux-saga/effects';
import { socket } from '../index';
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import produce from 'immer';
import * as messageAPI from '../lib/api/message';

/* WITHIN REACT SERVER*/
const CHANGE_FIELD = 'message/CHANGE_FIELD';
export const changeField = createAction(CHANGE_FIELD,
    ({ form, key, value }) => ({ form, key, value }));

const INITIALIZE_FIELD = 'message/INITIALIZE_FIELD';
export const initializeField = createAction(INITIALIZE_FIELD, field => field);

/* TO API SERVER */
const [
    CREATE_ROOM,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_FAILURE,
] = createRequestActionTypes('message/CREATE_ROOM');
export const createRoom = createAction(CREATE_ROOM,
    ({ userId, rideId }) => ({ userId, rideId })
);
const createRoomSaga = createRequestSaga(CREATE_ROOM, messageAPI.createRoom);


// const SEND_CHAT = 'message/SEND_CHAT';
// export const sendCaht = createAction(SEND_CAHT, userId => userId);
// const SOCKET_LOGOUT = 'socket/LOGOUT';
// export const socketLogout = createAction(SOCKET_LOGOUT);
//
// /* FROM SOCKET API SERVER */
// const GET_NOTIFICATION = 'socket/GET_NOTIFICATION';
// export const getNotification = createAction(GET_NOTIFICATION);
// const OFFLINE_NOTI = 'socket/OFFLINE_NOTI';
// export const offlineNoti = createAction(OFFLINE_NOTI);
//
// /* ALARM */
// const SWITCH_ALARM = 'notifications/SWITCH_ALARM';
// export const switchAlarm = createAction(SWITCH_ALARM, value => value);


export const setupSocket = (dispatch) => {
    const socket = io('http://localhost:4000/chat');

    // socket.on('receive', (data) => {
    //     switch (data.type) {
    //         case JOIN_CHAT:
    //             dispatch(joinChat(data.data));
    //             break;
    //         case EXIT_CHAT:
    //             dispatch(exitChat(data.data));
    //         case ADD_CHAT:
    //             dispatch(addChat(data.data));
    //
    //         default:
    //             break;
    //     }
    // });
    // socket.on('offline', (data) => {
    //     dispatch(offlineNoti(JSON.parse(data)));
    // });

    return socket;
};

export function* messageSaga() {
    // yield takeEvery(SOCKET_LOGIN,  (action) => {
    //     socket.emit('message', JSON.stringify(action));
    // });
    // yield takeEvery(SOCKET_LOGOUT, () => {
    //     socket.disconnect();
    // })
    yield takeLatest(CREATE_ROOM, createRoomSaga);
}

const initialState = {
    messages: [],
    roomId: null,
    createRoomError: null,
};

const message = handleActions({
    [CREATE_ROOM_SUCCESS]: (state, { payload: res }) => ({
        ...state,
        roomId: res.data.roomId,
        createRoomError: null,
    }),
    [CREATE_ROOM_FAILURE]: (state, { payload: err }) => ({
        ...state,
        roomId: null,
        createRoomError: err.status,
    }),
    [CHANGE_FIELD]: (state, { payload: res }) => {
        const { form, key, value } = res;
        return produce(state, draft => {
            draft[form][key] = value;
        })
    },
    [INITIALIZE_FIELD]: (state, { payload: field }) => ({
        ...state,
        [field]: initialState[field]
    })
}, initialState);

export default message;