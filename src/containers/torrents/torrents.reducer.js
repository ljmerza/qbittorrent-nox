import { createSlice } from '@reduxjs/toolkit';

import { UNCATEGORIZED, ALL_CATEGORY, UNTAGGED, ALL_TAGGED } from 'utilities/torrent-states';
import { formatTorrent, formatServerStats, sumTorrents } from 'utilities/torrent.tools';

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
        torrentsSuccess: (state, action) => {
            const { 
                torrents, categories, server_state: serverState, 
                tags, full_update: fullUpdate, ...rest 
            } = action.response;

            let formattedTorrents = Object.entries(torrents || {}).reduce((acc, [hash, torrent], idx) => {
                torrent.hash = hash;
                torrent = formatTorrent(torrent, state.torrents || [], state.dateTimeFormat);
                acc.push(torrent);
                return acc;
            }, []);

            // if was not a full update then we didn't get all torrents back
            // we need to merge the new updated torrents with the old torrents
            if (!fullUpdate) {
                formattedTorrents = state.torrents.map(torrent => {
                    const newTorrent = formattedTorrents.find(ft => ft.hash === torrent.hash);
                    return newTorrent || torrent;
                });
            }

            // if api gave categories/tags then convert them
            const formattedCategories = !categories ? state.categories : Object.values(categories).reduce((acc, category) => {
                acc.push({ id: category.name, ...category });
                return acc;
            }, [ALL_CATEGORY, UNCATEGORIZED]);

            const formattedTags = !tags ? state.tags : tags.reduce((acc, tag) => {
                acc.push({ id: tag, name: tag });
                return acc;
            }, [ALL_TAGGED, UNTAGGED]);

            // format any server stats for the UI
            const formattedServerState = formatServerStats(serverState, state.serverState);

            return { 
                ...state, 
                loading: false, 
                torrents: formattedTorrents, 
                serverState: formattedServerState, 
                categories: formattedCategories, 
                tags: formattedTags,
                fullUpdate,
                ...sumTorrents(formattedTorrents),
                ...rest
            };
        },
        torrentsError: (state, action) => ({ ...state, loading: false, error: action.error }),
    }
});



export const { actions: torrentsActions, reducer: torrentsReducer } = torrentsSlice;
