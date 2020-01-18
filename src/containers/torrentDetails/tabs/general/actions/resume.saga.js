import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

export default function* resumeTorrent() {
    yield takeLatest(`${torrentDetailsActions.resumeSelectedTorrent}`, function* () {
        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const options = {
                method: 'GET',
                url: `${apiUrl}/${initialState.resumePath}?hashes=${selectedTorrent.hash}`,
            }

            yield call(request, options);

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'resumeTorrent' });
        }
    });
}
