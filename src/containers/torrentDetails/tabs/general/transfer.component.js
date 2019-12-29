import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import { Item } from 'components/grid.component';


function GeneralTabTransfer({ onChange, data, changedFields, setChangedFields }) {

    // editable values
    const downLimit = changedFields.dl_limit === undefined ? data.dl_limit : changedFields.dl_limit;
    const upLimit = changedFields.up_limit === undefined ? data.up_limit : changedFields.up_limit;

    return (
        <Card title='Transfer'>
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
        </Card>
    )
}


GeneralTabTransfer.propTypes = {
    onChange: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired, 
    changedFields: PropTypes.object.isRequired, 
    setChangedFields: PropTypes.func.isRequired
};

export default GeneralTabTransfer;
