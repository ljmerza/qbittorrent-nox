import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request'; 
import { getTorrentHashes } from 'utilities/torrent.tools';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

export default function* changeTorrentCategory() {
    yield takeLatest(`${torrentDetailsActions.changeTorrentCategory}`, function* ({ payload: { target: { value }} }) {
        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const hashes = getTorrentHashes(selectedTorrent);

            const formData = new FormData();
            formData.append("hashes", hashes);
            formData.append("category", value);

            const options = {
                method: 'POST',
                allowNoResponse: true,
                url: `${apiUrl}/${initialState.setCategoryPath}`,
                data: formData,
            }

            yield call(request, options);
            yield put({ type: `${toastActions.showSuccess}`, message: 'Torrent category changed', from: 'changeTorrentCategory' });


        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'changeTorrentCategory' });
        }
    });
}
