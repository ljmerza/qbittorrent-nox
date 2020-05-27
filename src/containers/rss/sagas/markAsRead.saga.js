import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { rssActions, API_PATHS_RSS } from '../rss.reducer';

export default function* markAsRead() {
    yield takeLatest(`${rssActions.markAsRead}`, function* ({ articleId, itemPath }) {
        try {
            const apiUrl = yield select(getLoginApiUrl);

            const options = {
                method: 'GET',
                allowNoResponse: true,
                url: `${apiUrl}/${API_PATHS_RSS.markAsRead}?articleId=${articleId}&itemPath?=${itemPath}`,
            };

            const response = yield call(request, options);
            yield put({ type: `${rssActions.markAsReadSuccess}`, response, });
        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'markAsRead' });
            yield put({ type: `${rssActions.markAsReadError}` });

        }
    });
}
