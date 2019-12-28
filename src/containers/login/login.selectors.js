import { createSelector } from 'reselect';

export const getLogin = state => state.login;

export const getLoginLoggedIn = createSelector(getLogin, login => login.loggedIn);