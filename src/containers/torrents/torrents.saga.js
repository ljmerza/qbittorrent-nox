import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentsActions } from './torrents.reducer';

export default function* torrents() {
    yield takeLatest(`${torrentsActions.torrents}`, function* () {
        try {
            const apiUrl = yield select(getLoginApiUrl);

            const options = {
                method: 'GET',
                url: `${apiUrl}/${initialState.path}`,
            }

            const response = yield call(request, options);
            yield put({ type: `${torrentsActions.torrentsSuccess}`, response });

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'torrents' });
        }
    });
}