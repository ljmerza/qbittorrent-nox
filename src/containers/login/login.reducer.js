import { createSlice } from '@reduxjs/toolkit';

import { storeGet } from 'utilities/persistant-storage';

export const initialState = {
    username: storeGet('qbtNox-username') || '',
    password: storeGet('qbtNox-password') || '',
    apiRoot: storeGet('qbtNox-apiRoot') || '',
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
        loginError: (state, action) => ({ ...state, loading: false, loggedIn: false, error: action.error }),
        logout: state => ({ ...state, ...initialState, loggedIn: false  }),
    }
});

export const { actions: loginActions, reducer: loginReducer } = loginSlice;
