import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
} from '../lib/createRequestSaga';
import * as profileAPI from '../lib/api/profile';
import produce from 'immer';

const [
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE
] = createRequestActionTypes('profile/GET_PROFILE');

export const getProfile = createAction(GET_PROFILE, username => username);

const getProfileSaga = createRequestSaga(GET_PROFILE, profileAPI.getProfile);

export function* profileSaga() {
    yield takeLatest(GET_PROFILE, getProfileSaga);
}

const initialState = {
    profile: {
        reservations: {},
        posts: {},
        user: {},
    },
    profileError: null,
};

const profile = handleActions({
    [GET_PROFILE_SUCCESS]: (state, { payload: res }) => (
        produce(state, draft => {
            const data = res.data;
            const { username, email, isStudent, cell, createdAt, id } = data;
            console.log(JSON.stringify(data))
            draft.profile.posts.lookingFor = data.lookingForRides.reduce((acc, r) => {
                if (r.PartnerUsers.length > 0) {
                    acc += 1;
                }
                return acc;
            }, 0);
            draft.profile.posts.offering = data.offeringRides.reduce((acc, r) => {
                if (r.PartnerUsers.length > 0) {
                    acc += 1;
                }
                return acc;
            }, 0);
            draft.profile.reservations.lookingFor = data.driverRides.length;
            draft.profile.reservations.offering = data.passengerRides.length;
            draft.profile.user = {
                username, email, isStudent, cell, createdAt, id
            };
            draft.profileError = null;
        })
    ),
    [GET_PROFILE_FAILURE]: (state, { payload: err }) => ({
        ...state,
        profile: initialState.profile,
        profileError: err.status,
    })
}, initialState);


export default profile;