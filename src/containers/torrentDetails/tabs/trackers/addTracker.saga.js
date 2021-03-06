import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { getTorrentHashes } from 'utilities/torrent.tools';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

export default function* trackerAdd() {
    yield takeLatest(`${torrentDetailsActions.trackerAdd}`, function* ({ payload: { urls } }) {

        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const hashes = getTorrentHashes(selectedTorrent);

            const formData = new FormData();
            formData.append("hash", hashes);
            formData.append("urls", urls);

            const options = {
                method: 'POST',
                url: `${apiUrl}/${initialState.trackerAddPath}`,
                data: formData
            }

            yield call(request, options);

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'trackerAdd' });
        }
    });
}
