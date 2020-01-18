import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from './login.selectors';
import { initialState, loginActions } from './login.reducer';

export default function* login() {
    yield takeLatest(`${loginActions.login}`, function* (action) {
        try {
            const apiUrl = (yield select(getLoginApiUrl)) || action.payload.baseApiUrl;

            const formData = new FormData();
            formData.append("username", action.payload.username);
            formData.append("password", action.payload.password);

            const options = {
                method: 'POST',
                url: `${apiUrl}/${initialState.path}`,
                data: formData,
                allowTextResponse: true,
            }

            const loggedIn = yield call(request, options);

            if (/ok/i.test(loggedIn)) {
                yield put({ type: `${loginActions.loginSuccess}`, loggedIn });
            } else {
                yield put({ type: `${toastActions.showError}`, message: null, from: 'login' });
                yield put({ type: `${loginActions.notLoggedIn}`, message: null, from: 'login' });
            }

        } catch (e) {
            const message = `Invalid username and/or password`;
            yield put({ type: `${toastActions.showError}`, message: message, from: 'login' });
            yield put({ type: `${loginActions.notLoggedIn}`, message: null, from: 'login' });
        }
    });
}