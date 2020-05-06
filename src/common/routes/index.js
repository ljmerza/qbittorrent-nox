import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import LoginRoutes from './login.routes';
import LoggedInRoutes from './loggedIn.routes';
import { getLoginLoggedIn } from 'containers/login/login.selectors';

function Routes({ loggedIn }) {

    if (loggedIn) return <LoggedInRoutes />;
    return <LoginRoutes />;
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