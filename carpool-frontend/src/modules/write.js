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
const SET_ORIGINAL_POST ='write/SET_ORIGINAL_POST';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value, id}) => ({
    key,
    value,
    id
}));
export const changeRoundtrip = createAction(CHANGE_ROUNDTRIP, value => value)
export const writePost = createAction(WRITE_POST,
    ({ rides, notes }) => ({ rides, notes }));
export const setOriginalPost = createAction(SET_ORIGINAL_POST,
    post => post);

// create saga
const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);

export function* writeSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
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
        )
    },
    initialState
);

export default write;