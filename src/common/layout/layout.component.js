import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import { configActions } from 'containers/config/config.reducer';
import Routes from '../routes';

// import Header from './header.container';
import Toast from 'common/toast/toast.container';

class MainContainer extends PureComponent {
    componentDidMount() {
        // get api version to see if we are logged in and compatible
        this.props.getApiVersion();
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <main className={classes.mainContent}>
                    {/* <Header /> */}
                    <Routes />
                </main>
                <Toast />
            </>
        );
    }
}

const styles = theme => ({
    mainContent: {
        backgroundColor: theme.palette.background.default,
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
    }
});

MainContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    getApiVersion: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        getApiVersion: () => dispatch(configActions.getApiVersion())
    };
}

export default compose(
    withStyles(styles),
    connect(null, mapDispatchToProps)
)(MainContainer);