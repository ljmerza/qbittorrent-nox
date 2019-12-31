import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { ButtonGroup, Button, Modal, Checkbox } from '@material-ui/core';

import Card from 'components/card.component';
import { ACTION_RESUME, ACTION_PAUSE, ACTION_DELETE, ACTION_F_RESUME, ACTION_CHECK, PAUSED_STATES } from 'utilities/torrent-states';
import { torrentDetailsActions } from '../../torrentDetails.reducer';

function GeneralTabActions({ 
    selectedTorrent,
    data,
    resumeSelectedTorrent,
    pauseSelectedTorrent,
    forceResumeSelectedTorrent,
    checkSelectedTorrent,
    deleteSelectedTorrent,
 }) {
    
    // handle checkbox
    const [deleteFiles, setDeleteFiles] = React.useState(false);
    const onCheckToggle = useCallback(() => {
        setDeleteFiles(!deleteFiles);
    }, [setDeleteFiles, deleteFiles]);

    // handle confirm delete
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const onConfirmDelete = useCallback(() => {
        setOpenDeleteModal(false);
        deleteSelectedTorrent(deleteFiles);
    }, [setOpenDeleteModal, deleteSelectedTorrent, deleteFiles]);
    const onCancelDelete = useCallback(() => {
        setOpenDeleteModal(false);
    }, [setOpenDeleteModal]);

    // button actions except delete
    const onActionClick = useCallback(action => {
        switch (action.id){
            case ACTION_RESUME.id: 
                resumeSelectedTorrent();
                break;
            case ACTION_PAUSE.id: 
                pauseSelectedTorrent();
                break;
            case ACTION_F_RESUME.id: 
                forceResumeSelectedTorrent();
                break;
            case ACTION_CHECK.id: 
                checkSelectedTorrent();
                break;
            default: return;
        }
    }, [resumeSelectedTorrent, pauseSelectedTorrent, forceResumeSelectedTorrent, checkSelectedTorrent]);

    const isPaused = PAUSED_STATES.includes(selectedTorrent.state);

    return (
        <Card title='Actions'>
            <ButtonGroup color="primary">
                {!isPaused ? null : <Button key={ACTION_RESUME.id} onClick={() => onActionClick(ACTION_RESUME)}><ACTION_RESUME.icon /></Button>}
                {isPaused ? null : <Button key={ACTION_PAUSE.id} onClick={() => onActionClick(ACTION_PAUSE)}><ACTION_PAUSE.icon /></Button>}
                <Button onClick={() => setOpenDeleteModal(true)}><ACTION_DELETE.icon /></Button>
                <Button key={ACTION_F_RESUME.id} onClick={() => onActionClick(ACTION_F_RESUME)}><ACTION_F_RESUME.icon /></Button>
                <Button key={ACTION_CHECK.id} onClick={() => onActionClick(ACTION_CHECK)}><ACTION_CHECK.icon /></Button>
            </ButtonGroup>

            <Modal open={openDeleteModal}>
                <Card title='Are you sure you want to delete?'>
                    <Checkbox
                        checked={deleteFiles}
                        onChange={onCheckToggle}
                        value="primary"
                    />

                    <ButtonGroup color="primary">
                        <Button onClick={onConfirmDelete}>Delete</Button>
                        <Button onClick={onCancelDelete}>Cancel</Button>
                    </ButtonGroup>
                </Card>
            </Modal>
        </Card>
    )
}

GeneralTabActions.propTypes = {
    selectedTorrent: PropTypes.any,
    resumeSelectedTorrent: PropTypes.func.isRequired,
    pauseSelectedTorrent: PropTypes.func.isRequired,
    forceResumeSelectedTorrent: PropTypes.func.isRequired,
    checkSelectedTorrent: PropTypes.func.isRequired,
    deleteSelectedTorrent: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        resumeSelectedTorrent: () => dispatch(torrentDetailsActions.resumeSelectedTorrent()),
        pauseSelectedTorrent: () => dispatch(torrentDetailsActions.pauseSelectedTorrent()),
        forceResumeSelectedTorrent: () => dispatch(torrentDetailsActions.forceResumeSelectedTorrent()),
        checkSelectedTorrent: () => dispatch(torrentDetailsActions.checkSelectedTorrent()),
        deleteSelectedTorrent: deleteFiles => dispatch(torrentDetailsActions.deleteSelectedTorrent(deleteFiles)),
    };
}

export default compose(
    connect(
        null,
        mapDispatchToProps
    )
)(GeneralTabActions);

