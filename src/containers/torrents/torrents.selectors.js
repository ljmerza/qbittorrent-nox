import { createSelector } from 'reselect';

import {
    getSelectedState,
    getSelectedCategory,
    getSelectedTag,
    getSelectedSort,
    getIsSortDescending,
    getSearch,
    getSearchBy,
 } from '../filters/filters.selectors'

import { generateSortFunction } from 'utilities/torrent.tools';
import { DEFAULT_UI_STATE, UNTAGGED } from 'utilities/torrent-states';

export const getTorrents = state => state.torrents;

export const getTorrentsTorrents = createSelector(getTorrents, torrents => torrents.torrents);
export const getTorrentsCount = createSelector(getTorrents, torrents => torrents.count);

export const getLoading = createSelector(getTorrents, torrents => torrents.loading);
export const getError = createSelector(getTorrents, torrents => torrents.error);

export const getCategories = createSelector(getTorrents, torrents => torrents.categories);
export const getCategoriesCount = createSelector(
    [getCategories, getTorrentsCount], 
    (categories, counts) => {
        return categories.map(category => {
            const categoryCount = counts[category.name] || 0;
            return { id: category.id, name: `${category.name} (${categoryCount})` };
        });
    });

export const getTags = createSelector(getTorrents, torrents => torrents.tags);

export const getDateTimeFormat = createSelector(getTorrents, torrents => torrents.dateTimeFormat);
export const getDateFormat = createSelector(getTorrents, torrents => torrents.dateFormat);
export const getTimeFormat = createSelector(getTorrents, torrents => torrents.timeFormat);

export const getServerState = createSelector(getTorrents, torrents => torrents.serverState);
export const getServerStateDown = createSelector(getServerState, torrents => torrents.dlSpeed || '');
export const getServerStateUp = createSelector(getServerState, torrents => torrents.upSpeed || '');

export const getFilteredTorrents = createSelector(
    [
        getTorrentsTorrents, 
        getSelectedState,
        getSelectedCategory,
        getSelectedTag,
        getSelectedSort,
        getIsSortDescending,
        getSearch,
        getSearchBy,
    ],
    (torrents, selectedState, selectedCategory, selectedTag, selectedSort, isSortDescending, search, searchBy) => {
        if (!torrents) return [];
        let filteredTorrents = [...torrents];

        if (selectedState !== DEFAULT_UI_STATE) {
            filteredTorrents = filteredTorrents.filter(torrent => torrent.states.includes(selectedState));
        }

        if (selectedCategory) {
            filteredTorrents = filteredTorrents.filter(torrent => torrent.category === selectedCategory);
        }

        if (selectedTag) {
            const wantAllUntagged = selectedTag === UNTAGGED.id;
            filteredTorrents = filteredTorrents.filter(torrent => {
                if (wantAllUntagged) return torrent.tags === '';
                return torrent.tags.includes(selectedTag);
            });
        }

        if (search){
            filteredTorrents = filteredTorrents.filter(torrent => {
                const torrentSearch = `${(torrent[searchBy] || '')}`.toLowerCase();
                return torrentSearch.includes(search);
            });
        }

        const sortFunction = generateSortFunction(selectedSort, isSortDescending);
        filteredTorrents.sort(sortFunction);
        return filteredTorrents;
    }
);
