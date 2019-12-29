import { prettySize, prettySizeTime } from './pretty-sizes';

import { mapTorrentState, computeStates, UNCATEGORIZED } from './torrent-states';
import { computedDateTime, computeTimeLeft, computePercentDone } from './formatters';

/**
 * format torrent values for UI - only update 
 * certain values if the raw value has changed
 * @param {Object} torrent 
 * @param {Object} oldTorrent 
 * @param {String} dateTimeFormat 
 */
export const formatTorrent = (torrent, oldTorrent, dateTimeFormat) => {

    // format sizes
    torrent.sizeUi = (oldTorrent.size === torrent.size) ? oldTorrent.sizeUi : prettySize(torrent.size);
    torrent.downloadedUi = (oldTorrent.downloaded === torrent.downloaded) ? oldTorrent.downloadedUi : prettySize(torrent.downloaded);
    torrent.completedUi = (oldTorrent.completed === torrent.completed) ? oldTorrent.completedUi : prettySize(torrent.completed);
    torrent.totalSizeUi = (oldTorrent.total_size === torrent.total_size) ? oldTorrent.totalSizeUi : prettySize(torrent.total_size);
    torrent.uploadedUi = (oldTorrent.uploaded === torrent.uploaded) ? oldTorrent.uploadedUi : prettySize(torrent.uploaded);
    torrent.amountLeftUi = (oldTorrent.amount_left === torrent.amount_left) ? oldTorrent.amountLeftUi : prettySize(torrent.amount_left);

    // format date times
    torrent.addedOnUi = (oldTorrent.added_on === torrent.added_on) ? oldTorrent.addedOnUi : computedDateTime(torrent.added_on, dateTimeFormat);
    torrent.etaUi = (oldTorrent.eta === torrent.eta) ? oldTorrent.etaUi : computeTimeLeft(torrent.eta);
    torrent.completedOnUi = (oldTorrent.completion_on === torrent.completion_on) ? oldTorrent.completedOnUi : computedDateTime(torrent.completion_on, dateTimeFormat);
    torrent.seenCompleteUi = (oldTorrent.seen_complete === torrent.seen_complete) ? oldTorrent.seenCompleteUi : computedDateTime(torrent.seen_complete, dateTimeFormat);
    torrent.timeActiveUi = (oldTorrent.time_active === torrent.time_active) ? oldTorrent.timeActiveUi : computedDateTime(torrent.time_active, dateTimeFormat);

    // get some extra formatted data
    torrent.stateUi = (oldTorrent.state === torrent.state) ? oldTorrent.stateUi :  mapTorrentState(torrent.state);
    torrent.percentDone = computePercentDone(torrent.progress);
    torrent.isDone = torrent.progress === 1;
    torrent.states = computeStates(torrent);
    torrent.category = torrent.category || UNCATEGORIZED.id;

    // format speeds and get total speeds
    torrent.dlspeedUi = (oldTorrent.dlspeed === torrent.dlspeed) ? oldTorrent.dlspeedUi : prettySizeTime(torrent.dlspeed);
    torrent.upspeedUi = (oldTorrent.upspeed === torrent.upspeed) ? oldTorrent.upspeedUi : prettySizeTime(torrent.upspeed);

    return torrent;
};

export const formatServerStats = serverState => {
    if (serverState._formatted) return serverState;
    serverState = { ...serverState };

    serverState.dlTotal = prettySize(serverState.dl_info_data);
    serverState.dlSpeed = prettySizeTime(serverState.dl_info_speed);
    serverState.dlLimit = prettySizeTime(serverState.dl_rate_limit);
    
    serverState.upTotal = prettySize(serverState.up_info_data);
    serverState.upSpeed = prettySizeTime(serverState.up_info_speed);
    serverState.upLimit = prettySizeTime(serverState.up_rate_limit);

    serverState._formatted = true;
    return serverState;
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