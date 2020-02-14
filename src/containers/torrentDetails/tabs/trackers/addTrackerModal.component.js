import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';

import Text from 'components/fields/text.component';
import ConfirmDialog from 'components/confirmDialog.component';
import { torrentDetailsActions } from '../../torrentDetails.reducer';

function TrackerTabActionsAdd({ trackerAdd, openAddTracker, setOpenAddTracker }) {
    const [newTrackers, setNewTrackers] = useState('');

    const onConfirmAdd = () => {
        setOpenAddTracker(false);
        trackerAdd(newTrackers);
        setNewTrackers('');
    };

    const onCancelAdd = () => {
        setOpenAddTracker(false);
        setNewTrackers('');
    }

    return (
        <ConfirmDialog
            open={openAddTracker}
            onClose={onCancelAdd}
            onConfirm={onConfirmAdd}
            confirmText='Add'
            fullWidth
            maxWidth='md'
            title={<Typography gutterBottom>Add Trackers (one per line)</Typography>}
        >
            <Text
                label=''
                value={newTrackers}
                onChange={({ target: { value } }) => setNewTrackers(value)}
                multiline
                emptyValue
                autoFocus
                rows='5'
            />

        </ConfirmDialog>
    )
}

TrackerTabActionsAdd.propTypes = {
    trackerAdd: PropTypes.func.isRequired,
    openAddTracker: PropTypes.bool.isRequired,
    setOpenAddTracker: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
    return {
        trackerAdd: urls => dispatch(torrentDetailsActions.trackerAdd({ urls })),
    };
}

export default compose(
    connect(
        null,
        mapDispatchToProps
    )
)(TrackerTabActionsAdd);

