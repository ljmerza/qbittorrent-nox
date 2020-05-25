import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ButtonGroup, Button, Grow, Paper, Popper, MenuItem, MenuList, ClickAwayListener } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { 
    ACTION_RESUME, ACTION_PAUSE, ACTION_DELETE, ACTION_CHECK,
    ACTION_F_RESUME, ACTION_CLEAR, ACTION_AUTO_MANAGE, ACTION_PIECE_PRIORITY, 
    ACTION_SEQUENTIAL, ACTION_REANNOUCE, ACTION_SUPER_SEED, 
    ACTION_COPY, COPY_TYPES,
} from 'utilities/torrent-states';
import Card from 'components/card.component';
import { torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import GeneralTabActionsDelete from './actionsDeleteModal.component';

function GeneralTabActions({ 
    selectedTorrent,
    classes,

    resumeSelectedTorrent,
    pauseSelectedTorrent,
    forceResumeSelectedTorrent,
    checkSelectedTorrent,
    autoManageSelectedTorrent,
    piecePrioritySelectedTorrent,
    sequentialSelectedTorrent,
    reannouceSelectedTorrent,
    superSeedSelectedTorrent,

    closeDetails,
 }) {
    
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleMenuItemClick = () => setOpen(false);
    const handleToggle = () => setOpen(prevOpen => !prevOpen);

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;
        setOpen(false);
    };

    const buttonClasses = { root: classes.buttonRoot, label: classes.buttonLabel };
    const isMultiSelected = Array.isArray(selectedTorrent);

    return (
        <Card title='Actions'>
            <ButtonGroup color="primary" orientation="vertical" size='large' className={classes.buttonGroup}>
                <Button classes={buttonClasses} onClick={resumeSelectedTorrent} startIcon={<ACTION_RESUME.icon />}>{ACTION_RESUME.name}</Button> 
                <Button classes={buttonClasses} onClick={pauseSelectedTorrent} startIcon={<ACTION_PAUSE.icon />}>{ACTION_PAUSE.name}</Button>
                <Button classes={buttonClasses} onClick={() => setOpenDeleteModal(true)} startIcon={<ACTION_DELETE.icon />}>{ACTION_DELETE.name}</Button>
                <Button classes={buttonClasses} onClick={forceResumeSelectedTorrent} startIcon={<ACTION_F_RESUME.icon />}>{ACTION_F_RESUME.name}</Button>
                <Button classes={buttonClasses} onClick={checkSelectedTorrent} startIcon={<ACTION_CHECK.icon />}>{ACTION_CHECK.name}</Button>
                <Button classes={buttonClasses} onClick={autoManageSelectedTorrent} startIcon={<ACTION_AUTO_MANAGE.icon />}>{ACTION_AUTO_MANAGE.name}</Button>
                <Button classes={buttonClasses} onClick={piecePrioritySelectedTorrent} startIcon={<ACTION_PIECE_PRIORITY.icon />}>{ACTION_PIECE_PRIORITY.name}</Button>
                <Button classes={buttonClasses} onClick={sequentialSelectedTorrent} startIcon={<ACTION_SEQUENTIAL.icon />}>{ACTION_SEQUENTIAL.name}</Button>
                <Button classes={buttonClasses} onClick={reannouceSelectedTorrent} startIcon={<ACTION_REANNOUCE.icon />}>{ACTION_REANNOUCE.name}</Button>
                <Button classes={buttonClasses} onClick={superSeedSelectedTorrent} startIcon={<ACTION_SUPER_SEED.icon />}>{ACTION_SUPER_SEED.name}</Button>
                {isMultiSelected ? null : <Button classes={buttonClasses} onClick={handleToggle} ref={anchorRef} startIcon={<ACTION_COPY.icon />}>{ACTION_COPY.name}</Button>}
                <Button classes={buttonClasses} onClick={closeDetails} startIcon={<ACTION_CLEAR.icon />}>{ACTION_CLEAR.name}</Button>
            </ButtonGroup>

            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: 'top' }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
                                    {COPY_TYPES.map(option => (
                                        <MenuItem key={option.value} onClick={handleMenuItemClick}>
                                            <CopyToClipboard text={selectedTorrent[option.value]}>
                                                <span>{option.label}</span>
                                            </CopyToClipboard>
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

            <GeneralTabActionsDelete openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />
        </Card>
    )
}

GeneralTabActions.propTypes = {
    selectedTorrent: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    closeDetails: PropTypes.func.isRequired,
    resumeSelectedTorrent: PropTypes.func.isRequired,
    pauseSelectedTorrent: PropTypes.func.isRequired,
    forceResumeSelectedTorrent: PropTypes.func.isRequired,
    autoManageSelectedTorrent: PropTypes.func.isRequired,
    piecePrioritySelectedTorrent: PropTypes.func.isRequired,
    sequentialSelectedTorrent: PropTypes.func.isRequired,
    reannouceSelectedTorrent: PropTypes.func.isRequired,
    superSeedSelectedTorrent: PropTypes.func.isRequired,
    checkSelectedTorrent: PropTypes.func.isRequired,
};

const styles = theme => ({
    buttonGroup: {
        marginTop: theme.spacing(2),
    },
    buttonRoot: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },
    buttonLabel: {
        justifyContent: 'start',
        textAlign: 'left',
    },
});


function mapDispatchToProps(dispatch) {
    return {
        resumeSelectedTorrent: () => dispatch(torrentDetailsActions.resumeSelectedTorrent()),
        pauseSelectedTorrent: () => dispatch(torrentDetailsActions.pauseSelectedTorrent()),
        forceResumeSelectedTorrent: () => dispatch(torrentDetailsActions.forceResumeSelectedTorrent()),
        autoManageSelectedTorrent: () => dispatch(torrentDetailsActions.autoManageSelectedTorrent()),
        piecePrioritySelectedTorrent: () => dispatch(torrentDetailsActions.piecePrioritySelectedTorrent()),
        sequentialSelectedTorrent: () => dispatch(torrentDetailsActions.sequentialSelectedTorrent()),
        reannouceSelectedTorrent: () => dispatch(torrentDetailsActions.reannouceSelectedTorrent()),
        superSeedSelectedTorrent: () => dispatch(torrentDetailsActions.superSeedSelectedTorrent()),
        checkSelectedTorrent: () => dispatch(torrentDetailsActions.checkSelectedTorrent()),
        closeDetails: () => dispatch(torrentDetailsActions.closeDetails()),

    };
}

export default compose(
    withStyles(styles),
    connect(
        null,
        mapDispatchToProps
    )
)(GeneralTabActions);

