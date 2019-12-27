import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from '../../utilities/request';
import { selectGlobalApi } from '../../common/global/global.selectors';
import { initialState, loginActions } from './login.reducer';

function* login(action) {
    try {
        const apiUrl = yield select(selectGlobalApi);

        const formData = new FormData();
        formData.append("username", action.payload.username);
        formData.append("password", action.payload.password);

        const options = { 
            method: 'POST',
            url: `${apiUrl}/${initialState.path}`,
            data: formData,
        }

        const loggedIn = yield call(request, options);
        yield put({ type: `${loginActions.loginSuccess}`, loggedIn });

    } catch (e) {
        yield put({ type: `${loginActions.loginError}`, error: e.message });
    }
}

export default function* loginWatcher() {
    yield takeLatest(`${loginActions.login}`, login);
}