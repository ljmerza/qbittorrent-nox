import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import LoginRoutes from './login.routes';
import LoggedInRoutes from './loggedIn.routes';
import InitLoaderComponent from 'containers';
import { getLoginLoggedIn } from 'containers/login/login.selectors';

function Routes({ loggedIn }) {
    if (loggedIn === true) return <LoggedInRoutes />;
    else if (loggedIn === false) return <LoginRoutes />;

    /**
     * loggedIn starts off as null - we call apiVersion to see if we are logged
     * in and set the loggedIn boolean to redirect to login or torrents page from there
     */
    return (
        <Switch>
            <Route exact path="/">
                <InitLoaderComponent />
            </Route>
        </Switch>
    );
}

Routes.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    loggedIn: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        loggedIn: getLoginLoggedIn(state),
    }
};

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        null
    )
)(Routes);