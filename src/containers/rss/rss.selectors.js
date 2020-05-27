import { createSelector } from 'reselect';

export const getRss = state => state.rss;

export const getRssRules = createSelector(getRss, rss => rss.rssRules);
export const getRssFeeds = createSelector(getRss, rss => rss.rssFeeds);
export const isLoadingRss = createSelector(getRss, rss => rss.loadingRssRules);