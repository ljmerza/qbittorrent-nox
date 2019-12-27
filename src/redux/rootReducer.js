import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../utilities/history';

import { globalReducer } from '../common/global/global.reducer';
import { toastReducer } from '../common/toast/toast.reducer';

import { loginReducer } from '../containers/login/login.reducer';
import { torrentsReducer } from '../containers/torrents/torrents.reducer';
import { filtersReducer } from '../containers/filters/filters.reducer';
import { torrentDetailsReducer } from '../containers/torrentDetails/torrentDetails.reducer';

export const initialState = {};

 export const rootReducer = combineReducers({
    global: globalReducer,
    toast: toastReducer,
    login: loginReducer,
    torrents: torrentsReducer,
    filters: filtersReducer,
    torrentDetails: torrentDetailsReducer,
    router: connectRouter(history),
})
