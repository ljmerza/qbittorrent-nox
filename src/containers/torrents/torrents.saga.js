import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from '../../utilities/request';
import { selectGlobalApi } from '../../common/global/global.selectors';
import { initialState, torrentsActions } from './torrents.reducer';
import { loginActions } from '../login/login.reducer';

function* getTorrents() {
    try {
        const apiUrl = yield select(selectGlobalApi);

        const options = {
            method: 'GET',
            url: `${apiUrl}/${initialState.path}`,
        }

        const response = yield call(request, options);

        if (response){
            yield put({ type: `${torrentsActions.torrentsSuccess}`, response });
        } else {
            yield put({ type: `${loginActions.loginError}`, error: '' });
        }

    } catch (e) {
        yield put({ type: `${torrentsActions.torrentsError}`, error: e.message });
    }
}

export default function* torrents() {
    yield takeLatest(`${torrentsActions.torrents}`, getTorrents);
}