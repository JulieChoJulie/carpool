import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import post, { postSaga } from './post';
import manage, { manageSaga } from './manage';
import loading from './loading';
import write, { writeSaga } from './write';
import menu from './menu';
import posts, { postsSaga } from './posts';
import notifications, { notificationsSaga} from "./notifications";
import socketReducer, { handleNewNotification } from './socket';
import categorize, { categorizeSaga } from "./categorize";
import profile, { profileSaga } from './profile';
const rootReducer = combineReducers({
    auth,
    loading,
    user,
    write,
    post,
    manage,
    menu,
    posts,
    socketReducer,
    notifications,
    categorize,
    profile,
});

export function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
        writeSaga(),
        postSaga(),
        manageSaga(),
        postsSaga(),
        handleNewNotification(),
        notificationsSaga(),
        categorizeSaga(),
        profileSaga(),
    ]);

}

export default rootReducer;