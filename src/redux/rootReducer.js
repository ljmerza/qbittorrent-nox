import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utilities/history';

import { toastReducer } from 'common/toast/toast.reducer';
import { settingsReducer } from 'containers/settings/settings.reducer';
import { loginReducer } from 'containers/login/login.reducer';
import { torrentsReducer } from 'containers/torrents/torrents.reducer';
import { addTorrentReducer } from 'containers/addTorrent/addTorrent.reducer';
import { filtersReducer } from 'containers/filters/filters.reducer';
import { torrentDetailsReducer } from 'containers/torrentDetails/torrentDetails.reducer';

export const initialState = {};

export const rootReducer = combineReducers({
    settings: settingsReducer,
    toast: toastReducer,
    login: loginReducer,
    torrents: torrentsReducer,
    addTorrent: addTorrentReducer,
    filters: filtersReducer,
    torrentDetails: torrentDetailsReducer,
    router: connectRouter(history),
})
