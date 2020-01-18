import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

export default function* setFilePriority() {
    yield takeLatest(`${torrentDetailsActions.setFilePriority}`, function* ({ payload: { fileId, priority } }) {

        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const formData = new FormData();
            formData.append("hash", selectedTorrent.hash);
            formData.append("id", fileId);
            formData.append("priority", priority);

            const options = {
                method: 'POST',
                url: `${apiUrl}/${initialState.changePriorityPath}?hashes=${selectedTorrent.hash}`,
                data: formData,
                allowNoResponse: true
            }

            yield call(request, options);

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'setFilePriority' });
        }
    });
}
