import { createSlice } from '@reduxjs/toolkit';

import { formatGeneralInfo } from './tools';

export const initialState = {
    isOpen: false,
    selectedTorrent: null,

    selectedTorrentGeneral: null,
    isLoadingGeneral: false,

    selectedTorrentTrackers: null,
    isLoadingTrackers: false,

    selectedTorrentFiles: null,
    isLoadingFiles: false,


    dateTimeFormat: 'MM/DD/YY LT',

    propertiesPath: 'torrents/properties',
    trackersPath: 'torrents/trackers',
}

export const torrentDetailsSlice = createSlice({
    name: 'torrentDetails',
    initialState,
    reducers: {
        selectTorrent: (state, action) => ({ ...state, isOpen: true, selectedTorrent: action.payload }),
        clearTorrent: () => ({ ...initialState }),

        getGeneralInfo: state => ({ ...state, isLoadingGeneral: true }),
        getGeneralInfoSuccess: (state, action) => ({ ...state, isLoadingGeneral: false, selectedTorrentGeneral: formatGeneralInfo(state, action.response) }),
        getGeneralInfoError: (state, action) => ({ ...state, isLoadingGeneral: false }),

        getTrackersInfo: state => ({ ...state, isLoadingTrackers: true }),
        getTrackersInfoSuccess: (state, action) => ({ ...state, isLoadingTrackers: false, selectedTorrentTrackers: action.response }),
        getTrackersInfoError: (state, action) => ({ ...state, isLoadingTrackers: false }),
    }
});

export const { actions: torrentDetailsActions, reducer: torrentDetailsReducer } = torrentDetailsSlice;
