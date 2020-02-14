import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Typography } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import ClearAllIcon from '@material-ui/icons/ClearAll';

import { 
    ACTION_RESUME, ACTION_PAUSE, ACTION_DELETE, 
    ACTION_F_RESUME, ACTION_CHECK 
} from 'utilities/torrent-states';

import { torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

import GeneralTabActionsDelete from 'containers/torrentDetails/tabs/general/actionsDeleteModal.component';


const styles = theme => ({
    menuItemRoot: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
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

function MultiSelectMenu({ 
    classes,
    resumeSelectedTorrent,
    pauseSelectedTorrent,
    forceResumeSelectedTorrent,
    checkSelectedTorrent,
    selectedTorrent,
    selectTorrent,
}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const noneSelected = selectedTorrent && selectedTorrent.length === 0;
    if (noneSelected) return null;

    return (
        <>
            <GeneralTabActionsDelete openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />

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
                <MenuItem className={classes.menuItemRoot} dense onClick={() => {
                    resumeSelectedTorrent();
                    handleClose();
                }}>
                    <Typography>Resume</Typography>
                    <ACTION_RESUME.icon classes={{ root: classes.iconRoot }} />
                </MenuItem>

                <MenuItem className={classes.menuItemRoot} dense onClick={() => {
                    pauseSelectedTorrent();
                    handleClose();
                }}>
                    <Typography>Pause</Typography>
                    <ACTION_PAUSE.icon classes={{ root: classes.iconRoot }} />
                </MenuItem>

                <MenuItem className={classes.menuItemRoot} dense onClick={() => {
                    forceResumeSelectedTorrent();
                    handleClose();
                }}>
                    <Typography>Force Resume</Typography>
                    <ACTION_F_RESUME.icon classes={{ root: classes.iconRoot }} />
                </MenuItem>

                <MenuItem className={classes.menuItemRoot} dense onClick={() => {
                    setOpenDeleteModal(true);
                    handleClose();
                }}>
                    <Typography>Delete</Typography>
                    <ACTION_DELETE.icon classes={{ root: classes.iconRoot }} />
                </MenuItem>

                <MenuItem className={classes.menuItemRoot} dense onClick={() => {
                    checkSelectedTorrent();
                    handleClose();
                }}>
                    <Typography>Recheck</Typography>
                    <ACTION_CHECK.icon classes={{ root: classes.iconRoot }} />
                </MenuItem>
                
                <MenuItem className={classes.menuItemRoot} dense onClick={() => {
                    selectTorrent(null);
                    handleClose();
                }}>
                    <Typography>Clear Selected</Typography>
                    <ClearAllIcon classes={{ root: classes.iconRoot }} />
                </MenuItem>
            </Menu>
        </>
    );
}

MultiSelectMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    selectTorrent: PropTypes.func.isRequired,
    selectedTorrent: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    resumeSelectedTorrent: PropTypes.func.isRequired,
    pauseSelectedTorrent: PropTypes.func.isRequired,
    forceResumeSelectedTorrent: PropTypes.func.isRequired,
    checkSelectedTorrent: PropTypes.func.isRequired,
    deleteSelectedTorrent: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        selectedTorrent: getSelectedTorrent(state),
    }
};
function mapDispatchToProps(dispatch) {
    return {
        selectTorrent: torrent => dispatch(torrentDetailsActions.selectTorrent(torrent)),
        resumeSelectedTorrent: () => dispatch(torrentDetailsActions.resumeSelectedTorrent()),
        pauseSelectedTorrent: () => dispatch(torrentDetailsActions.pauseSelectedTorrent()),
        forceResumeSelectedTorrent: () => dispatch(torrentDetailsActions.forceResumeSelectedTorrent()),
        checkSelectedTorrent: () => dispatch(torrentDetailsActions.checkSelectedTorrent()),
        deleteSelectedTorrent: deleteFiles => dispatch(torrentDetailsActions.deleteSelectedTorrent(deleteFiles)),
    };
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(MultiSelectMenu);
