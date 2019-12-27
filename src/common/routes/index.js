import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import LoginRoutes from './login.routes';
import LoggedInRoutes from './loggedIn.routes';

function Routes({ loggedIn }) {
    if (loggedIn) return <LoggedInRoutes />;
    return <LoginRoutes />;
}

Routes.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
    return {
        loggedIn: state.login.loggedIn,
    }
};

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        null
    )
)(Routes);