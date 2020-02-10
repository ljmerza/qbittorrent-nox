import { prettySize, prettySizeTime } from './pretty-sizes';

import { mapTorrentState, computeStates, UNCATEGORIZED } from './torrent-states';
import { computedDateTime, computeTimeLeft, computePercentDone } from './formatters';

/**
 * format torrent values for UI - only update 
 * certain values if the raw value has changed
 * @param {Object} torrent 
 * @param {Object[]} stateTorrents
 * @param {String} dateTimeFormat 
 */
export const formatTorrent = (torrent, stateTorrents, dateTimeFormat) => {
    // find if we already have the torrent so we can update it
    const newTorrent = { ...(stateTorrents.find(st => st.hash === torrent.hash) || {}) };
 
    Object.entries(torrent || {}).forEach(([key, value]) => {

        switch(key){
            case 'size': 
                newTorrent.sizeUi = (newTorrent.size === torrent.size) ? newTorrent.sizeUi : prettySize(torrent.size);
                break;
            case 'downloaded': 
                newTorrent.downloadedUi = (newTorrent.downloaded === torrent.downloaded) ? newTorrent.downloadedUi : prettySize(torrent.downloaded);
                break;
            case 'completed':
                newTorrent.completedUi = (newTorrent.completed === torrent.completed) ? newTorrent.completedUi : prettySize(torrent.completed);
                break;
            case 'total_size':
                newTorrent.totalSizeUi = (newTorrent.total_size === torrent.total_size) ? newTorrent.totalSizeUi : prettySize(torrent.total_size);
                break;
            case 'uploaded':
                newTorrent.uploadedUi = (newTorrent.uploaded === torrent.uploaded) ? newTorrent.uploadedUi : prettySize(torrent.uploaded);
                break;
            case 'amount_left':
                newTorrent.amountLeftUi = (newTorrent.amount_left === torrent.amount_left) ? newTorrent.amountLeftUi : prettySize(torrent.amount_left);
                break;
            case 'added_on':
                newTorrent.addedOnUi = (newTorrent.added_on === torrent.added_on) ? newTorrent.addedOnUi : computedDateTime(torrent.added_on, dateTimeFormat);
                break;
            case 'eta':
                newTorrent.etaUi = (newTorrent.eta === torrent.eta) ? newTorrent.etaUi : computeTimeLeft(torrent.eta);
                break;
            case 'completion_on':
                newTorrent.completedOnUi = (newTorrent.completion_on === torrent.completion_on) ? newTorrent.completedOnUi : computedDateTime(torrent.completion_on, dateTimeFormat);
                break;
            case 'seen_complete':
                newTorrent.seenCompleteUi = (newTorrent.seen_complete === torrent.seen_complete) ? newTorrent.seenCompleteUi : computedDateTime(torrent.seen_complete, dateTimeFormat);
                break;
            case 'time_active':
                newTorrent.timeActiveUi = (newTorrent.time_active === torrent.time_active) ? newTorrent.timeActiveUi : computedDateTime(torrent.time_active, dateTimeFormat);
                break;
            case 'state':
                newTorrent.stateUi = (newTorrent.state === torrent.state) ? newTorrent.stateUi : mapTorrentState(torrent.state);
                const dlspeed = 'dlspeed' in torrent ? torrent.dlspeed : newTorrent.dlspeed;
                const upspeed = 'upspeed' in torrent ? torrent.upspeed : newTorrent.upspeed;
                const progress = 'progress' in torrent ? torrent.progress : newTorrent.progress;
                const state = 'state' in torrent ? torrent.state : newTorrent.state;
                newTorrent.states = computeStates({dlspeed, upspeed, progress, state});
                break;
            case 'progress':
                newTorrent.percentDone = (newTorrent.progress === torrent.progress) ? newTorrent.percentDone : computePercentDone(torrent.progress);
                newTorrent.isDone = torrent.progress === 1;
                break;
            case 'category':
                newTorrent.categoryUi = torrent.category || UNCATEGORIZED.id;
                break;
            case 'dlspeed':
                newTorrent.dlspeedUi = (newTorrent.dlspeed === torrent.dlspeed) ? newTorrent.dlspeedUi : prettySizeTime(torrent.dlspeed);
                break;
            case 'upspeed':
                newTorrent.upspeedUi = (newTorrent.upspeed === torrent.upspeed) ? newTorrent.upspeedUi : prettySizeTime(torrent.upspeed);
                break;
            case 'tags':
                newTorrent.tagsUi = torrent.tags.split(',').map(tag => tag.trim());
                break;
            default:
                break;
        }

        // copy new value over to old AFTER we compare for new value in switch statements
        newTorrent[key] = value;
    });

    return newTorrent;
};

