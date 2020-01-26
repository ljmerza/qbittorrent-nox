import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    apiVersion: null,
    pathVersion: 'app/webapiVersion',

    config: null,
    loading: false,

    internal: {
        refreshInterval: 1000, // needs to be 1 second or backend always sends full_update
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
