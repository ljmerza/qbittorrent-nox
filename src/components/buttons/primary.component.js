import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const ButtonPrimary = props => {
    const { classes, className, children, ...restProps } = props;
    return (
        <Button color="secondary" className={clsx(classes.root, className)} {...restProps}>
            {children}
        </Button>
    );
};

const styles = theme => ({
    root: {
        boxShadow: 'none',
        borderRadius: 0,
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.primary.main
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: theme.palette.primary.main
        },
        '&:focus': {
            boxShadow: 'none',
            backgroundColor: theme.palette.primary.main
        },
        '&:disabled': {
            boxShadow: 'none',
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.contrastText
        }
    }
});

ButtonPrimary.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    children: PropTypes.any.isRequired
};

ButtonPrimary.defaultProps = {
    className: null
};

export default withStyles(styles, { withTheme: true })(ButtonPrimary);