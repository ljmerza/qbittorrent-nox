import { createSelector } from 'reselect';

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
