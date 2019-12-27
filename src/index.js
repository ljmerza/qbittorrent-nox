import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import 'typeface-roboto';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import configureStore from './redux/configureStore';
import { initialState } from './redux/rootReducer';

import history from './utilities/history';

import './index.css';
import Root from './root';
import * as serviceWorker from './serviceWorker';
import theme from './styles/theme';


const BASENAME = process.env.PUBLIC_URL || '/';
const store = configureStore(initialState, history);

function startApp() {
    ReactDOM.render(
        <Router basename={BASENAME} history={history}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Root store={store} />
            </MuiThemeProvider>
        </Router>, 
        document.getElementById('root')
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

startApp();

/*
These event listeners are to prevent pinch zooming. 
https://stackoverflow.com/questions/11689353/disable-pinch-zoom-on-mobile-web
Pinch zooming based on user-scalable property in the head/viewport of index.html is no longer
being honored by many mobile browsers
*/
document.addEventListener('gesturestart', e => {
    e.preventDefault();
    // special hack to prevent zoom-to-tabs gesture in safari
    document.body.style.zoom = 0.99;
});

document.addEventListener('gesturechange', e => {
    e.preventDefault();
    // special hack to prevent zoom-to-tabs gesture in safari
    document.body.style.zoom = 0.99;
});

document.addEventListener('gestureend', e => {
    e.preventDefault();
    // special hack to prevent zoom-to-tabs gesture in safari
    document.body.style.zoom = 0.99;
});
