import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import { takeLatest } from 'redux-saga/effects';
import * as notificationsAPI from '../lib/api/notifications';
import produce from 'immer';

const [
    GET_NOTI,
    GET_NOTI_SUCCESS,
    GET_NOTI_FAILURE,
]= createRequestActionTypes('notifications/GET_NOTI');

export const getNoti = createAction(GET_NOTI, userId => userId);

const getNotiSaga = createRequestSaga(GET_NOTI, notificationsAPI.readNotifications);

export function* notificationsSaga() {
    yield takeLatest(GET_NOTI, getNotiSaga);
}

const initialState = {
    notifications: null,
    error: null,
}

const notifications = handleActions({
    [GET_NOTI_SUCCESS]: (state, { payload: res }) => (
        produce(state, draft => {
            const data = res.data;
            const arr = data.map(n => ({
                username: n.SendUsers[0].username,
                ride: n.ride,
                title: n.title,
                from: n.from,
                date: n.createdAt,
            }));
            draft.notifications = arr;
            draft.error = null;
        })
    ),
    [GET_NOTI_FAILURE]: (state, { payload: error }) => ({
        ...state,
        notifications: null,
        error: error.status,
    }),
}, initialState);

export default notifications;