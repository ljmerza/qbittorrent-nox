import { createSelector } from 'reselect';

import {
    getSelectedState,
    getSelectedCategory,
    getSelectedTag,
    getSelectedSort,
    getIsSortDescending,
 } from '../filters/filters.selectors'

import { generateSortFunction } from '../../utilities/torrent.tools';
import { DEFAULT_UI_STATE } from '../../utilities/torrent-states';

export const getTorrents = state => state.torrents;

export const getTorrentsTorrents = createSelector(getTorrents, torrents => torrents.torrents);
export const getLoading = createSelector(getTorrents, torrents => torrents.loading);
export const getError = createSelector(getTorrents, torrents => torrents.error);

export const getCategories = createSelector(getTorrents, torrents => torrents.categories);
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
    ],
    (torrents, selectedState, selectedCategory, selectedTag, selectedSort, isSortDescending) => {
        if (!torrents) return [];
        let filteredTorrents = [...torrents];

        if (selectedState !== DEFAULT_UI_STATE) {
            filteredTorrents = filteredTorrents.filter(torrent => torrent.states.includes(selectedState));
        }

        if (selectedCategory) {
            filteredTorrents = filteredTorrents.filter(torrent => torrent.category === selectedCategory);
        }

        if (selectedTag) {
            filteredTorrents = filteredTorrents.filter(torrent => torrent.tags.includes(selectedTag));
        }

        const sortFunction = generateSortFunction(selectedSort, isSortDescending);
        filteredTorrents.sort(sortFunction);
        return filteredTorrents;
    }
);
