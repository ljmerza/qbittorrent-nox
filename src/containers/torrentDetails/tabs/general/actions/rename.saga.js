import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { getTorrentHashes } from 'utilities/torrent.tools';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from '../../../torrentDetails.reducer';
import { getSelectedTorrent } from '../../../torrentDetails.selectors';


export default function* renameTorrent() {
    yield takeLatest(`${torrentDetailsActions.changeTorrentName}`, function* ({ payload }) {

        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const hashes = getTorrentHashes(selectedTorrent);

            const formData = new FormData();
            formData.append("hash", hashes);
            formData.append("name", payload);
        
            const options = {
                method: 'POST',
                url: `${apiUrl}/${initialState.renameTorrentPath}`,
                data: formData,
                allowNoResponse: true
            };

            yield call(request, options);
            yield put({ type: `${toastActions.showSuccess}`, message: 'Torrent Renamed', from: 'renameTorrent' });

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'renameTorrent' });
        }
    });
}
