import { createSlice } from '@reduxjs/toolkit';


import { storeSave, storeGet } from '../../utilities/persistant-storage';

export const initialState = {
    username: '',
    password: '',
    apiRoot: storeGet('apiRoot') || '',
    loggedIn: null,
    loading: false,

    apiPath: 'api/v2',
    path: 'auth/login'
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            storeSave('apiRoot', action.payload.apiRoot);
            return { ...state, loading: true, ...action.payload };
        },
        loginSuccess: (state, action) => ({ ...state, loading: false, loggedIn: true }),
        loginError: (state, action) => ({ ...state, loading: false, loggedIn: false, error: action.error }),
        logout: state => ({ ...state, ...initialState, loggedIn: false  }),
    }
});

export const { actions: loginActions, reducer: loginReducer } = loginSlice;
