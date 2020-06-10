import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    torrents: [],

    statesCount: {},
    categories: [],
    categoryCount: {},
    tags: [],
    tagsCount: [],

    trackers: [],
    trackersCount: [],
    
    serverState: {},
    
    loading: false,
    error: '',

    numberOfConsecutiveErrors: 0,
    maxConsecutiveErrors: 2,
    numberOfConsecutivePartialUpdates: 0,
    maxConsecutivePartialUpdates: 2,

    path: 'sync/maindata',

    dateTimeFormat: 'MM/DD/YY LT',
    dateFormat: 'MM/DD/YY',
    timeFormat: 'LT',
}

export const torrentsSlice = createSlice({
    name: 'torrents',
    initialState,
    reducers: {
        torrents: state => ({ ...state, error: '', loading: true }),
        torrentsSuccess: (state, action) => ({ ...state, loading: false, ...action.response, numberOfConsecutiveErrors: 0 }),
        torrentsError: (state, action) => ({ ...state, loading: false, numberOfConsecutiveErrors: action.response }),
    }
});



export const { actions: torrentsActions, reducer: torrentsReducer } = torrentsSlice;
