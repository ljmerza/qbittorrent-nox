import { prettySize, prettySizeTime } from './pretty-sizes';

import { mapTorrentState, computeStates, UNCATEGORIZED } from './torrent-states';
import { computedDateTime, computeTimeLeft, computePercentDone } from './formatters';

/**
 * format torrent values for UI - only update 
 * certain values if the raw value has changed
 * @param {Object} torrent 
 * @param {Object[]} stateTorrent
 * @param {String} dateTimeFormat 
 */
export const formatTorrent = (newTorrent, stateTorrent, dateTimeFormat) => {
   
    Object.entries(newTorrent || {}).forEach(([key, value]) => {

        switch (key) {
            case 'size':
                stateTorrent.sizeUi = (stateTorrent.size === newTorrent.size) ? stateTorrent.sizeUi : prettySize(newTorrent.size);
                break;
            case 'downloaded':
                stateTorrent.downloadedUi = (stateTorrent.downloaded === newTorrent.downloaded) ? stateTorrent.downloadedUi : prettySize(newTorrent.downloaded);
                break;
            case 'completed':
                stateTorrent.completedUi = (stateTorrent.completed === newTorrent.completed) ? stateTorrent.completedUi : prettySize(newTorrent.completed);
                break;
            case 'total_size':
                stateTorrent.totalSizeUi = (stateTorrent.total_size === newTorrent.total_size) ? stateTorrent.totalSizeUi : prettySize(newTorrent.total_size);
                break;
            case 'uploaded':
                stateTorrent.uploadedUi = (stateTorrent.uploaded === newTorrent.uploaded) ? stateTorrent.uploadedUi : prettySize(newTorrent.uploaded);
                break;
            case 'amount_left':
                stateTorrent.amountLeftUi = (stateTorrent.amount_left === newTorrent.amount_left) ? stateTorrent.amountLeftUi : prettySize(newTorrent.amount_left);
                break;
            case 'added_on':
                stateTorrent.addedOnUi = (stateTorrent.added_on === newTorrent.added_on) ? stateTorrent.addedOnUi : computedDateTime(newTorrent.added_on, dateTimeFormat);
                break;
            case 'eta':
                stateTorrent.etaUi = (stateTorrent.eta === newTorrent.eta) ? stateTorrent.etaUi : computeTimeLeft(newTorrent.eta);
                break;
            case 'completion_on':
                stateTorrent.completedOnUi = (stateTorrent.completion_on === newTorrent.completion_on) ? stateTorrent.completedOnUi : computedDateTime(newTorrent.completion_on, dateTimeFormat);
                break;
            case 'seen_complete':
                stateTorrent.seenCompleteUi = (stateTorrent.seen_complete === newTorrent.seen_complete) ? stateTorrent.seenCompleteUi : computedDateTime(newTorrent.seen_complete, dateTimeFormat);
                break;
            case 'time_active':
                stateTorrent.timeActiveUi = (stateTorrent.time_active === newTorrent.time_active) ? stateTorrent.timeActiveUi : computedDateTime(newTorrent.time_active, dateTimeFormat);
                break;
            case 'state':
                stateTorrent.stateUi = (stateTorrent.state === newTorrent.state) ? stateTorrent.stateUi : mapTorrentState(newTorrent.state);
                const dlspeed = 'dlspeed' in newTorrent ? newTorrent.dlspeed : stateTorrent.dlspeed;
                const upspeed = 'upspeed' in newTorrent ? newTorrent.upspeed : stateTorrent.upspeed;
                const progress = 'progress' in newTorrent ? newTorrent.progress : stateTorrent.progress;
                const state = 'state' in newTorrent ? newTorrent.state : stateTorrent.state;
                stateTorrent.states = computeStates({ dlspeed, upspeed, progress, state });
                break;
            case 'progress':
                stateTorrent.percentDone = (stateTorrent.progress === newTorrent.progress) ? stateTorrent.percentDone : computePercentDone(newTorrent.progress);
                stateTorrent.isDone = newTorrent.progress === 1;
                break;
            case 'category':
                stateTorrent.categoryUi = newTorrent.category || UNCATEGORIZED.id;
                break;
            case 'dlspeed':
                stateTorrent.dlspeedUi = (stateTorrent.dlspeed === newTorrent.dlspeed) ? stateTorrent.dlspeedUi : prettySizeTime(newTorrent.dlspeed);
                break;
            case 'upspeed':
                stateTorrent.upspeedUi = (stateTorrent.upspeed === newTorrent.upspeed) ? stateTorrent.upspeedUi : prettySizeTime(newTorrent.upspeed);
                break;
            case 'tags':
                stateTorrent.tagsUi = newTorrent.tags.split(',').map(tag => tag.trim());
                break;
            default:
                break;
        }

        // copy new value over to old AFTER we compare for new value in switch statements
        stateTorrent[key] = value;
    });

    return stateTorrent;
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