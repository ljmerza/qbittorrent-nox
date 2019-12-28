import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from '../../../utilities/request';
import { selectGlobalApi } from '../../../common/global/global.selectors';
import { initialState, torrentDetailsActions } from '../torrentDetails.reducer';
import { getSelectedTorrent } from '../torrentDetails.selectors';

function* getPeersInformation() {
    try {
        const apiUrl = yield select(selectGlobalApi);
        const selectedTorrent = yield select(getSelectedTorrent);
        if (!selectedTorrent) return;

        const options = {
            method: 'GET',
            url: `${apiUrl}/${initialState.peersPath}?hash=${selectedTorrent.hash}`,
        }

        const response = yield call(request, options);
        yield put({ type: `${torrentDetailsActions.getPeersInfoSuccess}`, response });

    } catch (e) {
        yield put({ type: `${torrentDetailsActions.getPeersInfoError}`, error: e.message });
    }
}

export default function* getPeersInfo() {
    yield takeLatest(`${torrentDetailsActions.getPeersInfo}`, getPeersInformation);
}
