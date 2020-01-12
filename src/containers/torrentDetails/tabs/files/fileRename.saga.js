import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

export default function* setFileRename() {
    yield takeLatest(`${torrentDetailsActions.setFileRename}`, function* ({ payload: { fileId, name } }) {
        
        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const formData = new FormData();
            formData.append("hash", selectedTorrent.hash);
            formData.append("id", fileId);
            formData.append("name", name);

            const options = {
                method: 'POST',
                url: `${apiUrl}/${initialState.fileRenamePath}?hashes=${selectedTorrent.hash}`,
                data: formData,
                allowNoResponse: true
            }

            yield call(request, options);

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e, from: 'setFileRename' });
        }
    });
}
