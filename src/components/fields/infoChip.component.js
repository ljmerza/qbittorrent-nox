import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    chip: {
        marginLeft: '0.5rem',
    }
}));

function InfoChip({ noMargin, ...props }) {
    const classes = useStyles();

    return (
        <Chip className={noMargin ? null : classes.chip} size='small' variant="outlined" {...props} />
    );
}

export default InfoChip;