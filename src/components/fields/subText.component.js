import React from 'react';
import { Typography } from '@material-ui/core';

function SubText({text, ...props}) {
    return (
        <Typography variant="caption" color="textSecondary" {...props}>{text}</Typography>
    );
}

export default SubText;