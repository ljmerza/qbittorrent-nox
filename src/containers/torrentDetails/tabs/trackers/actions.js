import React, { useState } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

import { ACTION_DELETE, ACTION_ADD } from 'utilities/torrent-states';
import Card from 'components/card.component';
import TrackerTabActionsAdd from './addTrackerModal.component';
import TrackerTabActionsDelete from './deleteTrackerModal.component';

function TrackerTabActions() {
    const [openAddTracker, setOpenAddTracker] = useState(false);
    const [openDeleteTrackers, setOpenDeleteTrackers] = useState(false);
    
    return (
        <Card title='Actions'>
            <ButtonGroup color="primary">
                <Button onClick={() => setOpenAddTracker(true)}><ACTION_ADD.icon /></Button>
                <Button onClick={() => setOpenDeleteTrackers(true)}><ACTION_DELETE.icon /></Button>
            </ButtonGroup>

            <TrackerTabActionsAdd openAddTracker={openAddTracker} setOpenAddTracker={setOpenAddTracker} />
            <TrackerTabActionsDelete openDeleteTrackers={openDeleteTrackers} setOpenDeleteTrackers={setOpenDeleteTrackers} />
        </Card>
    )
}

export default TrackerTabActions;
