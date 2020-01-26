import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ReplayIcon from '@material-ui/icons/Replay';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

/**
 * extra uncategorized category
 */
export const ALL_CATEGORY = { id: '', name: 'All', uneditable: true };
export const UNCATEGORIZED = { id: 'uncategorized', name: 'Uncategorized', uneditable: true };
export const RESET_CATEGORY = { id: '', name: 'Reset Category', uneditable: true };

export const ALL_TAGGED = { id: '', name: 'All', uneditable: true };
export const UNTAGGED = { id: 'untagged', name: 'Untagged', uneditable: true };
export const RESET_TAGGED = { id: 'RESET_TAGGED', name: 'Reset Tags', uneditable: true };

export const DEFAULT_UI_STATE = 'all';
export const DEFAULT_UI_CATEGORY = ALL_CATEGORY.id;
export const DEFAULT_UI_TAG = '';
export const DEFAULT_UI_SORT = 'name';

/**
 * map of raw states from api (and custom UI ones)
 */
export const TORRENT_STATES_MAP = {
    uploading: 'uploading',
    seeding: 'stalledUP',
    stalled: 'stalledDL',
    pausedDL: 'pausedDL',
    pausedUP: 'pausedUP',
    forcedDL: 'forcedDL',
    forcedUP: 'forcedUP',
    missingFiles: 'missingFiles',
    downloading: 'downloading',
    metaDownloading: 'metaDL',

    // unseen states as of yet
    error: 'error',
    queuedUP: 'queuedUP',
    checkingUP: 'checkingUP',
    allocating: 'allocating',
    queuedDL: 'queuedDL',
    checkingDL: 'checkingDL',
    checkingResumeData: 'checkingResumeData',
    moving: 'moving',
    unknown: 'unknown',

    // custom UI states
    completed: 'completed',
    all: 'all',
    paused: 'paused',
    resumed: 'resumed',
    active: 'active',
    inactive: 'inactive',
    checking: 'checking',
};

/**
 * sorting options
 */
export const TORRENT_FILTER_SORT_MAP = [
    { id: 'name', name: 'Name' },
    { id: 'state', name: 'State' },
    { id: 'progress', name: 'Progress' },
    { id: 'dlspeed', name: 'Download Speed' },
    { id: 'upspeed', name: 'Upload Speed' },
    { id: 'size', name: 'Total Size' },
    { id: 'ratio', name: 'Ratio' },
    { id: 'added_on', name: 'Date Added' },
    { id: 'amount_left', name: 'ETA' },
];

/**
 * map of UI states to show on filter sidebar
 */
export const TORRENT_FILTER_STATES_MAP = [
    { id: TORRENT_STATES_MAP.all, name: 'All' },
    { id: TORRENT_STATES_MAP.downloading, name: 'Downloading' },
    { id: TORRENT_STATES_MAP.seeding, name: 'Seeding' },
    { id: TORRENT_STATES_MAP.completed, name: 'Completed' },
    { id: TORRENT_STATES_MAP.resumed, name: 'Resumed' },

    { id: TORRENT_STATES_MAP.paused, name: 'Paused' },
    { id: TORRENT_STATES_MAP.active, name: 'Active' },
    { id: TORRENT_STATES_MAP.inactive, name: 'Inactive' },
    { id: TORRENT_STATES_MAP.checking, name: 'Checking' },
    { id: TORRENT_STATES_MAP.error, name: 'Errored' },
];

/**
 * map raw states to UI readable states
 */
export const UI_STATE_MAP = {
    [TORRENT_STATES_MAP.downloading]: 'Downloading',
    [TORRENT_STATES_MAP.uploading]: 'Seeding',
    [TORRENT_STATES_MAP.seeding]: 'Seeding',
    [TORRENT_STATES_MAP.pausedDL]: 'Paused',
    [TORRENT_STATES_MAP.pausedUP]: 'Completed',
    [TORRENT_STATES_MAP.stalled]: 'Stalled',
    [TORRENT_STATES_MAP.missingFiles]: 'Missing Files',
    [TORRENT_STATES_MAP.metaDownloading]: 'Meta DL',
    [TORRENT_STATES_MAP.forcedDL] : '[F] Downloading',
    [TORRENT_STATES_MAP.forcedUP]: '[F] Seeding',

    [TORRENT_STATES_MAP.error]: 'Error' ,
    [TORRENT_STATES_MAP.queuedUP]: 'Queued' ,
    [TORRENT_STATES_MAP.checkingUP]: 'Checking' ,
    [TORRENT_STATES_MAP.allocating]: 'Allocating' ,
    [TORRENT_STATES_MAP.queuedDL]: 'Queued' ,
    [TORRENT_STATES_MAP.checkingDL]: 'Checking' ,
    [TORRENT_STATES_MAP.checkingResumeData]: 'Checking' ,
    [TORRENT_STATES_MAP.moving]: 'Moving' ,
    [TORRENT_STATES_MAP.unknown]: 'Unknown' ,
};

