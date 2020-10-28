import io from 'socket.io-client';
import { createAction, handleActions } from 'redux-actions';
import { takeEvery, takeLatest } from 'redux-saga/effects';
import { socketMsg } from '../index';
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

const [
    GET_ROOMS,
    GET_ROOMS_SUCCESS,
    GET_ROOMS_FAILURE,
] = createRequestActionTypes('message/GET_ROOMS');
export const getRooms = createAction(GET_ROOMS);
const getRoomsSaga = createRequestSaga(GET_ROOMS, messageAPI.getRooms);

const [
    GET_ROOM,
    GET_ROOM_SUCCESS,
    GET_ROOM_FAILURE,
] = createRequestActionTypes('message/GET_ROOM');
export const getRoom = createAction(GET_ROOM, roomId => roomId);
const getRoomSaga = createRequestSaga(GET_ROOM, messageAPI.getRoom);

// const [
//     POST_CHAT,
//     POST_CHAT_SUCCESS,
//     POST_CHAT_FAILURE
// ] = createRequestActionTypes('message/POST_CHAT');
// export const postChat = createAction(POST_CHAT, chat => chat);

// const [
//     DELETE_ROOM,
//     DELETE_ROOM_SUCCESS,
//     DELETE_ROOM_FAILURE
// ] = createRequestActionTypes('message/DELETE_ROOM');
// export const deleteRoom = createAction('message/DELETE_ROOM', roomId => roomId);
// const deleteRoomSaga = createRequestSaga(DELETE_ROOM, messageAPI.deleteRoom);


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


export const setupSocketMsg = (dispatch) => {
    const socket = io('http://localhost:4000/chat');

    socket.on('receive', (data) => {
        switch (data.type) {

        }
    });
    // socket.on('offline', (data) => {
    //     dispatch(offlineNoti(JSON.parse(data)));
    // });

    return socket;
};

export function* messageSaga() {
    // yield takeEvery(POST_CHAT,  (action) => {
    //     socketMsg.emit('post', JSON.stringify(action));
    // });
    // yield takeEvery(SOCKET_LOGOUT, () => {
    //     socket.disconnect();
    // })
    // yield takeLatest(CREATE_ROOM, createRoomSaga);
    yield takeLatest(GET_ROOM, getRoomSaga);
    yield takeLatest(GET_ROOMS, getRoomsSaga);
}

const initialState = {
    messages: {
        chats: [

        ],
        users: [

        ],
        rides: []

    },
    rooms: [
        {
            id: null,
            post: {
                id: null,
                rides: [],
            },
            chats: [{
                chat: '',
                user: {
                    username: null,
                    isStudent: false,
                }
            }]
        },
    ],
    roomsError: false,
    roomId: null,
    createRoomError: null,
    getRoomError: null,
};

const message = handleActions({
    // [CREATE_ROOM_SUCCESS]: (state, { payload: res }) => ({
    //     ...state,
    //     roomId: res.data.roomId,
    //     createRoomError: null,
    // }),
    // [CREATE_ROOM_FAILURE]: (state, { payload: err }) => ({
    //     ...state,
    //     roomId: null,
    //     createRoomError: err.status,
    // }),
    // [CHANGE_FIELD]: (state, { payload: res }) => {
    //     const { form, key, value } = res;
    //     return produce(state, draft => {
    //         draft[form][key] = value;
    //     })
    // },
    // [INITIALIZE_FIELD]: (state, { payload: field }) => ({
    //     ...state,
    //     [field]: initialState[field]
    // }),
    [GET_ROOM_SUCCESS]: (state, { payload: res }) => (
        produce(state, draft => {
            draft.getRoomError = false;
            draft.messages.chats = res.data.chats;
            draft.messages.users = res.data.users;
            draft.messages.rides = res.data.rides;
        })
    ),
    [GET_ROOM_FAILURE]: (state, { payload: error }) => ({
        ...state,
        getRoomError: error.status,
        messages: initialState.messages,
    }),
    [GET_ROOMS_SUCCESS]: (state, { payload: res }) => ({
        ...state,
        rooms: res.data,
        roomsError: false
    }),
    [GET_ROOMS_FAILURE]: (state, { payload: error }) => ({
        ...state,
        roomsError: true,
    })
}, initialState);

export default message;
