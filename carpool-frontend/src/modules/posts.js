import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as postsAPI from '../lib/api/posts';
import createRequestSaga, {
    createRequestActionTypes
} from '../lib/createRequestSaga';

const [
    READ_POSTS,
    READ_POSTS_SUCCESS,
    READ_POSTS_FAILURE,
]= createRequestActionTypes('posts/READ_POSTS');

export const readPosts = createAction(READ_POSTS);
const readPostsSaga = createRequestSaga(READ_POSTS, postsAPI.readFeed);

export function* postsSaga() {
    yield takeLatest(READ_POSTS, readPostsSaga);
}

const initialState = {
    posts: [],
    postsError: null,
}

const posts = handleActions({
    [READ_POSTS_SUCCESS]: (state, { payload: res }) => ({
        ...state,
        posts: res.data,
        postsError: null,
    }),
    // [READ_POSTS_SUCCESS]: (state, { payload: res }) => {
    //     console.log(JSON.stringify(res.data));
    // },
    [READ_POSTS_FAILURE]: (state, { payload: error }) => ({
        ...state,
        posts: initialState.readPosts,
        postsError: error.status,
    })
}, initialState);

export default posts;