export const DOWNLOADING_STATES = [
    TORRENT_STATES_MAP.downloading,
    TORRENT_STATES_MAP.metaDownloading,
    TORRENT_STATES_MAP.stalled,
    TORRENT_STATES_MAP.pausedDL,
    TORRENT_STATES_MAP.forcedDL,
    TORRENT_STATES_MAP.queuedDL,
    TORRENT_STATES_MAP.checkingDL,
    TORRENT_STATES_MAP.allocating,
    TORRENT_STATES_MAP.checkingResumeData,
    TORRENT_STATES_MAP.moving,
];

export const SEEDING_STATES = [
    TORRENT_STATES_MAP.seeding,
    TORRENT_STATES_MAP.uploading,
    TORRENT_STATES_MAP.forcedUP,
    TORRENT_STATES_MAP.queuedUP,
    TORRENT_STATES_MAP.checkingUP,
];

export const ACTIVE_STATES = [
    TORRENT_STATES_MAP.metaDownloading,
]

export const ERROR_STATES = [
    TORRENT_STATES_MAP.missingFiles,
    TORRENT_STATES_MAP.error,
    TORRENT_STATES_MAP.unknown,
];

export const PAUSED_STATES = [
    TORRENT_STATES_MAP.pausedDL,
    TORRENT_STATES_MAP.pausedUP,
];

export const CHECKING_STATES = [
    TORRENT_STATES_MAP.checkingDL,
    TORRENT_STATES_MAP.checkingUP,
];

export const FORCED_STATES = [
    TORRENT_STATES_MAP.forcedDL,
    TORRENT_STATES_MAP.forcedUP,
];

export const mapTorrentState = state => UI_STATE_MAP[state] || state;

/**
 * computes all UI filter states a torrent can be a part of
 */
export const computeStates = ({dlspeed, upspeed, progress, state}) => {
    const states = [];

    const hasSpeed = !!(dlspeed || upspeed);
    const isCompleted = progress === 1;

    if (DOWNLOADING_STATES.includes(state)){
        states.push(TORRENT_STATES_MAP.downloading);
    }
        
    if (SEEDING_STATES.includes(state)){
        states.push(TORRENT_STATES_MAP.seeding);
    }
        
    if (isCompleted){
        states.push(TORRENT_STATES_MAP.completed);
    }

    if (!PAUSED_STATES.includes(state)){
        states.push(TORRENT_STATES_MAP.resumed);
    }

    if (PAUSED_STATES.includes(state)){
        states.push(TORRENT_STATES_MAP.paused);
    }

    if (CHECKING_STATES.includes(state)) {
        states.push(TORRENT_STATES_MAP.checking);
    }

    if (hasSpeed || ACTIVE_STATES.includes(state)){
        states.push(TORRENT_STATES_MAP.active);
    }

    if (!hasSpeed){
        states.push(TORRENT_STATES_MAP.inactive);
    }

    if (ERROR_STATES.includes(state)){
        states.push(TORRENT_STATES_MAP.error);
    }

    return states;
}


/**
 * actions on torrents
 */
export const ACTION_RESUME = { id: 'resume', name: 'Resume', icon: PlayArrowIcon };
export const ACTION_PAUSE = { id: 'pause', name: 'Pause', icon: PauseIcon };
export const ACTION_DELETE = { id: 'delete', name: 'Delete', icon: HighlightOffIcon };
export const ACTION_F_RESUME = { id: 'fResume', name: 'FResume', icon: SkipNextIcon };
export const ACTION_CHECK = { id: 'check', name: 'Recheck', icon: ReplayIcon };
export const ACTION_ADD = { id: 'add', name: 'Add', icon: AddCircleOutlineIcon };
