import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { initialState, torrentDetailsActions } from '../torrentDetails.reducer';
import { getSelectedTorrent } from '../torrentDetails.selectors';

function* getTrackersInformation() {
    try {
        const apiUrl = yield select(getLoginApiUrl);
        const selectedTorrent = yield select(getSelectedTorrent);
        if (!selectedTorrent) return;

        const options = {
            method: 'GET',
            url: `${apiUrl}/${initialState.trackersPath}?hash=${selectedTorrent.hash}`,
        }

        const response = yield call(request, options);

        if (response) {
            yield put({ type: `${torrentDetailsActions.getTrackersInfoSuccess}`, response });
        } else {
            yield put({ type: `${torrentDetailsActions.getTrackersInfoError}`, error: '' });
        }

    } catch (e) {
        yield put({ type: `${torrentDetailsActions.getTrackersInfoError}`, error: e.message });
    }
}

export default function* getTrackersInfo() {
    yield takeLatest(`${torrentDetailsActions.getTrackersInfo}`, getTrackersInformation);
}
