import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, Typography } from '@material-ui/core';

import Text from '../../../../components/fields/text.component';
import { Container, Item } from '../../../../components/grid.component';


function GeneralTabTransfer({ classes, onChange, data, changedFields, setChangedFields }) {

    // editable values
    const downLimit = changedFields.dl_limit === undefined ? data.dl_limit : changedFields.dl_limit;
    const upLimit = changedFields.up_limit === undefined ? data.up_limit : changedFields.up_limit;

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography component="h6" variant="h6">Transfer</Typography>
                <Container>
                    <Item>
                        <Text label='Seeds' disabled value={`${data.seeds} (${data.seeds_total})`} />
                    </Item>
                    <Item>
                        <Text label='Peers' disabled value={`${data.peers} (${data.peers_total})`} />
                    </Item>
                    <Item>
                        <Text label='Downloaded' disabled value={`${data.totalDownloadedUi} (${data.totalDownloadedSessionUi} session)`} />
                    </Item>
                    <Item>
                        <Text label='Uploaded' disabled value={`${data.totalDownloadedUi} (${data.totalUploadedSessionUi} session)`} />
                    </Item>
                    <Item>
                        <Text label='Wasted' disabled value={data.totalWastedUi} />
                    </Item>
                    <Item>
                        <Text label='Ratio' disabled value={data.share_ratio.toFixed(2)} />
                    </Item>
                    <Item>
                        <Text label='Download Speed (Avg)' disabled value={`${data.dlSpeedUi} (${data.dlSpeedAvgUi})`} />
                    </Item>
                    <Item>
                        <Text label={`Download Limit (${data.dlLimitUi}/s)`} name='dl_limit' onChange={onChange} value={downLimit} />
                    </Item>
                    <Item>
                        <Text label='Upload Speed (Avg)' disabled value={`${data.upSpeedUi} (${data.upSpeedAvgUi})`} />
                    </Item>
                    <Item>
                        <Text label={`Upload Limit (${data.upLimitUi}/s)`} name='up_limit' onChange={onChange} value={upLimit} />
                    </Item>
                </Container>
            </CardContent>
        </Card>
    )
}


GeneralTabTransfer.propTypes = {
    classes: PropTypes.object.isRequired, 
    onChange: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired, 
    changedFields: PropTypes.object.isRequired, 
    setChangedFields: PropTypes.func.isRequired
};

export default GeneralTabTransfer;
