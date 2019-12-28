import { createSelector } from 'reselect';

export const getLogin = state => state.login;

export const getLoginUsername = createSelector(getLogin, login => login.username);
export const getLoginPassword = createSelector(getLogin, login => login.password);

export const getLoginApiRoot = createSelector(getLogin, login => login.apiRoot);
export const getLoginApiPath = createSelector(getLogin, login => login.apiPath);
export const getLoginApiUrl = createSelector(
    [getLoginApiRoot, getLoginApiPath], 
    (apiRoot, apiPath) => `${apiRoot}/${apiPath}`
);

export const getLoginLoading = createSelector(getLogin, login => login.loading);
export const getLoginLoggedIn = createSelector(getLogin, login => login.loggedIn);