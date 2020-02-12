import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as postAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const CHANGE_ROUNDTRIP = 'write/CHANGE_ROUNDTRIP';
const [
    WRITE_POST,
    WRITE_POST_SUCCESS,
    WRITE_POST_FAILURE
] = createRequestActionTypes('write/WRITE_POST');
const [EDIT_POST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE] = createRequestActionTypes('write/EDIT_POST');
const [DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE] = createRequestActionTypes('write/DELETE_POST');
const SET_ORIGINAL_POST ='write/SET_ORIGINAL_POST';
const [GET_OWNER, GET_OWNER_SUCCESS, GET_OWNER_FAILURE] = createRequestActionTypes('write/GET_OWNER');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value, id}) => ({
    key,
    value,
    id
}));
export const changeRoundtrip = createAction(CHANGE_ROUNDTRIP, value => value)
export const writePost = createAction(WRITE_POST,
    ({ rides, notes }) => ({ rides, notes }));
export const editPost = createAction(EDIT_POST, id => id);
export const deletePost = createAction(DELETE_POST, id => id);
export const setOriginalPost = createAction(SET_ORIGINAL_POST,
    post => post);
export const getOwner = createAction(GET_OWNER, id => id);

// create saga
const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);
const editPostSaga = createRequestSaga(EDIT_POST, postAPI.editPost);
const deletePostSaga = createRequestSaga(DELETE_POST, postAPI.deletePost);
const getOwnerSaga = createRequestSaga(GET_OWNER, postAPI.getOwner);

export function* writeSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
    yield takeLatest(EDIT_POST, editPostSaga);
    yield takeLatest(DELETE_POST, deletePostSaga);
    yield takeLatest(GET_OWNER, getOwnerSaga);
}
const initialState = {
    isRoundTrip: true,
    rides: [
        {
            id: 0,
            when: new Date(),
            to: '',
            from: '',
            price: 10,
            seats: 1,
            offering: true,
        },
        {
            id: 1,
            when: new Date(),
            to: '',
            from: '',
            price: 10,
            seats: 1,
            offering: true,
        }
    ],
    notes: '',
    postId: null,
    postError: null,
    setOriginalPostId: null,
    isOwner: null,
};

const write = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_FIELD]: (state, { payload: { key, value, id }}) => {
            if (id === -1 ) {
                return produce(state, draft => {
                    draft.rides = draft.rides.map(ride => ride.key === value);
                })
            } else if (id === -2) {
                return {
                    ...state,
                    [key]: value
                }
            }
            return produce(state, draft => {
                draft.rides[id][key] = value;
            })
        },
        [CHANGE_ROUNDTRIP]: (state, { payload: value }) => (
            {
                ...state,
                isRoundTrip: value
            }
        ),
        [WRITE_POST_SUCCESS]: (state, { payload: post }) => (
            {
                ...state,
                postId: post.data.id
            }
        ),
        [WRITE_POST_FAILURE]: (state, { payload: postError }) => (
            {
                ...state,
                postError
            }
        ),
        [SET_ORIGINAL_POST]: (state, { payload: post }) => (
            {
                ...state,
                rides: post.rides,
                notes: post.notes,
                setOriginalPostId: post.id
            }
        ),
        [GET_OWNER_SUCCESS]: (state, { payload: result }) => (
            produce(state, draft => {
                const post = result.data;
                draft.rides = post.rides;
                draft.notes = post.notes;
                draft.isRoundTrip = post.rides.length === 2 ? true : false;
                draft.isOwner = 200;
                draft.setOriginalPostId = post.id;
            })
        ),
        [GET_OWNER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            isOwner: error.status
        })
    },
    initialState
);

export default write;