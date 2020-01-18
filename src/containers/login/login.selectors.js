import { createSelector } from 'reselect';

export const getLogin = state => state.login;

export const getLoginUsername = createSelector(getLogin, login => login.username);
export const getLoginPassword = createSelector(getLogin, login => login.password);

export const getLoginBaseApiUrl = createSelector(getLogin, login => login.baseApiUrl);
export const getLoginApiPath = createSelector(getLogin, login => login.apiPath);
export const getLoginApiUrl = createSelector(
    [getLoginBaseApiUrl, getLoginApiPath], 
    (baseApiUrl, apiPath) => `${baseApiUrl}/${apiPath}`
);

export const getLoginLoading = createSelector(getLogin, login => login.loading);
export const getLoginLoggedIn = createSelector(getLogin, login => login.loggedIn);