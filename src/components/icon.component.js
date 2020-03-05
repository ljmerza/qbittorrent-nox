import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    icon: {
        transform: 'scale(-1, 1)',
        fontSize: '1rem',
        
    }
});

function MyIcon({ Icon, color = 'primary', props }) {
    const classes = useStyles();

    return (
        <Icon fontSize='small' color={color} className={classes.icon} {...props} />
    );
}

MyIcon.propTypes = {
    Icon: PropTypes.any.isRequired,
};

export default MyIcon;

