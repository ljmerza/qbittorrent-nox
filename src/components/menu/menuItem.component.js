import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';


const styles = theme => ({
    menuItemRoot: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    }
});

function MenuItemComponent({ classes, onClick, children }) {
    return (
        <MenuItem classes={{ root: classes.menuItemRoot }} dense onClick={onClick}>
            {children}
        </MenuItem>
    );
}

MenuItemComponent.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(MenuItemComponent);
