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
    yield takeLatest(`${configActions.getApiVersion}`, function* () {

        try {
            const apiUrl = yield select(getLoginApiUrl);

            const options = {
                method: 'GET',
                url: `${apiUrl}/${initialState.pathVersion}`,
                allowTextResponse: true,
            }

            const apiVersion = yield call(request, options);
            yield put({ type: `${loginActions.loginSuccess}` });
            yield put({ type: `${configActions.getApiVersionSuccess}`, apiVersion });
                
        } catch (e) {
            yield put({ type: `${loginActions.notLoggedIn}`, from: 'getApiVersion' });
        }
    });
}