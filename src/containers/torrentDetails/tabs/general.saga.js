import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from '../../../utilities/request';
import { selectGlobalApi } from '../../../common/global/global.selectors';
import { initialState, torrentDetailsActions } from '../torrentDetails.reducer';
import { getSelectedTorrent } from '../torrentDetails.selectors';

function* getGeneralInformation() {
    try {
        const apiUrl = yield select(selectGlobalApi);
        const selectedTorrent = yield select(getSelectedTorrent);
        if (!selectedTorrent) return;

        const options = {
            method: 'GET',
            url: `${apiUrl}/${initialState.propertiesPath}?hash=${selectedTorrent.hash}`,
        }

        const response = yield call(request, options);

        if (response) {
            yield put({ type: `${torrentDetailsActions.getGeneralInfoSuccess}`, response });
        } else {
            yield put({ type: `${torrentDetailsActions.getGeneralInfoError}`, error: '' });
        }

    } catch (e) {
        yield put({ type: `${torrentDetailsActions.getGeneralInfoError}`, error: e.message });
    }
}

export default function* getGeneralInfo() {
    yield takeLatest(`${torrentDetailsActions.getGeneralInfo}`, getGeneralInformation);
}