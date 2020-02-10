import { createSlice } from '@reduxjs/toolkit';

import { storeGet } from 'utilities/persistant-storage';

export const initialState = {
    username: storeGet('qbtnox-username') || '',
    password: storeGet('qbtnox-password') || '',
    baseApiUrl: storeGet('qbtnox-url') || '',
    loggedIn: null,
    loading: false,

    apiPath: 'api/v2',
    path: 'auth/login'
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => ({ ...state, loading: true, ...action.payload }),
        loginSuccess: (state, action) => ({ ...state, loading: false, loggedIn: true }),
        notLoggedIn: (state, action) => ({ ...state, loading: false, loggedIn: false }),
        logout: state => ({ ...state, ...initialState, loggedIn: false  }),
    }
});

export const { actions: loginActions, reducer: loginReducer } = loginSlice;
