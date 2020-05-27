import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { rssActions, API_PATHS_RSS } from '../rss.reducer';

export default function* getAllRules() {
    yield takeLatest(`${rssActions.getRssRules}`, function* () {
        try {
            const apiUrl = yield select(getLoginApiUrl);

            const options = {
                method: 'GET',
                allowNoResponse: true,
                url: `${apiUrl}/${API_PATHS_RSS.getAllItems}`,
            };

            const response = yield call(request, options);

            const rules = Object.entries(response).map((rules, rule) => {
                const [key, value] = rule;
                rules.push({ name: key, ...value });
                return rules;
            }, []);

            yield put({ type: `${rssActions.getRssRulesSuccess}`, rules, });
        } catch (e) {
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'getAllRules' });
            yield put({ type: `${toastActions.getRssRulesError}` });
        }
    });
}
