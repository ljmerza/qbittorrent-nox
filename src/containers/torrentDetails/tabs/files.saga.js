import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from '../torrentDetails.reducer';
import { getSelectedTorrent } from '../torrentDetails.selectors';


export default function* getFilesInfo() {
    yield takeLatest(`${torrentDetailsActions.getFilesInfo}`, function* () {
        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const options = {
                method: 'GET',
                url: `${apiUrl}/${initialState.filesPath}?hash=${selectedTorrent.hash}`,
            }

            const response = yield call(request, options);

            if (response) {
                yield put({ type: `${torrentDetailsActions.getFilesInfoSuccess}`, response });
            } else {
                yield put({ type: `${toastActions.showError}`, message: null, from: 'getFilesInfo' });
            }

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e, from: 'getFilesInfo' });
        }
    });
}