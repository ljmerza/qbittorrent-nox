import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    path: 'torrents/add',
}

export const addTorrentSlice = createSlice({
    name: 'addTorrent',
    initialState,
    reducers: {
        addTorrent: state => state,
    }
});

export const { actions: addTorrentActions, reducer: addTorrentReducer } = addTorrentSlice;
