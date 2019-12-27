import { createSelector } from 'reselect';

export const getFilters = state => state.filters;

export const getSelectedState = createSelector(getFilters, filters => filters.selectedState);
export const getSelectedCategory = createSelector(getFilters, filters => filters.selectedCategory);
export const getSelectedTag = createSelector(getFilters, filters => filters.selectedTag);
export const getSelectedSort = createSelector(getFilters, filters => filters.selectedSort);

export const getOpenDrawer = createSelector(getFilters, filters => filters.openDrawer);

export const getOpenState = createSelector(getFilters, filters => filters.openState);
export const getOpenCategories = createSelector(getFilters, filters => filters.openCategories);
export const getOpenTags = createSelector(getFilters, filters => filters.openTags);
export const getOpenSort = createSelector(getFilters, filters => filters.openSort);

export const getIsSortDescending = createSelector(getFilters, filters => filters.isSortDescending);

