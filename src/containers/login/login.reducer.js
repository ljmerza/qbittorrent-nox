import { createSlice } from '@reduxjs/toolkit';
import { storeGet, storeSave } from 'utilities/persistant-storage';

const localStorageKey = '_qbtnox';

const getStoredData = () => {
    const loginInfo = storeGet(localStorageKey);
    return loginInfo || [];
}

const loginInfo = getStoredData();
const defaultCreds = loginInfo.find(creds => creds.default);

export const initialState = {
    username: defaultCreds ? defaultCreds.username : '',
    password: defaultCreds ? defaultCreds.password : '',
    baseApiUrl: defaultCreds ? defaultCreds.url : '',
    loggedIn: null,
    loading: false,
    loginInfo,

    apiPath: 'api/v2',
    path: 'auth/login',
    logoutPath: 'auth/logout',
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => ({ ...state, loading: true, ...action.payload }),
        loginSuccess: state => ({ ...state, loading: false, loggedIn: true }),
        notLoggedIn: state => ({ ...state, loading: false, loggedIn: false }),

        saveCreds: (state, action) => {
            const loginInfo = getStoredData();
            const payload = action.payload;

            // if existing creds then update and save
            const credMatch = loginInfo.find(creds => creds.id === payload.id);
            if (credMatch) {

                // update the new creds
                const newLoginInfo = state.loginInfo.map(oldCreds => {
                    if (oldCreds.id === credMatch.id) oldCreds = credMatch;
                    return oldCreds;
                });

                storeSave(localStorageKey, newLoginInfo);

                // if default updated then store
                if (credMatch.default){
                    return {
                        ...state,
                        loginInfo: newLoginInfo,
                        username: credMatch.username,
                        password: credMatch.password,
                        baseApiUrl: credMatch.url,
                    };
                }

                return { ...state, loginInfo: newLoginInfo };
            }


            // else this is new creds
            loginInfo.push(action.payload);
            storeSave(localStorageKey, loginInfo);

            return {
                ...state,
                loginInfo,
            };
        },

        deleteCreds: (state, action) => {
            const loginInfo = getStoredData();
            const payload = action.payload;

            // if cant find a match to delete then end here
            const credMatch = loginInfo.find(creds => creds.id === payload.id);
            if (!credMatch) return state;

            // if the current login creds in the store matched the deleted then we just get the next creds to set as 'default'
            const newLoginInfo = loginInfo.filter(creds => creds === credMatch);
            if (newLoginInfo.default && newLoginInfo.length > 0) {
                newLoginInfo[0].default = true;
                storeSave(localStorageKey, newLoginInfo);

                return {
                    ...state,
                    username: newLoginInfo[0].username,
                    password: newLoginInfo[0].password,
                    baseApiUrl: newLoginInfo[0].url,
                    loginInfo: newLoginInfo,
                };
            };

            storeSave(localStorageKey, newLoginInfo);
            return {
                ...state,
                loginInfo: newLoginInfo,
            };
        },

        setDefaultCreds: (state, action) => {
            const loginInfo = getStoredData();
            const payload = action.payload;

            // if cant find a match to set then end here
            const credMatch = loginInfo.find(creds => creds.id === payload.id);
            if (!credMatch) return state;

            credMatch.default = true;
            storeSave(localStorageKey, loginInfo);

            return {
                ...state,
                username: credMatch.username,
                password: credMatch.password,
                baseApiUrl: credMatch.url,
                loginInfo,
            };
        },

        logout: state => ({ ...state, ...initialState, loggedIn: false  }),
    }
});

export const { actions: loginActions, reducer: loginReducer } = loginSlice;
