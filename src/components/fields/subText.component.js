import React from 'react';
import { Typography } from '@material-ui/core';

function SubText({children, text, ...props}) {
    return (
        <Typography variant="caption" color="textSecondary" {...props}>{children || text}</Typography>
    );
}

export default SubText;