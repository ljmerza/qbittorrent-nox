import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { loginActions } from 'containers/login/login.reducer';
import { initialState, configActions } from './config.reducer';

export default function* getConfig() {
    yield takeLatest(`${configActions.getConfig}`, function* () {

        try {
            const apiUrl = yield select(getLoginApiUrl);

            const options = {
                method: 'GET',
                url: `${apiUrl}/${initialState.path}`,
            }

            const config = yield call(request, options);
            yield put({ type: `${configActions.getConfigSuccess}`, config });

        } catch (e) {
            yield put({ type: `${loginActions.loginError}`, error: null });
        }
    });
}