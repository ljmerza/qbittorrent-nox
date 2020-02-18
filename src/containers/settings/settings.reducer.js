import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    apiVersion: null,
    pathVersion: 'app/webapiVersion',
    loadingApiVersion: false,

    config: {},
    loading: false,

    internal: {
        refreshInterval: 1000, // needs to be 1 second or backend always sends full_update
    },

    path: 'app/preferences'
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        getApiVersion: state => ({ ...state, loadingApiVersion: true }),
        getApiVersionSuccess: (state, action) => ({ ...state, apiVersion: action.apiVersion, loadingApiVersion: false }),
        getApiVersionError: (state, action) => ({ ...state, loadingApiVersion: false }),

        getSettings: state => ({ ...state, loading: true }),
        getSettingsSuccess: (state, action) => ({ ...state, loading: false, config: action.settings }),
    }
});

export const { actions: settingsActions, reducer: settingsReducer } = settingsSlice;
