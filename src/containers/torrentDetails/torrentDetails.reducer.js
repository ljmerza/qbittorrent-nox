import { createSlice } from '@reduxjs/toolkit';

import { formatGeneralInfo } from './tools';
import { prettySize, prettySizeTime } from 'utilities/pretty-sizes';
import { computePercentDone } from 'utilities/formatters';

const TRACKER_STATUS_MAP = {
    0: 'Tracker is disabled',
    1: 'Tracker has not been contacted yet',
    2: 'Tracker has been contacted and is working',
    3: 'Tracker is updating',
    4: 'Tracker has been contacted, but it is not working',
};

export const FILE_PRIORITY_UI = [
    { id: 0, name: 'Do Not Download' },
    { id: 1, name: 'Normal' },
    { id: 6, name: 'High' },
    { id: 7, name: 'Maximal' },
];

export const initialState = {
    isOpen: false,
    selectedTorrent: null,

    selectedTorrentGeneral: null,
    isLoadingGeneral: false,

    selectedTorrentTrackers: [],
    isLoadingTrackers: false,

    selectedTorrentPeers: [],
    isLoadingPeers: false,

    selectedTorrentFiles: [],
    isLoadingFiles: false,

    dateTimeFormat: 'MM/DD/YY LT',

    propertiesPath: 'torrents/properties',
    trackersPath: 'torrents/trackers',
    peersPath: 'sync/torrentPeers',
    filesPath: 'torrents/files',

    resumePath: 'torrents/resume',
    pausePath: 'torrents/pause',
    forceResumePath: 'torrents/setForceStart',
    recheckPath: 'torrents/recheck',
    deletePath: 'torrents/delete',

    setCategory: 'torrents/setCategory',
    changePriorityPath: 'torrents/filePrio',
    fileRenamePath: 'torrents/renameFile',
}

export const torrentDetailsSlice = createSlice({
    name: 'torrentDetails',
    initialState,
    reducers: {
        selectTorrent: (state, action) => ({ ...state, isOpen: true, selectedTorrent: action.payload }),
        clearTorrent: () => ({ ...initialState }),

        getGeneralInfo: state => ({ ...state, isLoadingGeneral: true }),
        getGeneralInfoSuccess: (state, action) => ({ ...state, isLoadingGeneral: false, selectedTorrentGeneral: formatGeneralInfo(state, action.response) }),

        getTrackersInfo: state => ({ ...state, isLoadingTrackers: true }),
        getTrackersInfoSuccess: (state, action) => {

            const selectedTorrentTrackers = action.response.map(tracker => {
                tracker.statusUi = TRACKER_STATUS_MAP[tracker.status] || '';
                return tracker;
            })
            return { ...state, isLoadingTrackers: false, selectedTorrentTrackers };
        },

        getPeersInfo: state => ({ ...state, isLoadingPeers: true }),
        getPeersInfoSuccess: (state, action) => {

            const formattedPeers = Object.values((action.response.peers || {})).reduce((acc, peer, idx) => {
                const oldPeer = state.selectedTorrentPeers[idx] || {};

                peer.dlspeedUi = (oldPeer.dlspeed === peer.dl_speed) ? oldPeer.dlspeedUi : prettySizeTime(peer.dl_speed);
                peer.upspeedUi = (oldPeer.dlspeed === peer.up_speed) ? oldPeer.upspeedUi : prettySizeTime(peer.up_speed);

                peer.downloadedUi = (oldPeer.downloaded === peer.downloaded) ? oldPeer.downloadedUi : prettySizeTime(peer.downloaded);
                peer.uploadedUi = (oldPeer.uploaded === peer.uploaded) ? oldPeer.uploadedUi : prettySizeTime(peer.uploaded);

                peer.progressUi = computePercentDone(peer.progress);
                peer.relevanceUi = computePercentDone(peer.relevance);

                acc.push(peer);
                return acc;
            }, []);

            return { ...state, isLoadingPeers: false, selectedTorrentPeers: formattedPeers };
        },

        getFilesInfo: state => ({ ...state, isLoadingFiles: true }),
        getFilesInfoSuccess: (state, action) => {
            const selectedTorrentFiles = action.response.map((file, idx) => {
                const oldFile = state.selectedTorrentFiles[idx] || {};

                file.sizeUi = (oldFile.size === file.size) ? oldFile.sizeUi : prettySize(file.size);
                file.progressUi = computePercentDone(file.progress);
                file.availabilityUi = computePercentDone(file.availability);

                return file;
            });

            return { ...state, isLoadingPeers: false, selectedTorrentFiles };
        },

        resumeSelectedTorrent: state => state,
        pauseSelectedTorrent: state => state,
        forceResumeSelectedTorrent: state => state,
        checkSelectedTorrent: state => state,
        deleteSelectedTorrent: state => state,
        changeTorrentCategory: state => state,

        setFilePriority: state => state,
        setFileName: state => state,
    }
});

export const { actions: torrentDetailsActions, reducer: torrentDetailsReducer } = torrentDetailsSlice;
