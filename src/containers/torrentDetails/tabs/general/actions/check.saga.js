import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

export default function* recheckTorrent() {
    yield takeLatest(`${torrentDetailsActions.checkSelectedTorrent}`, function* () {
        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const options = {
                method: 'GET',
                url: `${apiUrl}/${initialState.recheckPath}?hashes=${selectedTorrent.hash}`,
            }

            yield call(request, options);

        } catch (e) {
            yield put({ type: `${torrentDetailsActions.getGeneralInfoError}`, error: e.message });
        }
    });
}
