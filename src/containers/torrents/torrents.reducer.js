import { createSlice } from '@reduxjs/toolkit';

import { UNCATEGORIZED, ALL_CATEGORY, UNTAGGED, ALL_TAGGED } from 'utilities/torrent-states';
import { formatTorrent, formatServerStats } from 'utilities/torrent.tools';

export const initialState = {
    torrents: [],
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
            const { torrents, categories, server_state: serverState, tags, ...rest } = action.response;
            const categoryCount = {};
            const tagsCount = {};
            
            const formattedTorrents = Object.entries(torrents).reduce((acc, [hash, torrent], idx) => {
                torrent.hash = hash;
                const oldTorrent = state.torrents[idx] || {};
                torrent = formatTorrent(torrent, oldTorrent, state.dateTimeFormat);

                // sum up categories
                if (!categoryCount[torrent.category]) categoryCount[torrent.category] = 0;
                categoryCount[torrent.category]++;

                // sum up tags
                torrent.tagsUi.forEach(tag => {
                    if (!tagsCount[tag]) tagsCount[tag] = 0;
                    tagsCount[tag]++;
                });

                acc.push(torrent);
                return acc;
            }, []);

            categoryCount.all = formattedTorrents.length;
            tagsCount.all = formattedTorrents.length;

            // convert category objects to array with no category (Uncategorized)
            const formattedCategories = Object.values(categories).reduce((acc, category) => {
                acc.push({ id: category.name, ...category });
                return acc;
            }, [ALL_CATEGORY, UNCATEGORIZED]);

            const formattedTags = tags.reduce((acc, tag) => {
                acc.push({ id: tag, name: tag });
                return acc;
            }, [ALL_TAGGED, UNTAGGED]);

            const formattedServerState = formatServerStats(serverState);

            return { 
                ...state, 
                loading: false, 
                torrents: formattedTorrents, 
                serverState: formattedServerState, 
                categories: formattedCategories, 
                tags: formattedTags,
                categoryCount,
                tagsCount,
                ...rest
            };
        },
        torrentsError: (state, action) => ({ ...state, loading: false, error: action.error }),
    }
});

export const { actions: torrentsActions, reducer: torrentsReducer } = torrentsSlice;
