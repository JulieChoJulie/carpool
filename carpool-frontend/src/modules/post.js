import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as postAPI from '../lib/api/posts';
import createRequestSaga, {
    createRequestActionTypes
} from '../lib/createRequestSaga';
import produce from "immer";

const [GET_POST, GET_POST_SUCCESS, GET_POST_FAILURE] = createRequestActionTypes('post/GET_POST');
const [GET_PARTNERS, GET_PARTNERS_SUCCESS, GET_PARTNERS_FAILURE] =createRequestActionTypes('post/GET_PARTNERS');

export const getPost = createAction(GET_POST);
export const getPartners = createAction(GET_PARTNERS);
const getPostSaga = createRequestSaga(GET_POST, postAPI.readPost);
const getPartnersSaga = createRequestSaga(GET_PARTNERS, postAPI.getPartners);

export function* postSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(GET_PARTNERS, getPartnersSaga);
}

const initialState = {
    post: {
        rides: [],
        user: {
            username: '',
        },
        notes: ''
    },
    posts: [],
    postError: null,
    partners: {
        rideId: null,
        partners: []
    },
    partnersError: null,
};


const post = handleActions(
    {
        [GET_POST_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post: post.data,
        }),
        [GET_POST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            postError: error,
        }),
        [GET_PARTNERS_SUCCESS]: (state, { payload: partners }) => (
            produce(state, draft => {
                draft.partners.rideId = partners.payload.rideId;
                draft.partners.partners = partners.data;
                draft.partnersError = null;
            })
        ),
        [GET_PARTNERS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            partners: null,
            partnersError: error,
        })
    },
    initialState
);

export default post;
