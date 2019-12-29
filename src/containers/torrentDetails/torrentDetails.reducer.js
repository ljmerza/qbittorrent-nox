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

const FILE_PRIORITY_MAP = {
    0: 'Do not download',
    1: 'Normal priority',
    2: 'Normal priority',
    3: 'Normal priority',
    4: 'Normal priority',
    6: 'High priority',
    7: 'Maximal priority',
};

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
                file.priorityUi = FILE_PRIORITY_MAP[file.priority] || '';

                return file;
            });

            return { ...state, isLoadingPeers: false, selectedTorrentFiles };
        },
    }
});

export const { actions: torrentDetailsActions, reducer: torrentDetailsReducer } = torrentDetailsSlice;
