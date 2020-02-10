import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Typography } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import LinkIcon from '@material-ui/icons/Link';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SelectAllIcon from '@material-ui/icons/SelectAll';

import { torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import AddTorrent from 'containers/addTorrent';

const styles = theme => ({
    menuItemRoot: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px 0`,
    },
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

function BottomMenu({ classes, selectTorrent }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const onMultiSelect = () => {
        selectTorrent([]);
        handleClose();
    }

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
                    <Typography>Settings</Typography>
                    <SettingsIcon classes={{ root: classes.iconRoot }} />
                </MenuItem>
                <MenuItem classes={{ root: classes.menuItemRoot }} dense>
                    <AddTorrent>
                        <div onClick={handleClose} className={classes.iconAction}>
                            <Typography>Add Torrent File</Typography>
                            <InsertDriveFileIcon classes={{ root: classes.iconRoot }} />
                        </div>
                    </AddTorrent>
                </MenuItem>
                <MenuItem classes={{ root: classes.menuItemRoot }} dense>
                    <Typography>Add Torrent Link</Typography>
                    <LinkIcon classes={{ root: classes.iconRoot }} />
                </MenuItem>
                <MenuItem classes={{ root: classes.menuItemRoot }} dense>
                    <div onClick={onMultiSelect} className={classes.iconAction}>
                        <Typography>Multiselect</Typography>
                        <SelectAllIcon classes={{ root: classes.iconRoot }} />
                    </div>
                </MenuItem>
                <MenuItem classes={{ root: classes.menuItemRoot }} dense>
                    <Typography>Logout</Typography>
                    <ExitToAppIcon classes={{ root: classes.iconRoot }} />
                </MenuItem>
            </Menu>
        </div>
    );
}

BottomMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    selectTorrent: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        selectTorrent: torrent => dispatch(torrentDetailsActions.selectTorrent(torrent)),
    };
}

export default compose(
    withStyles(styles),
    connect(
        null,
        mapDispatchToProps
    )
)(BottomMenu);
