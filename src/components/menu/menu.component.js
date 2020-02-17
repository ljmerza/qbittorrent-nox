import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import MenuItemComponent from './menuItem.component';

const styles = theme => ({
    menuPaper: {
        border: '1px solid #d3d4d5',
    },
    iconRoot: {
        margin: `0 0 0 ${theme.spacing(1)}px`,
        minWidth: 'inherit',
    },
    iconAction: {
        display: 'flex',
        alignItems: 'center',
    }
});

function MenuComponent({ classes, children }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <MoreVertIcon onClick={handleOpen} />
            <Menu
                classes={{ paper: classes.menuPaper }}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >   
                {/* materialUI menu doesnt allow fragment as child */}
                <div>
                    {children(handleClose, classes)}
                </div>
            </Menu>
        </>
    );
}

MenuComponent.MenuItem = MenuItemComponent;

MenuComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
};

export default withStyles(styles)(MenuComponent);
