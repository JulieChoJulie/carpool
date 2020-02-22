import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as postsAPI from '../lib/api/posts';
import createRequestSaga, {
    createRequestActionTypes
} from '../lib/createRequestSaga';
import produce from 'immer';

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

const ON_CHANGE = 'posts/ON_CHANGE';

export const readPosts = createAction(READ_POSTS);
export const filterRides = createAction(FILTER_RIDES,
    ({ when, to, from, seats, price, offering }) =>
        ({ when, to, from, seats, price, offering })
);
export const onChange = createAction(ON_CHANGE, res => res);

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
    criteria: {
        when: [new Date(), new Date(Date.now() + ( 3600 * 1000 * 24 * 5))],
        from: '',
        to: '',
        seats: 1,
        price: [15, 30],
        offering: true
    }
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
    }),
    [ON_CHANGE]: (state, { payload: res }) => {
        return produce(state, draft => {
            if (typeof res.id === 'number') {
                draft.criteria[res.key][res.id] = res.value;
            } else {
                draft.criteria[res.key] = res.value;
            }
        })
    }
}, initialState);

export default posts;