import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { getTorrentHashes } from 'utilities/torrent.tools';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { rssActions, API_PATHS_RSS } from '../rss.reducer';

export default function* rssGetAll() {
    yield takeLatest(`${rssActions.getRssFeeds}`, function* ({ getFeeds = false }) {
        try {
            const apiUrl = yield select(getLoginApiUrl);

            const options = {
                method: 'GET',
                allowNoResponse: true,
                url: `${apiUrl}/${API_PATHS_RSS.getAllItems}?withData=${getFeeds}`,
            };

            const response = yield call(request, options);

            const feeds = Object.entries(response).map((feeds, feed ) => {
                const [key, value] = feed;
                feeds.push({ name: key, ...value });
                return feeds;
            }, []);

            yield put({ type: `${rssActions.getAllItemsSuccess}`, feeds, });

        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'rssGetAll' });
            yield put({ type: `${toastActions.getAllItemsError}` });
        }
    });
}
