import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
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
            yield put({ type: `${toastActions.showError}`, message: e, from: 'getConfig' });
        }
    });
}