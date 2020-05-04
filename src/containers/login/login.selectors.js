import { createSelector } from 'reselect';

export const getLogin = state => state.login;

export const getLoginUsername = createSelector(getLogin, login => login.username);
export const getLoginPassword = createSelector(getLogin, login => login.password);
export const getLoginUrl = createSelector(getLogin, login => login.baseApiUrl);

export const getLoginApiPath = createSelector(getLogin, login => login.apiPath);
export const getLoginApiUrl = createSelector(
    [getLoginUrl, getLoginApiPath], 
    (baseApiUrl, apiPath) => `${baseApiUrl}/${apiPath}`
);

export const getLoginLoading = createSelector(getLogin, login => login.loading);
export const getLoginLoggedIn = createSelector(getLogin, login => login.loggedIn);

export const getLoginLoginInfo = createSelector(getLogin, login => login.loginInfo);