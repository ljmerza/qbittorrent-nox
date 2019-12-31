import { all } from 'redux-saga/effects';

import getApiVersion from 'containers/config/version.saga';
import getConfig from 'containers/config/config.saga';
import loginSaga from 'containers/login/login.saga';
import torrentsSaga from 'containers/torrents/torrents.saga';

import getGeneralInfo from 'containers/torrentDetails/tabs/general.saga';
import getTrackersInfo from 'containers/torrentDetails/tabs/trackers.saga';
import getPeersInformation from 'containers/torrentDetails/tabs/peers.saga';
import getFilesInfo from 'containers/torrentDetails/tabs/files.saga';
import { setFilePriority, setFileRename } from 'containers/torrentDetails/tabs/files';
import { trackerEditUrl, trackerAdd, trackerDelete } from 'containers/torrentDetails/tabs/trackers';

import { 
    resumeTorrent, pauseTorrent, forceTorrent, 
    checkTorrent, deleteTorrent, changeTorrentCategory 
} from 'containers/torrentDetails/tabs/general/actions';

export function* rootSaga() {
    yield all([
        getApiVersion(),
        getConfig(),
        loginSaga(),
        
        torrentsSaga(),

        getGeneralInfo(),
        getTrackersInfo(),
        getPeersInformation(),
        getFilesInfo(),

        resumeTorrent(),
        pauseTorrent(),
        forceTorrent(),
        checkTorrent(),
        deleteTorrent(),
        
        changeTorrentCategory(),
        setFilePriority(),
        setFileRename(),

        trackerEditUrl(),
        trackerAdd(),
        trackerDelete(),
    ])
}