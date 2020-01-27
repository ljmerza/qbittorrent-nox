import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    torrents: [],
    statesCount: {},
    categories: [],
    categoryCount: {},
    tags: [],
    tagsCount: [],
    serverState: {},
    loading: false,
    error: '',
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
        torrentsSuccess: (state, action) => ({ ...state, loading: false, ...action.response }),
        torrentsError: (state, action) => ({ ...state, loading: false, error: action.error }),
    }
});



export const { actions: torrentsActions, reducer: torrentsReducer } = torrentsSlice;
