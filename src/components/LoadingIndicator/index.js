
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadingIndicator({ classes }) {

    return (
        <div className={classes.screenOverlay}>
            <div className={classes.progressIndicator}>
                <CircularProgress size={100} />
            </div>
        </div>
    );
}

LoadingIndicator.propTypes = {
    classes: PropTypes.object.isRequired
};

const styles = theme => ({
    screenOverlay: {
        top: 0,
        left: 0,
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.75)',
        zIndex: 100,
        color: theme.palette.primary.main
    },
    progressIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)'
    }
});

export default withStyles(styles)(LoadingIndicator);