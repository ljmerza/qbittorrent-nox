import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { getTorrentHashes } from 'utilities/torrent.tools';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

export default function* deleteTorrent() {
    yield takeLatest(`${torrentDetailsActions.deleteSelectedTorrent}`, function* ({ payload }) {
        
        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const hashes = getTorrentHashes(selectedTorrent);

            // torrent is deleted so clear the selected torrent
            yield put({ type: `${torrentDetailsActions.clearTorrent}`});

            const formData = new FormData();
            formData.append("deleteFiles", payload);
            formData.append("hashes", hashes);

            const options = {
                method: 'POST',
                url: `${apiUrl}/${initialState.deletePath}`,
                data: formData,
                allowNoResponse: true,
            }

            yield call(request, options);
            yield put({ type: `${toastActions.showSuccess}`, message: 'Torrent Deleted', from: 'deleteTorrent' });
            
        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e, from: 'deleteTorrent' });
        }
    });
}
