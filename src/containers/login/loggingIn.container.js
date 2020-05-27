import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { loginActions } from 'containers/login/login.reducer';
import { settingsActions } from 'containers/settings/settings.reducer';
import { getSettingsApiVersionError } from 'containers/settings/settings.selectors';

import PageContainer from 'components/pageContainer';
import LoadingIndicator from 'components/LoadingIndicator';

class LoggingIn extends PureComponent {
    componentDidMount() {
        const { location, setEntranceRoute } = this.props;

        // get api version to see if we are logged in and compatible
        // set current route in case we need to go back
        this.props.getApiVersion();
        setEntranceRoute(location.pathname);
    }

    render() {
        return (
            <PageContainer>
                <LoadingIndicator />
            </PageContainer>
        );
    }
}

LoggingIn.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    getApiVersion: PropTypes.func.isRequired,
    setEntranceRoute: PropTypes.func.isRequired,
    versionError: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
    return {
        versionError: getSettingsApiVersionError(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getApiVersion: () => dispatch(settingsActions.getApiVersion()),
        setEntranceRoute: payload => dispatch(loginActions.setEntranceRoute(payload)),
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(LoggingIn);