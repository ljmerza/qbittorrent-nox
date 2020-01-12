import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from '../../../torrentDetails.reducer';
import { getSelectedTorrent } from '../../../torrentDetails.selectors';


export default function* moveTorrent() {
    yield takeLatest(`${torrentDetailsActions.changeTorrentLocation}`, function* ({ payload }) {

        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const formData = new FormData();
            formData.append("hashes", selectedTorrent.hash);
            formData.append("location", payload);

            const options = {
                method: 'POST',
                url: `${apiUrl}/${initialState.moveTorrentPath}?hash=${selectedTorrent.hash}`,
                data: formData,
                allowNoResponse: true
            };

            yield call(request, options);

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e, from: 'moveTorrent' });
        }
    });
}
