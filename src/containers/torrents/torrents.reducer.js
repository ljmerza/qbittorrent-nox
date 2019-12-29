import { createSlice } from '@reduxjs/toolkit';

import { UNCATEGORIZED, ALL_CATEGORY, UNTAGGED } from 'utilities/torrent-states';
import { formatTorrent, formatServerStats } from 'utilities/torrent.tools';

export const initialState = {
    torrents: [],
    categories: [],
    tags: [],
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
        torrentsSuccess: (state, action) => {
            const { torrents, categories, server_state: serverState, tags, ...rest } = action.response;
            
            const formattedTorrents = Object.entries(torrents).reduce((acc, [hash, torrent], idx) => {
                const oldTorrent = state.torrents[idx] || {};

                torrent.hash = hash;
                torrent = formatTorrent(torrent, oldTorrent, state.dateTimeFormat);
                acc.push(torrent);
                return acc;
            }, []);

            // convert category objects to array with no category (Uncategorized)
            const formattedCategories = Object.values(categories).reduce((acc, category) => {
                acc.push({ id: category.name, ...category });
                return acc;
            }, [ALL_CATEGORY, UNCATEGORIZED]);

            const formattedTags = tags.reduce((acc, tag) => {
                acc.push({ id: tag, name: tag });
                return acc;
            }, [UNTAGGED]);

            const formattedServerState = formatServerStats(serverState);

            return { 
                ...state, 
                loading: false, 
                torrents: formattedTorrents, 
                serverState: formattedServerState, 
                categories: formattedCategories, 
                tags: formattedTags,
                ...rest
            };
        },
        torrentsError: (state, action) => ({ ...state, loading: false, error: action.error }),
    }
});

export const { actions: torrentsActions, reducer: torrentsReducer } = torrentsSlice;
