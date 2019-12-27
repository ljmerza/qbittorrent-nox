import { createSlice } from '@reduxjs/toolkit';

export const TOAST_TYPES = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

const initialState = {
    show: false,
    type: TOAST_TYPES.SUCCESS,
    message: '',
    position: 0,
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action) => ({ ...state, isShowToast: true, type: TOAST_TYPES.SUCCESS, ...action }),
        hideToast: state => ({ ...state, isShowToast: false, message: '' }),
        setPosition: (state, action) => ({ ...state, toastPosition: action.position }),
    }
});

const { actions, reducer } = toastSlice;

export const toastActions = actions;
export const toastReducer = reducer;
export default toastSlice;