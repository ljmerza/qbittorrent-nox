import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { ButtonGroup, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { 
    ACTION_RESUME, ACTION_PAUSE, ACTION_DELETE, ACTION_CHECK,
    PAUSED_STATES, FORCED_STATES, ACTION_F_RESUME, ACTION_CLEAR,
    ACTION_AUTO_MANAGE, ACTION_PIECE_PRIORITY, ACTION_SEQUENTIAL,
    ACTION_REANNOUCE, ACTION_SUPER_SEED,
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
 }) {
    
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const isPaused = PAUSED_STATES.includes(selectedTorrent.state) || FORCED_STATES.includes(selectedTorrent.state);

    const _resumeSelectedTorrent = () => {
        resumeSelectedTorrent();
    }

    const _pauseSelectedTorrent = () => {
        pauseSelectedTorrent();
    }

    const _forceResumeSelectedTorrent = () => {
        forceResumeSelectedTorrent();
    }

    const _checkSelectedTorrent = () => {
        checkSelectedTorrent();
    }

    const _clearSelected = () => {
        this.props.selectTorrent(null);
    }

    const _autoManageSelectedTorrent = () => {
        autoManageSelectedTorrent();
    }

    const _piecePrioritySelectedTorrent = () => {
        piecePrioritySelectedTorrent();
    }

    const _sequentialSelectedTorrent = () => {
        sequentialSelectedTorrent();
    }

    const _reannouceSelectedTorrent = () => {
        reannouceSelectedTorrent();
    }

    const _superSeedSelectedTorrent = () => {
        superSeedSelectedTorrent();
    }


    const startStop = isPaused ? 
        <Button key={ACTION_PAUSE.id} onClick={_pauseSelectedTorrent} startIcon={<ACTION_PAUSE.icon/>}>{ACTION_PAUSE.name}</Button> 
        : <Button key={ACTION_RESUME.id} onClick={_resumeSelectedTorrent} startIcon={<ACTION_RESUME.icon/>}>{ACTION_RESUME.name}</Button>

    return (
        <Card title='Actions'>
            <ButtonGroup color="primary" orientation="vertical" size='large' fullWidth className={classes.buttonGroup}>
                {startStop}
                <Button onClick={() => setOpenDeleteModal(true)} startIcon={<ACTION_DELETE.icon/>}>{ACTION_DELETE.name}</Button>
                <Button onClick={_forceResumeSelectedTorrent} startIcon={<ACTION_F_RESUME.icon/>}>{ACTION_F_RESUME.name}</Button>
                <Button onClick={_checkSelectedTorrent} startIcon={<ACTION_CHECK.icon/>}>{ACTION_CHECK.name}</Button>
                <Button onClick={_autoManageSelectedTorrent} startIcon={<ACTION_AUTO_MANAGE.icon/>}>{ACTION_AUTO_MANAGE.name}</Button>
                <Button onClick={_piecePrioritySelectedTorrent} startIcon={<ACTION_PIECE_PRIORITY.icon/>}>{ACTION_PIECE_PRIORITY.name}</Button>
                <Button onClick={_sequentialSelectedTorrent} startIcon={<ACTION_SEQUENTIAL.icon/>}>{ACTION_SEQUENTIAL.name}</Button>
                <Button onClick={_reannouceSelectedTorrent} startIcon={<ACTION_REANNOUCE.icon/>}>{ACTION_REANNOUCE.name}</Button>
                <Button onClick={_superSeedSelectedTorrent} startIcon={<ACTION_SUPER_SEED.icon/>}>{ACTION_SUPER_SEED.name}</Button>
                <Button onClick={_clearSelected} startIcon={<ACTION_CLEAR.icon/>}>{ACTION_CLEAR.name}</Button>
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
    autoManageSelectedTorrent: PropTypes.func.isRequired,
    piecePrioritySelectedTorrent: PropTypes.func.isRequired,
    sequentialSelectedTorrent: PropTypes.func.isRequired,
    reannouceSelectedTorrent: PropTypes.func.isRequired,
    superSeedSelectedTorrent: PropTypes.func.isRequired,
    checkSelectedTorrent: PropTypes.func.isRequired,
};

const styles = theme => ({
    buttonGroup: {
        marginTop: theme.spacing(2)
    }
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

    };
}

export default compose(
    withStyles(styles),
    connect(
        null,
        mapDispatchToProps
    )
)(GeneralTabActions);

