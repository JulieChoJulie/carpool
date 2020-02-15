import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import post, { postSaga } from './post';
import manage, { manageSaga } from './manage';
import loading from './loading';
import write, { writeSaga } from './write';
import menu from './menu';

const rootReducer = combineReducers({
    auth,
    loading,
    user,
    write,
    post,
    manage,
    menu,
});

export function* rootSaga() {
    yield all([
        authSaga(), userSaga(), writeSaga(), postSaga(), manageSaga()
    ]);
}

export default rootReducer;