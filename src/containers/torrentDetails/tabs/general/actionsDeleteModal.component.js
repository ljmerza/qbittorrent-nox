import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { Checkbox, FormControlLabel, Box } from '@material-ui/core';
import ConfirmDialog from 'components/confirmDialog.component';

import { torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';

function GeneralTabActionsDelete({
    openDeleteModal,
    setOpenDeleteModal,
    deleteSelectedTorrent,
    deleteCallback,
}) {

    // handle checkbox
    const [deleteFiles, setDeleteFiles] = useState(false);
    const onCheckToggle = () => {
        setDeleteFiles(!deleteFiles);
    }

    const onConfirmDelete = () => {
        setOpenDeleteModal(false);
        deleteSelectedTorrent(deleteFiles);
        if (deleteCallback) deleteCallback();
    };

    return (
        <ConfirmDialog
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onConfirm={onConfirmDelete}
            confirmText='Delete'
            title='Delete Torrent'
        >
            <Box>Are you sure you want to delete torrent?</Box>
            <Box><FormControlLabel control={<Checkbox value={deleteFiles} onClick={onCheckToggle} />} label="Delete File" /></Box>
        </ConfirmDialog>
    )
}

GeneralTabActionsDelete.propTypes = {
    openDeleteModal: PropTypes.any,
    setOpenDeleteModal: PropTypes.func.isRequired,
    deleteSelectedTorrent: PropTypes.func.isRequired,
    deleteCallback: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
    return {
        deleteSelectedTorrent: deleteFiles => dispatch(torrentDetailsActions.deleteSelectedTorrent(deleteFiles)),
    };
}

export default compose(
    connect(
        null,
        mapDispatchToProps
    )
)(GeneralTabActionsDelete);

