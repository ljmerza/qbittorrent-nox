import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    username: '',
    password: '',
    loggedIn: true,
    loading: false,
    error: '',
    path: 'auth/login'
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => ({ ...state, loading: true, username: action.username, password: action.password }),
        loginSuccess: (state, action) => ({ ...state, loading: false, loggedIn: true }),
        loginError: (state, action) => ({ ...state, loading: false, loggedIn:false, error: action.error }),
        logout: state => ({ ...state, ...initialState, loggedIn: false  }),
    }
});

export const { actions: loginActions, reducer: loginReducer } = loginSlice;
