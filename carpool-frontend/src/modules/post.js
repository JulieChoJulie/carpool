import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as postAPI from '../lib/api/posts';
import * as actionAPI from '../lib/api/action';
import createRequestSaga, {
    createRequestActionTypes
} from '../lib/createRequestSaga';
import produce from "immer";

const [GET_POST, GET_POST_SUCCESS, GET_POST_FAILURE] = createRequestActionTypes('post/GET_POST');
const UNLOAD_POST = 'post/UNLOAD_POST';

export const getPost = createAction(GET_POST, id => id);
export const unloadPost = createAction(UNLOAD_POST, id => id);

const getPostSaga = createRequestSaga(GET_POST, postAPI.readPost);

/* /api/action... */
const [ADD_RIDE, ADD_RIDE_SUCCESS, ADD_RIDE_FAILURE] = createRequestActionTypes('action/ADD_RIDE');
const [CANCEL_RIDE, CANCEL_RIDE_SUCCESS, CANCEL_RIDE_FAILURE] = createRequestActionTypes('action/CANCEL_RIDE');

export const addRide = createAction(ADD_RIDE);
export const cancelRide = createAction(CANCEL_RIDE);

const addRideSaga = createRequestSaga(ADD_RIDE, actionAPI.addRide);
const cancelRideSaga = createRequestSaga(CANCEL_RIDE, actionAPI.cancelRide);

export function* postSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(ADD_RIDE, addRideSaga);
    yield takeLatest(CANCEL_RIDE, cancelRideSaga);
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
    ridePartners: [
    ],
    partnersError: null,
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
        [ADD_RIDE_SUCCESS]: (state, { payload: result }) => (
            produce(state, draft => {
                draft.ridePartners.push(result.payload);
                draft.toggleError = null;
                const index = draft.post.rides.findIndex(r => r.id === result.payload);
                draft.post.rides[index].available -= 1;
            })
        ),
        [ADD_RIDE_FAILURE]: (state, { payload: error }) => ({
            ...state,
            toggleError: { status: error.status, type: 'add' }
        }),
        [CANCEL_RIDE_SUCCESS]: (state, { payload: result }) => (
            produce(state, draft => {
                draft.ridePartners.splice(
                    draft.ridePartners.findIndex(r => r.id === result.payload),
                    1);
                draft.toggleError = null;
                const index = draft.post.rides.findIndex(r => r.id === result.payload);
                draft.post.rides[index].available += 1;
            })
        ),
        [CANCEL_RIDE_FAILURE]: (state, { payload: error }) => ({
            ...state,
            toggleError: { status: error.status, type: 'cancel' }
        }),
    },
    initialState
);

export default post;
