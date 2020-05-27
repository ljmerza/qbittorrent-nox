import { createSlice } from '@reduxjs/toolkit';

export const API_PATHS_RSS = {
    addFolder: 'rss/addFolder',
    addFeed: 'rss/addFeed',
    removeItem: 'rss/removeItem',
    getAllItems: 'rss/items',
    markAsRead: 'rss/markAsRead',
    refreshItem: 'rss/refreshItem',
    setRule: 'rss/setRule',
    renameRule: 'rss/renameRule',
    getAllAutoRules: 'rss/rules',
    matchingArticles: 'rss/matchingArticles',
}

export const initialState = {
    rssFeeds: [],
    loadingRssFeeds: false,

    rssRules: [],
    loadingRssRules: false,

    markingAsRead: false,
};

export const rssSlice = createSlice({
    name: 'rss',
    initialState,
    reducers: {
        getRssFeeds: state => ({ ...state, loadingRssFeeds: true, }),
        getRssFeedsSuccess: (state, action) => ({ ...state, loadingRssFeeds: false, rssFeeds: action.payload, }),
        getRssFeedsError: state => ({ ...state, loadingRssFeeds: false, rssFeeds: [], }),

        getRssRules: state => ({ ...state, loadingRssRules: true, }),
        getRssRulesSuccess: (state, action) => ({ ...state, loadingRssRules: false, rssRules: action.payload, }),
        getRssRulesError: state => ({ ...state, loadingRssRules: false, rssRules: [], }),

        markAsRead: state => ({ ...state, markingAsRead: true, }),
        markAsReadSuccess: (state, action) => ({ ...state, markingAsRead: false, }),
        markAsReadError: state => ({ ...state, markingAsRead: false, }),
    }
});

export const { actions: rssActions, reducer: rssReducer } = rssSlice;
