import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    apiVersion: null,
    pathVersion: 'app/webapiVersion',

    config: null,
    loading: false,

    // config that belongs to the UI only (no backend)
    internal: {
        refreshInterval: 5000, // refresh for torrents and torrent details tabs
    },

    path: 'app/preferences'
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        getApiVersion: state => state,
        getApiVersionSuccess: (state, action) => ({ ...state, apiVersion: action.apiVersion }),

        getConfig: state => ({ ...state, loading: true }),
        getConfigSuccess: (state, action) => ({ ...state, loading: false, config: action.config }),
    }
});

export const { actions: configActions, reducer: configReducer } = configSlice;
