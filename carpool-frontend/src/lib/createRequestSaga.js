import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
}

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) {
        yield put(startLoading(type)); // start loading
        try {
            const response = yield call(request, action.payload);
            yield put({
                type: SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            const error = {};
            if (e.config.data) {
                error.data = JSON.parse(e.config.data);
            }
            const status =parseInt(e.message.slice(-3));
            error.status = status;
            yield put({
                type: FAILURE,
                payload: error,
                error: true
            })

        }
        yield put(finishLoading(type)); // end loading
    }
}