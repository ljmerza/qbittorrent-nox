import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Container } from './grid.component';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1),
    },
    title: {
        wordBreak: 'break-all',
    },
}));

function CardComponent({ title, children }) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                { title ? <Typography component="h6" variant="h6" className={classes.title}>{title}</Typography> : null }
                <Container>
                    {children}
                </Container>
            </CardContent>
        </Card>
    )
}

CardComponent.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any.isRequired,
};

export default CardComponent;
