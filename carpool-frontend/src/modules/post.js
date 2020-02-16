import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as postAPI from '../lib/api/posts';
import * as actionAPI from '../lib/api/action';
import createRequestSaga, {
    createRequestActionTypes
} from '../lib/createRequestSaga';
import produce from "immer";

const [
    GET_POST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE
] = createRequestActionTypes('post/GET_POST');
const UNLOAD_POST = 'post/UNLOAD_POST';

export const getPost = createAction(GET_POST, id => id);
export const unloadPost = createAction(UNLOAD_POST, id => id);

const getPostSaga = createRequestSaga(GET_POST, postAPI.readPost);

/* /api/action... */
const [ADD_REQUEST, ADD_REQUEST_SUCCESS, ADD_REQUEST_FAILURE] = createRequestActionTypes('action/ADD_REQUEST');
const [CANCEL_REQUEST, CANCEL_REQUEST_SUCCESS, CANCEL_REQUEST_FAILURE] = createRequestActionTypes('action/CANCEL_REQUEST');
const [CANCEL_RIDE, CANCEL_RIDE_SUCCESS, CANCEL_RIDE_FAILURE] = createRequestActionTypes('action/CANCEL_RIDE');
const [GET_STATUS, GET_STATUS_SUCCESS, GET_STATUS_FAILURE] = createRequestActionTypes('action/GET_STATUS');

export const addRequest = createAction(ADD_REQUEST);
export const cancelRequest = createAction(CANCEL_REQUEST);
export const cancelRide = createAction(CANCEL_RIDE);
export const getStatus = createAction(GET_STATUS);

const addRequestSaga = createRequestSaga(ADD_REQUEST, actionAPI.addRequest);
const cancelRequestSaga = createRequestSaga(CANCEL_REQUEST, actionAPI.cancelRequest);
const cancelRideSaga = createRequestSaga(CANCEL_RIDE, actionAPI.cancelRide);
const getStatusSaga = createRequestSaga(GET_STATUS, actionAPI.getRideStatus);

export function* postSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(ADD_REQUEST, addRequestSaga);
    yield takeLatest(CANCEL_REQUEST, cancelRequestSaga);
    yield takeLatest(CANCEL_RIDE, cancelRideSaga);
    yield takeLatest(GET_STATUS, getStatusSaga);
}

const initialState = {
    post: {
        rides: [],
        user: {
            username: '',
        },
        notes: ''
    },
    postError: null,
    status: {},
    statusError: null,
    toggleError: null,
};


const post = handleActions(
    {
        [GET_POST_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post: post.data,
        }),
        [GET_POST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            post: initialState.post,
            postError: error,
        }),
        [UNLOAD_POST]: () => initialState,
        [ADD_REQUEST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            toggleError: { status: error.status, type: 'added' }
        }),
        [CANCEL_REQUEST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            toggleError: { status: error.status, type: 'cancelled' }
        }),
        [GET_STATUS_SUCCESS]: (state, { payload: result }) => ({
            ...state,
            status: result.data,
            statusError: null
        }),
        [GET_STATUS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            status: null,
            statusError: error.status
        }),
        [CANCEL_RIDE_FAILURE]: (state, { payload: error }) => ({
            ...state,
            toogleError: { status: error.status, type: 'cancelled' }
        })
    },
    initialState
);

export default post;
