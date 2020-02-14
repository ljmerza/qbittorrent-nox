import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { getTorrentHashes } from 'utilities/torrent.tools';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from '../torrentDetails.reducer';
import { getSelectedTorrent } from '../torrentDetails.selectors';

export default function* getTrackersInfo() {
    yield takeLatest(`${torrentDetailsActions.getTrackersInfo}`, function* () {
        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const hashes = getTorrentHashes(selectedTorrent);

            const options = {
                method: 'GET',
                url: `${apiUrl}/${initialState.trackersPath}?hash=${hashes}`,
            }

            const response = yield call(request, options);

            if (response) {
                yield put({ type: `${torrentDetailsActions.getTrackersInfoSuccess}`, response });
            } else {
                yield put({ type: `${toastActions.showError}`, message: null, from: 'getTrackersInfo' });
            }

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'getTrackersInfo' });
        }
    });
}
