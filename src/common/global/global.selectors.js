import { createSelector } from 'reselect';
import { initialState } from './global.reducer';

const selectGlobal = state => state.global || initialState;

const selectGlobalApi = createSelector(
    selectGlobal,
    global => `${global.apiRoot}/${global.path}`,
);

export { selectGlobal, selectGlobalApi };