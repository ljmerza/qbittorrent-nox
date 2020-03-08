import { createSelector } from 'reselect';
import { 
    TORRENT_FILTER_STATES_MAP, DEFAULT_UI_STATE, UNCATEGORIZED,
    RESET_CATEGORY, ALL_CATEGORY, UNTAGGED, ALL_TAGGED, RESET_TAGGED, 
} from 'utilities/torrent-states';

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

export const getTorrents = state => state.torrents;
export const getTorrentsTorrents = createSelector(getTorrents, torrents => torrents.torrents);
export const getTorrentsRid = createSelector(getTorrents, torrents => torrents.rid);

export const getTorrentsStatesCount = createSelector(getTorrents, torrents => torrents.statesCount);
export const getStatesCount = createSelector(getTorrentsStatesCount, states => {
    return TORRENT_FILTER_STATES_MAP.map(uiState => {
        let count = states[uiState.id] || 0;
        return { id: uiState.id, name: `${uiState.name} (${count})` };
    });
});

export const getLoading = createSelector(getTorrents, torrents => torrents.loading);
export const getError = createSelector(getTorrents, torrents => torrents.error);

export const getCategories = createSelector(getTorrents, torrents => torrents.categories);
export const getCategoriesWithReset = createSelector(getCategories, categories => [RESET_CATEGORY, ...categories]);
export const getCategoriesWithNone = createSelector(getCategories, categories => [{ id: '', name: '' }, ...categories]);
export const getAllCategories = createSelector(getCategories, categories => [ALL_CATEGORY, UNCATEGORIZED, ...categories]);


export const getTorrentsCategoryCount = createSelector(getTorrents, torrents => torrents.categoryCount);
export const getCategoriesCount = createSelector(
    [getAllCategories, getTorrentsCategoryCount], 
    (categories, categoryCount) => {
        return categories.map(category => {
            let count = categoryCount[category.name] || 0;
            if (category.id === ALL_CATEGORY.id) count = categoryCount.all;
            if (category.id === UNCATEGORIZED.id) count = categoryCount[UNCATEGORIZED.id] || 0;
            return { id: category.id, name: `${category.name} (${count})` };
        });
    }
);

export const getTags = createSelector(getTorrents, torrents => torrents.tags);
export const getTagsWithReset = createSelector(getTags, tags => [RESET_TAGGED, ...tags]);

export const getTorrentsTagsCount = createSelector(getTorrents, torrents => torrents.tagsCount);
export const getTagsCount = createSelector(
    [getTags, getTorrentsTagsCount],
    (tags, tagsCount) => {
        return tags.map(tag => {
            let count = tagsCount[tag.name] || 0;
            if (tag.id === ALL_TAGGED.id) count = tagsCount.all;
            if (tag.id === UNTAGGED.id) count = tagsCount[''];
            return { id: tag.id, name: `${tag.name} (${count})` };
        });
    }
);

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

        if (selectedCategory !== ALL_CATEGORY.id) {
            filteredTorrents = filteredTorrents.filter(torrent => torrent.categoryUi === selectedCategory);
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
