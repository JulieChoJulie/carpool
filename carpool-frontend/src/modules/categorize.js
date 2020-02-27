import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as categorizeAPI from '../lib/api/categorize';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';

const [
    POST_SAVE,
    POST_SAVE_SUCCESS,
    POST_SAVE_FAILURE
] = createRequestActionTypes('categorize/POST_SAVE');

export const postSave = createAction(POST_SAVE, id => id);

const postSaveSaga = createRequestSaga(POST_SAVE, categorizeAPI.postSave);

const [
    GET_SAVE,
    GET_SAVE_SUCCESS,
    GET_SAVE_FAILURE
] = createRequestActionTypes('categorize/GET_SAVE');

export const getSave = createAction(GET_SAVE);

const getSaveSaga = createRequestSaga(GET_SAVE, categorizeAPI.getSave);

const [
    DELETE_SAVE,
    DELETE_SAVE_SUCCESS,
    DELETE_SAVE_FAILURE
] = createRequestActionTypes('categorize/DELETE_SAVE');

export const deleteSave = createAction(DELETE_SAVE, id => id);

const deleteSaveSaga = createRequestSaga(DELETE_SAVE, categorizeAPI.deleteSave);

const [
    STATUS_SAVE,
    STATUS_SAVE_SUCCESS,
    STATUS_SAVE_FAILURE
] = createRequestActionTypes('categorize/STATUS_SAVE');

export const statusSave = createAction(STATUS_SAVE, id => id);

const statusSaveSaga = createRequestSaga(STATUS_SAVE, categorizeAPI.getSaveStatus);


export function* categorizeSaga() {
    yield takeLatest(POST_SAVE, postSaveSaga);
    yield takeLatest(GET_SAVE, getSaveSaga);
    yield takeLatest(DELETE_SAVE, deleteSaveSaga);
    yield takeLatest(STATUS_SAVE, statusSaveSaga);
}

const initialState = {
    savePosts: null,
    error: null,
    status: false,
};

const categorize = handleActions({
    [POST_SAVE_SUCCESS]: (state, { payload: res }) => {
        console.log('module: ' + res.data.status);
        return {
        ...state,
        error: null,
        status: res.data.status,
    }},
    [POST_SAVE_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error: error.status
    }),
    [DELETE_SAVE_SUCCESS]: (state, { payload: res }) => ({
        ...state,
        error: null,
        status: res.data.status,
    }),
    [DELETE_SAVE_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error: error.status
    }),
    [GET_SAVE_SUCCESS]: (state, { payload: res }) => ({
        ...state,
        savePosts: res.data,
    }),
    [GET_SAVE_FAILURE]: (state, { payload: error }) => ({
        ...state,
        savePosts: null,
        error: error.status
    }),
    [STATUS_SAVE_SUCCESS]: (state, { payload: res}) => ({
        ...state,
        status: res.data.status,
    }),
    [STATUS_SAVE_FAILURE]: (state, { payload: error }) => ({
        ...state,
        status: error.status,
    })
}, initialState);

export default categorize