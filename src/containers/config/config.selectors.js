import { createSelector } from 'reselect';

export const getConfig = state => state.config;

export const getConfigConfig = createSelector(getConfig, config => config.config);

export const getConfigInternal = createSelector(getConfig, config => config.internal);
export const getConfigLoading= createSelector(getConfig, config => config.loading);

export const getConfigInternalRefreshInterval = createSelector(
    getConfigInternal, 
    internal => internal.refreshInterval
);
