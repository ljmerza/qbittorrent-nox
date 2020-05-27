import { createSlice } from '@reduxjs/toolkit';

export const TOAST_TYPES = {
    SUCCESS: 'SUCCESS',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
};

const initialState = {
    toastType: TOAST_TYPES.SUCCESS,
    showToast: false,
    message: '',
    position: 0,
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showSuccess: (state, action) => ({ ...state, showToast: true, toastType: TOAST_TYPES.SUCCESS, ...(action.payload || action) }),
        showError: (state, action) => ({ ...state, showToast: true, toastType: TOAST_TYPES.ERROR, ...(action.payload || action) }),
        showWarning: (state, action) => ({ ...state, showToast: true, toastType: TOAST_TYPES.ERROR, ...(action.payload || action) }),
        hideToast: state => ({ ...state, showToast: false, message: '' }),
        setPosition: (state, action) => ({ ...state, toastPosition: action.position }),
    }
});

const { actions, reducer } = toastSlice;

export const toastActions = actions;
export const toastReducer = reducer;
export default toastSlice;