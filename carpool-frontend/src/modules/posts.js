import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as postsAPI from '../lib/api/posts';
import createRequestSaga, {
    createRequestActionTypes
} from '../lib/createRequestSaga';

const [
    READ_POSTS,
    READ_POSTS_SUCCESS,
    READ_POSTS_FAILURE,
]= createRequestActionTypes('posts/READ_POSTS');

const [
    FILTER_RIDES,
    FILTER_RIDES_SUCCESS,
    FILTER_RIDES_FAILURE
] = createRequestActionTypes('posts/FILTER_RIDES');

export const readPosts = createAction(READ_POSTS);
export const filterRides = createAction(FILTER_RIDES,
    ({ when, to, from, available, price, offering }) =>
        ({ when, to, from, available, price, offering })
);

const readPostsSaga = createRequestSaga(READ_POSTS, postsAPI.readFeed);
const filterRidesSaga = createRequestSaga(FILTER_RIDES, postsAPI.filterRides);

export function* postsSaga() {
    yield takeLatest(READ_POSTS, readPostsSaga);
    yield takeLatest(FILTER_RIDES, filterRidesSaga);
}

const initialState = {
    posts: [],
    postsError: null,
    status: {},
    filterRides: [],
    filterRidesError: null,
}

const posts = handleActions({
    [READ_POSTS_SUCCESS]: (state, { payload: res }) => ({
        ...state,
        posts: res.data.posts,
        status: (!!res.data.status ? res.data.status : {}),
        postsError: null,
    }),
    [READ_POSTS_FAILURE]: (state, { payload: error }) => ({
        ...state,
        posts: initialState.readPosts,
        postsError: error.status,
    }),
    [FILTER_RIDES_SUCCESS]: (state, { payload: res }) => ({
        ...state,
        filterRidesError: null,
        filterRides: res.data
    }),
    [FILTER_RIDES_FAILURE]: (state, { payload: error }) => ({
        ...state,
        filterRidesError: error.status,
        filterRides: [],
    })
}, initialState);

export default posts;