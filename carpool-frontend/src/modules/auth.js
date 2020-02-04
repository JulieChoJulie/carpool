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
const PASSWORD_CHECK = 'auth/PASSWORD_CHECK';

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

export const passwordCheck = createAction(PASSWORD_CHECK, boolean => boolean);

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
        username: null,
        email: null,
        passwordConfirm: null,
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
            auth: auth.data,
        }),
        [SIGNUP_FAILURE]: (state, { payload: error }) => ({
            ...state,
            auth: null,
            authError: error
        }),
        [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            auth: auth.data,
            authError: null
        }),
        [LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            auth: null,
            authError: error
        }),
        [UNIQUE_SUCCESS]: (state, { payload: auth }) => {
            return produce(state, draft => {
                draft.auth = auth.data;
                draft.authError = null;
                draft.error[auth.payload.type] = false;
            })
        },
        [UNIQUE_FAILURE]: (state, { payload: error }) => {
            if (error.data.value === '') {
                return produce(state, draft => {
                    draft.error[error.data.type] = false;
                })
            }
            return produce(state, draft => {
                draft.error[error.data.type] = true;
            })},
        [PASSWORD_CHECK]: (state, action) => {
            return produce(state, draft => {
                draft.error.passwordConfirm = action.payload;
            })
        }
    },
    initialState
);

export default auth;