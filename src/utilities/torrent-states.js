
/**
 * extra uncategorized category
 */
export const ALL_CATEGORY = { id: '', name: 'All', uneditable: true };
export const UNCATEGORIZED = { id: 'uncategorized', name: 'Uncategorized', uneditable: true };
export const UNTAGGED = { id: '', name: 'Untagged', uneditable: true };

export const DEFAULT_UI_STATE = 'all';
export const DEFAULT_UI_CATEGORY = ALL_CATEGORY.id;
export const DEFAULT_UI_TAG = UNTAGGED.id;
export const DEFAULT_UI_SORT = 'name';

/**
 * map of raw states from api (and custom UI ones)
 */
const TORRENT_STATES_MAP = {
    uploading: 'uploading',
    seeding: 'stalledUP',
    stalled: 'stalledDL',
    pausedDL: 'pausedDL',
    missingFiles: 'missingFiles',
    downloading: 'downloading',
    metaDownloading: 'metaDL',

    completed: 'completed',
    all: 'all',
    resumed: 'resumed',
    active: 'active',
    inactive: 'inactive',
    errored: 'errored',
};

export const TORRENT_FILTER_SORT_MAP = [
    { id: 'name', label: 'Name' },
    { id: 'state', label: 'State' },
    { id: 'progress', label: 'Progress' },
    { id: 'dlspeed', label: 'Download Speed' },
    { id: 'upspeed', label: 'Upload Speed' },
    { id: 'size', label: 'Total Size' },
    { id: 'ratio', label: 'Ratio' },
    { id: 'added_on', label: 'Date Added' },
    { id: 'amount_left', label: 'ETA' },
];

/**
 * map of UI states to show on filter sidebar
 */
export const TORRENT_FILTER_STATES_MAP = [
    { id: TORRENT_STATES_MAP.all, label: 'All' },
    { id: TORRENT_STATES_MAP.downloading, label: 'Downloading' },
    { id: TORRENT_STATES_MAP.seeding, label: 'Seeding' },
    { id: TORRENT_STATES_MAP.completed, label: 'Completed' },
    { id: TORRENT_STATES_MAP.resumed, label: 'Resumed' },
    { id: TORRENT_STATES_MAP.pausedDL, label: 'Paused' },
    { id: TORRENT_STATES_MAP.active, label: 'Active' },
    { id: TORRENT_STATES_MAP.inactive, label: 'Inactive' },
    { id: TORRENT_STATES_MAP.errored, label: 'Errored' },
];

/**
 * map raw states to UI readable states
 */
const UI_STATE_MAP = {
    [TORRENT_STATES_MAP.downloading]: 'Downloading',
    [TORRENT_STATES_MAP.uploading]: 'Uploading',
    [TORRENT_STATES_MAP.seeding]: 'Seeding',
    [TORRENT_STATES_MAP.pausedDL]: 'Paused',
    [TORRENT_STATES_MAP.stalled]: 'Stalled',
    [TORRENT_STATES_MAP.missingFiles]: 'Missing Files',
    [TORRENT_STATES_MAP.metaDownloading]: 'Meta DL',
};

const DOWNLOADING_STATES = [
    TORRENT_STATES_MAP.downloading,
    TORRENT_STATES_MAP.metaDownloading,
    TORRENT_STATES_MAP.stalled,
];

const SEEDING_STATES = [
    TORRENT_STATES_MAP.seeding,
    TORRENT_STATES_MAP.uploading,
];

const ERROR_STATES = [
    TORRENT_STATES_MAP.missingFiles,
];

const PAUSED_STATES = [
    TORRENT_STATES_MAP.paused,
];

export const mapTorrentState = state => UI_STATE_MAP[state] || state;

/**
 * computes all UI filter states a torrent can be a part of
 */
export const computeStates = torrent => {
    const states = [];

    const hasSpeed = !!(torrent.dlspeed || torrent.upspeed);
    const isCompleted = torrent.progress === 1;

    if (DOWNLOADING_STATES.includes(torrent.state))
        states.push(TORRENT_STATES_MAP.downloading);

    if (SEEDING_STATES.includes(torrent.state) && hasSpeed)
        states.push(TORRENT_STATES_MAP.seeding);

    if (isCompleted)
        states.push(TORRENT_STATES_MAP.completed);

    if (!PAUSED_STATES.includes(torrent.state))
        states.push(TORRENT_STATES_MAP.resumed);

    if (PAUSED_STATES.includes(torrent.state))
        states.push(TORRENT_STATES_MAP.paused);

    if (hasSpeed)
        states.push(TORRENT_STATES_MAP.active);

    if (!hasSpeed)
        states.push(TORRENT_STATES_MAP.inactive);

    if (ERROR_STATES.includes(torrent.state))
        states.push(TORRENT_STATES_MAP.error);

    return states;
}
