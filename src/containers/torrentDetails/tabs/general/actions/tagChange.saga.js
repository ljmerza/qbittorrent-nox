import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

export default function* changeTorrentTags() {

    yield takeLatest(`${torrentDetailsActions.changeTorrentTags}`, function* ({ payload }) {


        try {
            const apiUrl = yield select(getLoginApiUrl);
            const selectedTorrent = yield select(getSelectedTorrent);
            if (!selectedTorrent) return;

            // find out if adding or removing tag
            const isAdding = payload.length > selectedTorrent.tagsUi.length;
            const tagPath = isAdding ? initialState.addTagPath : initialState.removeTagPath;

             // need space since reset doesnt have tag - want 1 space always
            let successMessage = isAdding ? ' added' : ' removed';

            let tag;
            if (isAdding){
                tag = payload.filter(x => !selectedTorrent.tagsUi.includes(x)).join(',');
            } else if (payload.length === 0) {
                tag = '';
                successMessage = 'reset successfully';
            } else {
                tag = selectedTorrent.tagsUi.filter(x => !payload.includes(x)).join(',');
            }

            const formData = new FormData();
            formData.append("hashes", selectedTorrent.hash);
            formData.append("tags", tag);

            const options = {
                method: 'POST',
                url: `${apiUrl}/${tagPath}`,
                data: formData,
                allowNoResponse: true,
            }

            yield call(request, options);
            yield put({ type: `${toastActions.showSuccess}`, message: `Tag ${tag}${successMessage}`, from: 'changeTorrentTag' });

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'changeTorrentTag' });
        }
    });
}
