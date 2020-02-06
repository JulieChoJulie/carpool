import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
    createRequestActionTypes
} from '../lib/createRequestSaga';

// temp user save after refreshing the page.
const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [PROFILE, PROFILE_SUCCESS, PROFILE_FAILURE] = createRequestActionTypes('auth/CHECK');
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const profile = createAction(PROFILE);
export const logout = createAction(LOGOUT);

const profileSaga = createRequestSaga(PROFILE, authAPI.profile);
function profileFailureSaga() {
    try {
        localStorage.removeItem('user');
    } catch (e) {
        console.log('localStorage is not working.')
    }
}

function* logoutSaga() {
    try {
        yield call(authAPI.logout);
        localStorage.removeItem('user');
    } catch (e) {
        console.log(e);
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
        }),
        [LOGOUT]: state => ({
            ...state,
            user: null,
        })
    },
    initialState
)