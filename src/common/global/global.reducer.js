import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    apiRoot: '',
    path: 'api/v2'
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setApiRoot: (state, action) => ({ ...state, apiRoot: action.apiRoot }),
    }
});

const { actions, reducer } = globalSlice;

export const globalActions = actions;
export const globalReducer = reducer;
export default globalSlice;