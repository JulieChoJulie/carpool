import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
    createRequestActionTypes
} from '../lib/createRequestSaga';

// temp user save after refreshing the page.
const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [PROFILE, PROFILE_SUCCESS, PROFILE_FAILURE] = createRequestActionTypes('auth/CHECK');

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const profile = createAction(PROFILE);

const profileSaga = createRequestSaga(PROFILE, authAPI.profile);
function profileFailureSaga() {
    try {
        localStorage.removeItem('user');
    } catch (e) {
        console.log('localStorage is not working.')
    }
}
export function* userSaga() {
    yield takeLatest(PROFILE, profileSaga);
    yield takeLatest(PROFILE_FAILURE, profileFailureSaga)
}

const initialState = {
    user: null,
    profileError: null,
};

export default handleActions(
    {
        [TEMP_SET_USER]: (state, { payload: user }) => ({
            ...state,
            user
        }),
        [PROFILE_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            user: user.data,
            profileError: null,
        }),
        [PROFILE_FAILURE]: (state, { payload: error}) => ({
            ...state,
            user: null,
            profileError: error
        })
    },
    initialState
)