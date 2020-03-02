import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { getTorrentHashes } from 'utilities/torrent.tools';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

export default function* changeTorrentTags() {

    yield takeLatest(`${torrentDetailsActions.changeTorrentTags}`, function* ({ payload: { target: { value } } }) {


        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            const hashes = getTorrentHashes(selectedTorrent);

            // find out if adding or removing tag
            const isAdding = value.length > selectedTorrent.tagsUi.length;
            const tagPath = isAdding ? initialState.addTagPath : initialState.removeTagPath;

             // need space since reset doesnt have tag - want 1 space always
            let successMessage = isAdding ? ' Added' : ' Removed';

            let tag;
            if (isAdding){
                tag = value.filter(x => !selectedTorrent.tagsUi.includes(x)).join(',');
            } else if (value.length === 0) {
                tag = '';
                successMessage = 'Reset Successfully';
            } else {
                tag = selectedTorrent.tagsUi.filter(x => !value.includes(x)).join(',');
            }

            const formData = new FormData();
            formData.append("hashes", hashes);
            formData.append("tags", tag);

            const options = {
                method: 'POST',
                url: `${apiUrl}/${tagPath}`,
                data: formData,
                allowNoResponse: true,
            }

            yield call(request, options);
            yield put({ type: `${toastActions.showSuccess}`, message: `Torrent Tag ${tag}${successMessage}`, from: 'changeTorrentTag' });

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'changeTorrentTag' });
        }
    });
}
