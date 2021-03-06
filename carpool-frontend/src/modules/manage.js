import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as actionAPI from '../lib/api/action';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

// const [
//     EDIT_POST,
//     EDIT_POST_SUCCESS,
//     EDIT_POST_FAILURE
// ] = createRequestActionTypes('manage/EDIT_POST');
const [
    ADD_PASSENGER,
    ADD_PASSENGER_SUCCESS,
    ADD_PASSENGER_FAILURE
] = createRequestActionTypes('manage/ADD_PASSENGER');

const [
    CANCEL_PASSENGER,
    CANCEL_PASSENGER_SUCCESS,
    CANCEL_PASSENGER_FAILURE
] = createRequestActionTypes('manage/CANCEL_PASSENGER');

const [
    CANCEL_PASSENGER_REQUEST,
    CANCEL_PASSENGER_REQUEST_SUCCESS,
    CANCEL_PASSENGER_REQUEST_FAILURE
] = createRequestActionTypes('manage/CANCEL_PASSENGER_REQUEST');

const [
    GET_MYPOSTS,
    GET_MYPOSTS_SUCCESS,
    GET_MYPOSTS_FAILURE,
] = createRequestActionTypes('manage/GET_MYPOSTS');

const TOGGLE_ACTIVE = 'manage/TOGGLE_ACTIVE';

// export const editPost = createAction(EDIT_POST);
export const addPassenger = createAction(ADD_PASSENGER,
    ({ rideId, userId }) => ({ rideId, userId }));
export const cancelPassenger = createAction(CANCEL_PASSENGER,
    ({ rideId, userId}) => ({ rideId, userId }));
export const cancelPassengerRequest = createAction(CANCEL_PASSENGER_REQUEST);
export const getMyPosts = createAction(GET_MYPOSTS);
export const toggleActive = createAction(TOGGLE_ACTIVE, res => res);

const addPassengerSaga = createRequestSaga(ADD_PASSENGER, actionAPI.addPassenger);
const cancelPassengerSaga = createRequestSaga(CANCEL_PASSENGER, actionAPI.cancelPassenger);
const cancelPassengerRequestSaga = createRequestSaga(CANCEL_PASSENGER_REQUEST, actionAPI.cancelPassengerRequest);
const getMyPostsSaga = createRequestSaga(GET_MYPOSTS, actionAPI.getMyPosts);

export function* manageSaga() {
    yield takeLatest(ADD_PASSENGER, addPassengerSaga);
    yield takeLatest(CANCEL_PASSENGER, cancelPassengerSaga);
    yield takeLatest(CANCEL_PASSENGER_REQUEST, cancelPassengerRequestSaga);
    yield takeLatest(GET_MYPOSTS, getMyPostsSaga);
};

const initialState = {
    myPosts: [],
    myPostsError: null,
    myHistory: [],
    myActivePosts: [],
    isActive: true,
};

const manage = handleActions(
    {
        [GET_MYPOSTS_SUCCESS]: (state, { payload: res }) => ({
            ...state,
            myActivePosts: res.data.posts,
            myPosts: res.data.posts,
            myHistory: res.data.history,
            myPostsError: null,
        }),
        [GET_MYPOSTS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            myPostsError: error.status,
            myActivePosts: null,
            myPosts: null,
            myHistory: null,
        }),
        [ADD_PASSENGER_SUCCESS]: (state, { payload: res }) => {
            const rideId = res.payload.rideId;
            const userId = res.payload.userId;
            return  produce(state, draft => {
                let postIndex;
                let rideIndex;
                draft.myPosts.forEach((p, i) =>
                    p.rides.forEach( (r, j)=> {
                        if (r.id === rideId) {
                            postIndex = i;
                            rideIndex = j;
                        }
                    })
                );
                const requestIndex = draft
                    .myPosts[postIndex]
                    .rides[rideIndex]
                    .RequestUsers
                    .findIndex(request => request.userId === userId);
                draft.myPosts[postIndex].rides[rideIndex].RequestUsers.splice(
                    requestIndex, 1);
                draft.myPosts[postIndex].rides[rideIndex].PartnerUsers.push(
                    res.data);
                draft.myPosts[postIndex].rides[rideIndex].available -= 1;
            })
        },
        [ADD_PASSENGER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            myPostsError: error.status,
        }),
        [CANCEL_PASSENGER_SUCCESS]: (state, { payload: res }) => {
            return produce(state, draft => {
                const ride = res.data;
                const userId = res.payload.userId;
                const postIndex = draft.myPosts.findIndex(post => post.id === ride.postId);
                const rideIndex = draft.myPosts[postIndex].rides.findIndex(r => r.id === ride.id);
                const partnerIndex = draft.myPosts[postIndex].rides[rideIndex].PartnerUsers
                    .findIndex(p => p.Partner.userId === userId);
                draft.myPosts[postIndex].rides[rideIndex].PartnerUsers.splice(partnerIndex, 1);
                draft.myPosts[postIndex].rides[rideIndex].available += 1;
            })

        },
        [CANCEL_PASSENGER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            myPostsError: error.status
        }),
        [CANCEL_PASSENGER_REQUEST_SUCCESS]: (state, { payload: res }) => {
            const rideId = res.payload.rideId;
            const userId = res.payload.userId;
            return  produce(state, draft => {
                let postIndex;
                let rideIndex;
                draft.myPosts.forEach((p, i) =>
                    p.rides.forEach( (r, j)=> {
                        if (r.id === rideId) {
                            postIndex = i;
                            rideIndex = j;
                        }
                    })
                );
                const requestIndex = draft
                    .myPosts[postIndex]
                    .rides[rideIndex]
                    .RequestUsers
                    .findIndex(request => request.userId === userId);
                draft.myPosts[postIndex].rides[rideIndex].RequestUsers.splice(
                    requestIndex, 1);
            })
        },
        [CANCEL_PASSENGER_REQUEST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            myPostsError: error.status
        }),
        [TOGGLE_ACTIVE]: (state, { payload: res }) => (
            produce(state, draft => {
                if(res) {
                  draft.myPosts = draft.myActivePosts;
                } else {
                    draft.myPosts = draft.myHistory;
                }
                draft.isActive = res;
            })
        )


    },
    initialState
);

export default manage;