import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { FormControl, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

import ConfirmDialog from 'components/confirmDialog.component';
import { torrentDetailsActions } from '../../torrentDetails.reducer';
import { getTrackersInfoNoDht } from '../../torrentDetails.selectors';

function TrackerTabActionsDelete({ trackerDelete, openDeleteTrackers, setOpenDeleteTrackers, trackersNoDht }) {
    const [deletedTrackers, setDeletedTrackers] = useState([]);

    const toggleDeletedTracker = ({ target: { value } }) => {
        const isChecked = deletedTrackers.includes(value);

        let newTrackers = [];
        if (isChecked) newTrackers = deletedTrackers.filter(url => url !== value);
        else newTrackers = [...deletedTrackers, value];

        setDeletedTrackers(newTrackers);
    }

    const onConfirmDelete = () => {
        setOpenDeleteTrackers(false);
        trackerDelete(deletedTrackers);
    };
    const onCancelDelete = () => {
        setOpenDeleteTrackers(false);
        setDeletedTrackers([]);
    }


    return (
        <ConfirmDialog
            open={openDeleteTrackers}
            onClose={onCancelDelete}
            onConfirm={onConfirmDelete}
            confirmText='Delete'
            maxWidth='md'
            title='Delete Trackers'
        >
            <FormControl component="fieldset">
                <FormGroup>
                    {trackersNoDht.map(tracker => {
                        const isChecked = deletedTrackers.includes(tracker.url);
                        return (
                            <FormControlLabel
                                key={tracker.url}
                                control={<Checkbox checked={isChecked} onChange={toggleDeletedTracker} value={tracker.url} />}
                                label={tracker.url}
                            />
                        );
                    })}
                </FormGroup>
            </FormControl>
        </ConfirmDialog>
    )
}

TrackerTabActionsDelete.propTypes = {
    trackerDelete: PropTypes.func.isRequired,
    openDeleteTrackers: PropTypes.bool.isRequired,
    setOpenDeleteTrackers: PropTypes.func.isRequired,
    trackersNoDht: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
    return {
        trackersNoDht: getTrackersInfoNoDht(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        trackerDelete: urls => dispatch(torrentDetailsActions.trackerDelete({ urls })),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(TrackerTabActionsDelete);

