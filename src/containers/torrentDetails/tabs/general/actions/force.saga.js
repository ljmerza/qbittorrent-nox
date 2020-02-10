import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { getTorrentHashes } from 'utilities/torrent.tools';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

export default function* forceResumeTorrent() {
    yield takeLatest(`${torrentDetailsActions.forceResumeSelectedTorrent}`, function* () {
        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const hashes = getTorrentHashes(selectedTorrent);

            const formData = new FormData();
            formData.append("hashes", hashes);
            formData.append("value", true);

            const options = {
                method: 'POST',
                url: `${apiUrl}/${initialState.forceResumePath}`,
                data: formData,
                allowNoResponse: true
            };

            yield call(request, options);
            yield put({ type: `${toastActions.showSuccess}`, message: 'Torrent force resumed', from: 'forceResumeTorrent' });

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'forceResumeTorrent' });
        }
    });
}
