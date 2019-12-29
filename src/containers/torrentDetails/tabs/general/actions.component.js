import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { ButtonGroup, Button } from '@material-ui/core';

import Card from 'components/card.component';
import { ACTION_RESUME, ACTION_PAUSE, ACTION_DELETE, ACTION_F_RESUME, ACTION_CHECK, DOWNLOADING_STATES } from 'utilities/torrent-states';

function GeneralTabActions({ selectedTorrent }) {
    const onActionClick = useCallback(action => {
        console.log({ action })
    }, []);

    const isPaused = DOWNLOADING_STATES.includes(selectedTorrent.state);

    return (
        <Card title='Actions'>
            <ButtonGroup color="primary">
                {!isPaused ? null : <Button key={ACTION_RESUME.id} onClick={() => onActionClick(ACTION_RESUME)}><ACTION_RESUME.icon /></Button>}
                {isPaused ? null : <Button key={ACTION_PAUSE.id} onClick={() => onActionClick(ACTION_PAUSE)}><ACTION_PAUSE.icon /></Button>}
                <Button key={ACTION_DELETE.id} onClick={() => onActionClick(ACTION_DELETE)}><ACTION_DELETE.icon /></Button>
                <Button key={ACTION_F_RESUME.id} onClick={() => onActionClick(ACTION_F_RESUME)}><ACTION_F_RESUME.icon /></Button>
                <Button key={ACTION_CHECK.id} onClick={() => onActionClick(ACTION_CHECK)}><ACTION_CHECK.icon /></Button>
            </ButtonGroup>
        </Card>
    )
}


GeneralTabActions.propTypes = {
    selectedTorrent: PropTypes.any,
};

export default GeneralTabActions;
