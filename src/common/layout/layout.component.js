import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';

import Routes from '../routes';

// import Header from './header.container';
import Toast from 'common/toast/toast.container';
import Title from 'components/title.component';


function MainContainer({ classes }) {
    return (
        <>
            <main className={classes.mainContent}>
                <Title />
                {/* <Header /> */}
                <Routes />
            </main>
            <Toast />
        </>
    );
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
};


export default compose(
    withStyles(styles),
)(MainContainer);