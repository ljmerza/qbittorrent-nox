import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_UI_STATE, DEFAULT_UI_SORT, DEFAULT_UI_TAG, DEFAULT_UI_CATEGORY } from 'utilities/torrent-states';
import { storeGetSlice, storeSaveSlice } from 'utilities/persistant-storage';
import { DEFAULT_SEARCH_BY_ID } from './filter.tools';

const SLICE_NAME = 'filters';
const savedState = storeGetSlice(SLICE_NAME);

export const initialState = {
    openDrawer: false,

    openState: true,
    selectedState: DEFAULT_UI_STATE,

    openCategories: true,
    selectedCategory: DEFAULT_UI_CATEGORY,
    
    openTags: true,
    selectedTag: DEFAULT_UI_TAG,

    openSort: true,
    selectedSort: DEFAULT_UI_SORT,
    isSortDescending: true,

    openSearch: true,
    search: '',
    searchBy: DEFAULT_SEARCH_BY_ID,
};

export const filtersSlice = createSlice({
    name: SLICE_NAME,
    initialState: { ...initialState, ...savedState },
    reducers: {
        changeSelectedState: (state, action) => {
            const newValue = action.payload === state.selectedState ? DEFAULT_UI_STATE : action.payload;
            const newState = { ...state, selectedState: newValue };
            storeSaveSlice(SLICE_NAME, newState);
            return newState;
        },
        toggleFilterDrawer: state => {
            const newState = { ...state, openDrawer: !state.openDrawer };
            storeSaveSlice(SLICE_NAME, newState);
            return newState;    
        },
        toggleCollapsedState: state => {
            const newState = { ...state, openState: !state.openState };
            storeSaveSlice(SLICE_NAME, newState);
            return newState;    
        },

        changeSelectedCategory: (state, action) => {
            const newState = { ...state, selectedCategory: action.payload };
            storeSaveSlice(SLICE_NAME, newState);
            return newState;    
        },
        toggleCollapsedCategory: state => {
            const newState = { ...state, openCategories: !state.openCategories };
            storeSaveSlice(SLICE_NAME, newState);
            return newState;    
        },

        changeSelectedTag: (state, action) => {
            const newState = { ...state, selectedTag: action.payload };
            storeSaveSlice(SLICE_NAME, newState);
            return newState;    
        },
        toggleCollapsedTag: state => {
            const newState = { ...state, openTags: !state.openTags };
            storeSaveSlice(SLICE_NAME, newState);
            return newState;    
        },

        changeSelectedSort: (state, action) => {
            // if selected same state then we are toggling direction
            const isSortDescending = action.payload === state.selectedSort ? !state.isSortDescending : true;
            const newState = { ...state, selectedSort: action.payload, isSortDescending };
            storeSaveSlice(SLICE_NAME, newState);
            return newState;
        },
        toggleCollapsedSort: state => {
            const newState = { ...state, openSort: !state.openSort };
            storeSaveSlice(SLICE_NAME, newState);
            return newState;
        },

        changeSearch: (state, action) => {
            const newState = { ...state, search: action.payload };
            storeSaveSlice(SLICE_NAME, newState);
            return newState;
        },
        changeSearchBy: (state, action) => {
            const newState = { ...state, searchBy: action.payload, search: '' };
            storeSaveSlice(SLICE_NAME, newState);
            return newState;
        },
        toggleCollapsedSearch: state => {
            const newState = { ...state, openSearch: !state.openSearch };
            storeSaveSlice(SLICE_NAME, newState);
            return newState;
        },

    }
});

export const { actions: filtersActions, reducer: filtersReducer } = filtersSlice;
