import { createSelector } from 'reselect';

export const getFilters = state => state.filters;
export const getOpenDrawer = createSelector(getFilters, filters => filters.openDrawer);

export const getOpenState = createSelector(getFilters, filters => filters.openState);
export const getSelectedState = createSelector(getFilters, filters => filters.selectedState);

export const getOpenCategories = createSelector(getFilters, filters => filters.openCategories);
export const getSelectedCategory = createSelector(getFilters, filters => filters.selectedCategory);

export const getOpenTags = createSelector(getFilters, filters => filters.openTags);
export const getSelectedTag = createSelector(getFilters, filters => filters.selectedTag);

export const getOpenTrackers = createSelector(getFilters, filters => filters.openTrackers);
export const getSelectedTracker = createSelector(getFilters, filters => filters.selectedTracker);

export const getOpenSort = createSelector(getFilters, filters => filters.openSort);
export const getSelectedSort = createSelector(getFilters, filters => filters.selectedSort);
export const getIsSortDescending = createSelector(getFilters, filters => filters.isSortDescending);

export const getOpenSearch = createSelector(getFilters, filters => filters.openSearch);
export const getSearch = createSelector(getFilters, filters => filters.search);
export const getSearchBy = createSelector(getFilters, filters => filters.searchBy);

