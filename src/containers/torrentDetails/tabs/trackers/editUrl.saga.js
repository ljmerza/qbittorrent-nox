import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

export default function* trackerEditUrl() {
    yield takeLatest(`${torrentDetailsActions.trackerEditUrl}`, function* ({ payload: { origUrl, newUrl } }) {

        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const formData = new FormData();
            formData.append("hash", selectedTorrent.hash);
            formData.append("origUrl", origUrl);
            formData.append("newUrl", newUrl);

            const options = {
                method: 'POST',
                url: `${apiUrl}/${initialState.trackerEditPath}`,
                data: formData
            }

            yield call(request, options);

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'trackerEditUrl' });
        }
    });
}
