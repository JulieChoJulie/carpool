import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FILED';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createRequestActionTypes('auth/SIGNUP');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
const [UNIQUE, UNIQUE_SUCCESS, UNIQUE_FAILURE] = createRequestActionTypes('auth/UNIQUE');

export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value}) => ({
        form, // login, signup
        key, // username, password, passwordConfirm
        value
    })
);

export const signup = createAction(
    SIGNUP,
    ({ username, email, cell, password }) => ({
        username,
        email,
        cell,
        password
    })
);

export const unique = createAction(
    UNIQUE,
    ({ type, value }) => ({
        type,
        value
    })
)

export const login = createAction(
    LOGIN,
    ({ username, password}) => ({
        username, password
    })
);

// create Saga
const signupSaga = createRequestSaga(SIGNUP, authAPI.signup);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const uniqueSaga = createRequestSaga(UNIQUE, authAPI.uniqueCheck);

export function* authSaga() {
    yield takeLatest(SIGNUP, signupSaga);
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(UNIQUE, uniqueSaga);
}

export const initializeForm = createAction(INITIALIZE_FORM, form => form);

const initialState = {
    signup: {
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
        cell: '',
    },
    login: {
        username: '',
        password: ''
    },
    unique: {
        type: '',
        value: ''
    },
    auth: null,
    authError: null,
    error: {
        username: false,
        email: false,
    }
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                draft[form][key] = value;
            }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [SIGNUP_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        [SIGNUP_FAILURE]: (state, { payload: error }) => ({
            ...state,
            auth: null,
            authError: error
        }),
        [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            auth,
            authError: null
        }),
        [LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            auth: null,
            authError: error
        }),
        [UNIQUE_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            auth,
            authError: null
        }),
        [UNIQUE_FAILURE]: (state, { payload: error }) => {
            if (error.data.value === '') {
                return produce(state, draft => {
                    draft.error[error.data.type] = false;
                })
            }
            return produce(state, draft => {
                draft.error[error.data.type] = true;
            })},
    },
    initialState
);

export default auth;