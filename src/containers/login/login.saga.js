import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from '../../utilities/request';
import { getLoginApiUrl } from '../login/login.selectors';
import { initialState, loginActions } from './login.reducer';

function* login(action) {
    try {
        const apiUrl = (yield select(getLoginApiUrl)) || action.payload.apiRoot;

        const formData = new FormData();
        formData.append("username", action.payload.username);
        formData.append("password", action.payload.password);

        const options = { 
            method: 'POST',
            url: `${apiUrl}/${initialState.path}`,
            data: formData,
        }

        const loggedIn = yield call(request, options);
        
        if (loggedIn) {
            yield put({ type: `${loginActions.loginSuccess}`, loggedIn });
        } else {
            yield put({ type: `${loginActions.loginError}`, error: null });
        }

    } catch (e) {
        console.log({ e })
        yield put({ type: `${loginActions.loginError}`, error: e.message });
    }
}

export default function* loginWatcher() {
    yield takeLatest(`${loginActions.login}`, login);
}