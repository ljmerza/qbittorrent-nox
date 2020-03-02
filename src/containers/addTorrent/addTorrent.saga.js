import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, addTorrentActions } from './addTorrent.reducer';

export default function* addTorrent() {
    yield takeLatest(`${addTorrentActions.addTorrent}`, function* ({ payload }) {

        console.log({ payload })

        try {
            const apiUrl = yield select(getLoginApiUrl);

            const formData = new FormData();

            payload.torrents.map(file => {
                formData.append("fileselect", file);
            });
            if (payload.urls) formData.append("urls", payload.urls);

            formData.append("autoTMM", payload.managementMode === 'AUTOMATIC');
            formData.append("savepath", payload.saveLocation);
            if (payload.cookie) formData.append("cookie", payload.cookie);
            formData.append("rename", payload.renameTorrent);
            formData.append("category", payload.category);
            formData.append("paused", !payload.startTorrent);
            formData.append("skip_checking", payload.skipHash);
            formData.append("root_folder", !payload.createSubDirectory);
            formData.append("sequentialDownload", payload.downloadSequential);
            formData.append("firstLastPiecePrio", payload.downloadFirstLast);
            formData.append("dlLimit", payload.limitDownloadRate * 1024);
            formData.append("upLimit", payload.limitUploadRate * 1024);

            const options = {
                method: 'POST',
                url: `${apiUrl}/${initialState.path}`,
                data: formData,
                headers: {
                    'content-type': 'multipart/form-data'
                },
            }

            yield call(request, options);
            yield put({ type: `${toastActions.showSuccess}`, message: `Added successfully`, from: 'addTorrent' });

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'addTorrent' });
        }
    });
}
