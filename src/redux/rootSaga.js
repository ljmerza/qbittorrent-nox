import { all } from 'redux-saga/effects';

import loginSaga from '../containers/login/login.saga';
import torrentsSaga from '../containers/torrents/torrents.saga';
import getGeneralInfo from '../containers/torrentDetails/tabs/general.saga';
import getTrackersInfo from '../containers/torrentDetails/tabs/trackers.saga';

export function* rootSaga() {
    yield all([
        loginSaga(),
        torrentsSaga(),
        getGeneralInfo(),
        getTrackersInfo(),
    ])
}