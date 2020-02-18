import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, settingsActions } from './settings.reducer';

export default function* getSettings() {
    yield takeLatest(`${settingsActions.getSettings}`, function* () {

        try {
            const apiUrl = yield select(getLoginApiUrl);

            const options = {
                method: 'GET',
                url: `${apiUrl}/${initialState.path}`,
            }

            const settings = yield call(request, options);
            yield put({ type: `${settingsActions.getSettingsSuccess}`, settings });

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'getSettings' });
        }
    });
}