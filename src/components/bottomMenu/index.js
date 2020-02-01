import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import LinkIcon from '@material-ui/icons/Link';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import AddTorrent from 'containers/addTorrent';

const styles = theme => ({
    menuItemRoot: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
    menuPaper: {
        paper: {
            border: '1px solid #d3d4d5',
        },
    },
    iconRoot: {
        margin: '0 10px 0 0px',
        minWidth: 'inherit',
    },
    addTorrent: {
        display: 'flex',
        alignItems: 'center',
    }
});

function BottomMenu({ classes }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <div>
            <MoreVertIcon onClick={handleClick} />
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
                <MenuItem className={classes.menuItemRoot} dense>
                    <ListItemIcon classes={{ root: classes.iconRoot }}>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </MenuItem>
                <MenuItem classes={{ root: classes.menuItemRoot }} dense>
                    <AddTorrent>
                        <div onClick={handleClose} className={classes.addTorrent}>
                            <InsertDriveFileIcon classes={{ root: classes.iconRoot }}>
                                <SettingsIcon fontSize="small" />
                            </InsertDriveFileIcon>
                            <ListItemText primary="Add Torrent File" />
                        </div>
                    </AddTorrent>
                </MenuItem>
                <MenuItem classes={{ root: classes.menuItemRoot }} dense>
                    <ListItemIcon classes={{ root: classes.iconRoot }}>
                        <LinkIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Add Torrent Link" />
                </MenuItem>
                <MenuItem classes={{ root: classes.menuItemRoot }} dense>
                    <ListItemIcon classes={{ root: classes.iconRoot }}>
                        <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </MenuItem>
            </Menu>
        </div>
    );
}

export default withStyles(styles)(BottomMenu);
