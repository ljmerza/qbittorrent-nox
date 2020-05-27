import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';



import { toastActions } from 'common/toast/toast.reducer';
import LoggingInContainer from 'containers/login/loggingIn.container';
import { loginActions } from 'containers/login/login.reducer';
import { getLoginLoggedIn, getEntranceRoute } from 'containers/login/login.selectors';
import { settingsActions } from 'containers/settings/settings.reducer';
import { getSettingsTriedCheckingApi, getSettingsVersion } from 'containers/settings/settings.selectors';

import LoginRoutes from './login.routes';
import LoggedInRoutes from './loggedIn.routes';

// exclude these routes as redirects
const ROUTES = ['/', '/torrents', '/login'];

const minApiVersion = process.env.REACT_APP_MIN_API_VERSION && process.env.REACT_APP_MIN_API_VERSION.replace(/\./g, '');

class Routes extends PureComponent {

    componentDidUpdate() {

        // check to make sure we have min api version
        const _apiVersion = this.props.apiVersion && this.props.apiVersion.replace(/\./g, '');
        if (this.props.apiVersion) console.log(`qBittorrent api version ${this.props.apiVersion}`);

        if (_apiVersion && _apiVersion < minApiVersion) {
            this.props.showError({ message: `API version ${minApiVersion} or above is required (currently ${this.props.apiVersion}).`})
            this.props.notLoggedIn();

        }

        // if we are logged in and we saved a route coming into the app then go straight to that route
        // we also need to get the api version that we can
        if (this.props.loggedIn && this.props.entranceRoute && !ROUTES.includes(this.props.entranceRoute)) {
            this.props.history.push(this.props.entranceRoute);
            this.props.setEntranceRoute(null);
            this.props.getApiVersion();
        }
    }

    render() {
        const { loggedIn, triedCheckingApi } = this.props;

        // get api version to see if we are logged in and compatible
        if (!triedCheckingApi) return <LoggingInContainer />;

        if (loggedIn) return <LoggedInRoutes />;
        return <LoginRoutes />;
    }
    
}

Routes.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    triedCheckingApi: PropTypes.bool.isRequired,
    entranceRoute: PropTypes.string,
    setEntranceRoute: PropTypes.func.isRequired,
    getApiVersion: PropTypes.func.isRequired,
    notLoggedIn: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        loggedIn: getLoginLoggedIn(state),
        triedCheckingApi: getSettingsTriedCheckingApi(state),
        entranceRoute: getEntranceRoute(state),
        apiVersion: getSettingsVersion(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        setEntranceRoute: payload => dispatch(loginActions.setEntranceRoute(payload)),
        notLoggedIn: payload => dispatch(loginActions.notLoggedIn()),
        getApiVersion: () => dispatch(settingsActions.getApiVersion()),
        showError: (error) => dispatch(toastActions.showError(error)),
    };
}

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Routes);