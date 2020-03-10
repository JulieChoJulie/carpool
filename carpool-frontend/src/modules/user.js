import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
    createRequestActionTypes
} from '../lib/createRequestSaga';
import produce from "immer";

// temp user save after refreshing the page.
const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [
    PROFILE,
    PROFILE_SUCCESS,
    PROFILE_FAILURE
] = createRequestActionTypes('auth/CHECK');
const LOGOUT = 'user/LOGOUT';
const [
    SEND_CODE,
    SEND_CODE_SUCCESS,
    SEND_CODE_FAILURE
] = createRequestActionTypes('user/SEND_CODE');
const [
    COMPARE_CODES,
    COMPARE_CODES_SUCCESS,
    COMPARE_CODES_FAILURE
] = createRequestActionTypes('user/COMPARE_CODES');
const CHANGE_FIELD = 'user/CHANGE_FILED';

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const profile = createAction(PROFILE);
export const logout = createAction(LOGOUT);
export const sendCode = createAction(SEND_CODE);
export const compareCodes = createAction(COMPARE_CODES, code => code);
export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value}) => ({
        form, // login, signup
        key, // username, password, passwordConfirm
        value
    })
);


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
const sendCodeSaga = createRequestSaga(SEND_CODE, authAPI.sendVerificationCodes);
const compareCodesSaga = createRequestSaga(COMPARE_CODES, authAPI.compareVerificationCodes);


export function* userSaga() {
    yield takeLatest(PROFILE, profileSaga);
    yield takeLatest(PROFILE_FAILURE, profileFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
    yield takeLatest(SEND_CODE, sendCodeSaga);
    yield takeLatest(COMPARE_CODES, compareCodesSaga);
}

const initialState = {
    user: null,
    profileError: null,
    verification: {
        code: '',
        time: null,
    },
    verificationError: null,
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
        }),
        [SEND_CODE_SUCCESS]: (state, { payload: res }) => (
            produce(state, draft => {
                draft.verificationError = null;
                draft.verification.time = res.data;
            })
        ),
        [SEND_CODE_FAILURE]: (state, { payload: error }) => ({
            ...state,
            verificationError: error.status,
            verification: initialState.verification,
        }),
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                draft[form][key] = value;
        }),
        [COMPARE_CODES_SUCCESS]: (state, { paload: res}) => (
            produce(state, draft => {
                draft.user.isStudent = true;
            })
        ),
        [COMPARE_CODES_FAILURE]: (state, { payload: error }) => ({
            ...state,
            verificationError: error.status,
        })
    },
    initialState
)