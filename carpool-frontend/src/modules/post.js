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
const ON_CHANGE = 'post/ON_CHANGE';
const [ON_INSERT, ON_INSERT_SUCCESS, ON_INSERT_FAILURE] = createRequestActionTypes('post/ON_INSERT');
const [EDIT_COMMENT, EDIT_COMMENT_SUCCESS, EDIT_COMMENT_FAILURE] = createRequestActionTypes('post/EDIT_COMMENT');
const [DELETE_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE] = createRequestActionTypes('post/DELETE_COMMENT');

export const getPost = createAction(GET_POST, id => id);
export const unloadPost = createAction(UNLOAD_POST, id => id);
export const onChange = createAction(ON_CHANGE, comment => comment);
export const onInsert = createAction(ON_INSERT,
    ({ postId, content }) => ({ postId, content }));
export const editComment = createAction(EDIT_COMMENT,
    ({ postId, commentId, content }) => ({ postId, commentId, content }));
export const deleteComment = createAction(DELETE_COMMENT,
    ({ postId, commentId }) => ({ postId, commentId }));

const getPostSaga = createRequestSaga(GET_POST, postAPI.readPost);
const onInsertSaga = createRequestSaga(ON_INSERT, postAPI.writeComment);
const editCommentSaga = createRequestSaga(EDIT_COMMENT, postAPI.editComment);
const deleteCommentSaga = createRequestSaga(DELETE_COMMENT, postAPI.deleteComment);

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
    yield takeLatest(ON_INSERT, onInsertSaga);
    yield takeLatest(EDIT_COMMENT, editCommentSaga);
    yield takeLatest(DELETE_COMMENT, deleteCommentSaga);
}

const initialState = {
    post: {
        rides: [],
        user: {
            username: '',
        },
        notes: '',
        comments: [],
    },
    comment: '',
    commentEdit: '',
    postError: null,
    commentError: null,
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
        [ADD_REQUEST_SUCCESS]: (state, { payload: res }) => ({
           ...state,
           toggleError: null,
        }),
        [ADD_REQUEST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            toggleError: { status: error.status, type: 'added' }
        }),
        [CANCEL_REQUEST_SUCCESS]: (state, { payload: res }) => ({
            ...state,
            toggleError: null,
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
        [CANCEL_RIDE_SUCCESS]: (state, { payload: res }) => ({
            ...state,
            toggleError: null,
        }),
        [CANCEL_RIDE_FAILURE]: (state, { payload: error }) => ({
            ...state,
            toogleError: { status: error.status, type: 'cancelled' }
        }),
        [ON_CHANGE]: (state, { payload: res }) => ({
            ...state,
            [res.type]: res.value,
        }),
        [ON_INSERT_SUCCESS]: (state, { payload: res }) => {
            const comment = res.data;
            console.log('here')
            return produce(state, draft => {
                draft.post.comments.push(comment);
                draft.commentError = null;
            })
        },
        [ON_INSERT_FAILURE]: (state, { payload: res }) => ({
            ...state,
            postError: res.status
        }),
        [EDIT_COMMENT_SUCCESS]: (state, { payload: res }) => {
            const comment = res.data;
            return produce(state, draft => {
                draft.post.comments = draft.post.comments.map(c => {
                    if (c.id === comment.id) {
                        return comment;
                    } else {
                        return c;
                    }
                });
                draft.commentError = null;
            })
        },
        [EDIT_COMMENT_FAILURE]: (state, { payload: error }) => ({
            ...state,
            commentError: error.status,
        }),
        [DELETE_COMMENT_SUCCESS]: (state, { payload: res }) => {
            return produce(state, draft => {
                const index = draft.post.comments.findIndex(c => c.id === res.payload.commentId);
                draft.post.comments.splice(index, 1);
            })
        },
        [DELETE_COMMENT_FAILURE]: (state, { payload: error }) => ({
            ...state,
            commentError: error.status
        })
    },
    initialState
);

export default post;
