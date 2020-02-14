import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { ButtonGroup, Button } from '@material-ui/core';

import { 
    ACTION_RESUME, ACTION_PAUSE, ACTION_DELETE, ACTION_CHECK,
    PAUSED_STATES, FORCED_STATES, ACTION_F_RESUME,
} from 'utilities/torrent-states';
import Card from 'components/card.component';
import { torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import GeneralTabActionsDelete from './actionsDeleteModal.component';

function GeneralTabActions({ 
    selectedTorrent,
    resumeSelectedTorrent,
    pauseSelectedTorrent,
    forceResumeSelectedTorrent,
    checkSelectedTorrent,
 }) {
    
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const isPaused = PAUSED_STATES.includes(selectedTorrent.state) || FORCED_STATES.includes(selectedTorrent.state);

    return (
        <Card title='Actions'>
            <ButtonGroup color="primary">
                {!isPaused ? null : <Button key={ACTION_RESUME.id} onClick={resumeSelectedTorrent}><ACTION_RESUME.icon /></Button>}
                {isPaused ? null : <Button key={ACTION_PAUSE.id} onClick={pauseSelectedTorrent}><ACTION_PAUSE.icon /></Button>}
                <Button onClick={() => setOpenDeleteModal(true)}><ACTION_DELETE.icon /></Button>
                <Button key={ACTION_F_RESUME.id} onClick={forceResumeSelectedTorrent}><ACTION_F_RESUME.icon /></Button>
                <Button key={ACTION_CHECK.id} onClick={checkSelectedTorrent}><ACTION_CHECK.icon /></Button>
            </ButtonGroup>

            <GeneralTabActionsDelete openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />
        </Card>
    )
}

GeneralTabActions.propTypes = {
    selectedTorrent: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    resumeSelectedTorrent: PropTypes.func.isRequired,
    pauseSelectedTorrent: PropTypes.func.isRequired,
    forceResumeSelectedTorrent: PropTypes.func.isRequired,
    checkSelectedTorrent: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        resumeSelectedTorrent: () => dispatch(torrentDetailsActions.resumeSelectedTorrent()),
        pauseSelectedTorrent: () => dispatch(torrentDetailsActions.pauseSelectedTorrent()),
        forceResumeSelectedTorrent: () => dispatch(torrentDetailsActions.forceResumeSelectedTorrent()),
        checkSelectedTorrent: () => dispatch(torrentDetailsActions.checkSelectedTorrent()),
    };
}

export default compose(
    connect(
        null,
        mapDispatchToProps
    )
)(GeneralTabActions);

