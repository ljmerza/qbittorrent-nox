import { createSelector } from 'reselect';

export const getSettings = state => state.settings;

export const getSettingsConfig = createSelector(getSettings, settings => settings.config);

export const getSettingsInternal = createSelector(getSettings, settings => settings.internal);
export const getSettingsLoading = createSelector(getSettings, settings => settings.loading);

export const getSettingsInternalRefreshInterval = createSelector(
    getSettingsInternal, 
    internal => internal.refreshInterval
);
