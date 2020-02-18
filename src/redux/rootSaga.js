import { all } from 'redux-saga/effects';

import getApiVersion from 'containers/settings/version.saga';
import getSettings from 'containers/settings/settings.saga';
import loginSaga from 'containers/login/login.saga';
import torrentsSaga from 'containers/torrents/torrents.saga';
import addTorrentSaga from 'containers/addTorrent/addTorrent.saga';

import getGeneralInfo from 'containers/torrentDetails/tabs/general.saga';
import getTrackersInfo from 'containers/torrentDetails/tabs/trackers.saga';
import getPeersInformation from 'containers/torrentDetails/tabs/peers.saga';
import getFilesInfo from 'containers/torrentDetails/tabs/files.saga';
import { setFilePriority, setFileRename } from 'containers/torrentDetails/tabs/files';
import { trackerEditUrl, trackerAdd, trackerDelete } from 'containers/torrentDetails/tabs/trackers';

import { 
    resumeTorrent, pauseTorrent, forceTorrent, 
    checkTorrent, deleteTorrent, changeTorrentCategory, changeTorrentTags,
    moveTorrent, renameTorrent, limitDownload, limitUpload
} from 'containers/torrentDetails/tabs/general/actions';

export function* rootSaga() {
    yield all([
        getApiVersion(),
        getSettings(),
        loginSaga(),
        torrentsSaga(),
        addTorrentSaga(),

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
        changeTorrentTags(),
        moveTorrent(),
        renameTorrent(),

        limitDownload(),
        limitUpload(),

        setFilePriority(),
        setFileRename(),

        trackerEditUrl(),
        trackerAdd(),
        trackerDelete(),
    ])
}