import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { getTorrentsRid } from './torrents.selectors';
import { initialState, torrentsActions } from './torrents.reducer';

export default function* torrents() {
    yield takeLatest(`${torrentsActions.torrents}`, function* () {
        try {
            const apiUrl = yield select(getLoginApiUrl);
            const rid = (yield select(getTorrentsRid)) || 0;

            const options = {
                method: 'GET',
                url: `${apiUrl}/${initialState.path}?rid=${rid}`,
            }

            const response = yield call(request, options);
            yield put({ type: `${torrentsActions.torrentsSuccess}`, response });

        } catch (e) {
            yield put({ type: `${torrentsActions.torrentsError}`, from: 'torrents' });
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'torrents' });
        }
    });
}