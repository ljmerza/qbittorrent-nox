import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import history from 'utilities/history';

import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from './login.selectors';
import { initialState, loginActions } from './login.reducer';

export default function* logout() {
    yield takeLatest(`${loginActions.logout}`, function* (action) {

        try {
            const apiUrl = (yield select(getLoginApiUrl)) || action.payload.baseApiUrl;
            const options = {
                method: 'POST',
                url: `${apiUrl}/${initialState.logoutPath}`,
                allowNoResponse: true,
            }

            yield call(request, options);

            yield put({ type: `${loginActions.logoutSuccess}` });
            yield put({ type: `${toastActions.showSuccess}`, message: 'Successfully logged out.', from: 'logout' });

            // we need to make sure the store has updated before moving to login route
            setTimeout(() => history.push('/login'), 1000);

        } catch (e) {
            const message = `Error logging out.`;
            yield put({ type: `${toastActions.showError}`, message: message, from: 'logout' });
            yield put({ type: `${loginActions.notLoggedIn}` });
        }
    });
}