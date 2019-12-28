import { all } from 'redux-saga/effects';

import getApiVersion from '../containers/config/version.saga';
import getConfig from '../containers/config/config.saga';
import loginSaga from '../containers/login/login.saga';
import torrentsSaga from '../containers/torrents/torrents.saga';
import getGeneralInfo from '../containers/torrentDetails/tabs/general.saga';
import getTrackersInfo from '../containers/torrentDetails/tabs/trackers.saga';

export function* rootSaga() {
    yield all([
        getApiVersion(),
        getConfig(),
        loginSaga(),
        torrentsSaga(),
        getGeneralInfo(),
        getTrackersInfo(),
    ])
}