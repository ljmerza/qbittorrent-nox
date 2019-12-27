import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';

// import Header from './header.container';
// import Toast from './toast.container';
import Routes from '../routes';

class MainContainer extends PureComponent {
    render() {
        const { classes } = this.props;
        return (
            <>
                <main className={classes.mainContent}>
                    {/* <Header /> */}
                    <Routes />
                </main>
                {/* <Toast /> */}
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
    classes: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(MainContainer);