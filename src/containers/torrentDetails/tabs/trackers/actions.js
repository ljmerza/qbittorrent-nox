import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import {
    ButtonGroup, Button, Typography, FormControl, 
    FormGroup, FormControlLabel, Checkbox 
} from '@material-ui/core';

import { ACTION_DELETE, ACTION_ADD } from 'utilities/torrent-states';

import Text from 'components/fields/text.component';
import Card from 'components/card.component';
import ConfirmDialog from 'components/confirmDialog.component';
import { torrentDetailsActions } from '../../torrentDetails.reducer';
import { getTrackersInfoNoDht } from '../../torrentDetails.selectors';

function TrackerTabActions({ trackersNoDht, trackerAdd, trackerDelete }) {

    // adding trackers
    const [openAddTracker, setOpenAddTracker] = useState(false);
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

    // deleting trackers
    const [openDeleteTrackers, setOpenDeleteTrackers] = useState(false);
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
        <Card title='Actions'>
            <ButtonGroup color="primary">
                <Button onClick={() => setOpenAddTracker(true)}><ACTION_ADD.icon /></Button>
                <Button onClick={() => setOpenDeleteTrackers(true)}><ACTION_DELETE.icon /></Button>
            </ButtonGroup>

            <ConfirmDialog
                open={openAddTracker}
                onClose={onCancelAdd}
                onConfirm={onConfirmAdd}
                confirmText='Add'
                fullWidth
                maxWidth='md'
                title={<Typography  gutterBottom>Add Trackers (one per line)</Typography>}
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
        </Card>
    )
}

TrackerTabActions.propTypes = {
    trackerAdd: PropTypes.func.isRequired,
    trackerDelete: PropTypes.func.isRequired,
    trackers: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
    return {
        trackersNoDht: getTrackersInfoNoDht(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        trackerAdd: urls => dispatch(torrentDetailsActions.trackerAdd({ urls })),
        trackerDelete: urls => dispatch(torrentDetailsActions.trackerDelete({ urls })),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(TrackerTabActions);

