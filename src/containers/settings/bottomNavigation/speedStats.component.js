import React, { useState} from 'react';
import { Typography } from '@material-ui/core';

import Speed from 'components/speed.component';
import ConfirmDialog from 'components/confirmDialog.component';
import Stats from 'components/stats/stats.component';

function SpeedStats() {
    const [openStatsModal, setOpenStatsModal] = useState(false);
    const toggleStatsModal = () => {
        console.log('test')
        setOpenStatsModal(!openStatsModal);
    }

    return (
        <>  
            <div onClick={toggleStatsModal}>
                <Speed />
            </div>

            <ConfirmDialog
                open={openStatsModal}
                onClose={toggleStatsModal}
                confirmText='Close'
                fullWidth
                hideCancel
                maxWidth='md'
                title={<Typography gutterBottom>Statistics</Typography>}
            >
                <Stats />
            </ConfirmDialog>
        </>
    )
}

export default SpeedStats;
