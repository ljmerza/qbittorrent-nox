import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import SwapVertIcon from '@material-ui/icons/SwapVert';

const useStyles = makeStyles({
    speedIcon: {
        transform: 'scale(-1, 1)'
    }
});

function SpeedIcon({ Icon = SwapVertIcon, color = 'primary', props }) {
    const classes = useStyles();

    return (
        <Icon fontSize='small' color={color} className={classes.speedIcon} {...props} />
    );
}


export default SpeedIcon;

