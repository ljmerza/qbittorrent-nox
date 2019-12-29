import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { loginActions } from 'containers/login/login.reducer';
import { initialState, configActions } from './config.reducer';

/**
 * gets version but also is used to check if user is logged in
 * if not then set loggedIn to false so we reroute to the login page
 */
export default function* getApiVersion() {
    yield takeLatest(`${configActions.getApiVersion}`, function* getVersion() {

        try {
            const apiUrl = yield select(getLoginApiUrl);

            const options = {
                method: 'GET',
                url: `${apiUrl}/${initialState.pathVersion}`,
            }

            const apiVersion = yield call(request, options);
            if (apiVersion){
                yield put({ type: `${loginActions.loginSuccess}` });
                yield put({ type: `${configActions.getApiVersionSuccess}`, apiVersion });
            } else {
                yield put({ type: `${loginActions.loginError}`, error: null });
            }

        } catch (e) {
            yield put({ type: `${loginActions.loginError}`, error: null });
        }
    });
}