export const formatServerStats = (serverState, oldServerState) => {
    const newServerState = oldServerState ? { ...oldServerState } : {};

    Object.entries(serverState || {}).forEach(([key, value]) => {

        switch (key) {
            case 'dl_info_data':
                newServerState.dlTotal = (newServerState.time_active === serverState.time_active) ? newServerState.timeActiveUi : prettySize(serverState.dl_info_data);
                break;
            case 'dl_info_speed':
                newServerState.dlSpeed = (newServerState.dl_info_speed === serverState.dl_info_speed) ? newServerState.dlSpeed : prettySizeTime(serverState.dl_info_speed);;
                break;
            case 'dl_rate_limit':
                newServerState.dlLimit = (newServerState.dl_rate_limit === serverState.dl_rate_limit) ? newServerState.dlLimit : prettySizeTime(serverState.dl_rate_limit);;
                break;
            case 'up_info_data':
                newServerState.upTotal = (newServerState.up_info_data === serverState.up_info_data) ? newServerState.upTotal : prettySize(serverState.up_info_data);;
                break;
            case 'up_info_speed':
                newServerState.upSpeed = (newServerState.up_info_speed === serverState.up_info_speed) ? newServerState.upSpeed : prettySizeTime(serverState.up_info_speed);;
                break;
            case 'up_rate_limit':
                newServerState.upLimit = (newServerState.up_rate_limit === serverState.up_rate_limit) ? newServerState.upLimit : prettySizeTime(serverState.up_rate_limit);;
                break;
            default:
                break;
        }

        // copy new value over to old AFTER we compare for new value in switch statements
        newServerState[key] = value;
    });

    return newServerState;
}

export const generateSortFunction = (selectedSort, isSortDescending) => {
    const first = isSortDescending ? 1 : -1;
    const second = first * -1;

    return (a, b) => {
        let aVal = a[selectedSort];
        let bVal = b[selectedSort];

        // if strings then compare by lower cased values
        if (aVal && aVal.toLowerCase) aVal = aVal.toLowerCase();
        if (bVal && bVal.toLowerCase) bVal = bVal.toLowerCase();

        return (aVal > bVal) ? first : second;
    }
}

/**
 * sum the states, categories, and tags
 * @param {Object[]} formattedTorrents 
 */
export function sumTorrents(formattedTorrents) {
    const categoryCount = {};
    const tagsCount = {};
    const statesCount = {};

    // now that we havev complete list - sum up what we need
    formattedTorrents.forEach(torrent => {
        // sum up categories
        if (!categoryCount[torrent.categoryUi]) categoryCount[torrent.categoryUi] = 0;
        categoryCount[torrent.categoryUi]++;

        // sum up tags
        torrent.tagsUi.forEach(tag => {
            if (!tagsCount[tag]) tagsCount[tag] = 0;
            tagsCount[tag]++;
        });

        // sum up states
        torrent.states.forEach(state => {
            if (!statesCount[state]) statesCount[state] = 0;
            statesCount[state]++;
        });
    });

    categoryCount.all = formattedTorrents.length;
    tagsCount.all = formattedTorrents.length;
    statesCount.all = formattedTorrents.length;

    return { categoryCount, tagsCount, statesCount };
}

export const getTorrentHashes = torrents => {
    return Array.isArray(torrents) ? torrents.map(torrent => torrent.hash).join('|') : torrents.hash;
}