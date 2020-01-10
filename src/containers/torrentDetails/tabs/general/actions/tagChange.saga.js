import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

export default function* changeTorrentTag() {

    yield takeLatest(`${torrentDetailsActions.changeTorrentTag}`, function* ({ payload }) {

        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const formData = new FormData();
            formData.append("hashes", selectedTorrent.hash);
            formData.append("tag", payload);

            const options = {
                method: 'POST',
                url: `${apiUrl}/${initialState.setTagPath}`,
                data: formData,
            }

            yield call(request, options);

        } catch (e) {
            yield put({ type: `${torrentDetailsActions.getGeneralInfoError}`, error: e.message });
        }
    });
}
