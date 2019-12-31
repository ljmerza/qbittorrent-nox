import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import InfinityText from 'components/fields/infinityText.component';
import TextSave from 'components/fields/textSave.component';
import { Item } from 'components/grid.component';

import { torrentDetailsActions } from '../../torrentDetails.reducer';

function GeneralTabTransfer({ data, changeUploadLimit, changeDownloadLimit }) {

    const onChangeDownloadLimit = ({ target: { value } }) => changeDownloadLimit(value);
    const onChangeUploadLimit = ({ target: { value } }) => changeUploadLimit(value);

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
                <InfinityText 
                    Component={TextSave} 
                    label={`Download Limit (${data.dlLimitUi})`} 
                    name='dl_limit' 
                    value={data.dl_limit} 
                    emptyValue 
                    onSave={onChangeDownloadLimit}
                />
            </Item>
            <Item>
                <Text label='Upload Speed (Avg)' disabled value={`${data.upSpeedUi} (${data.upSpeedAvgUi})`} />
            </Item>
            <Item>
                <InfinityText 
                    Component={TextSave} 
                    label={`Upload Limit (${data.upLimitUi})`} 
                    name='up_limit' 
                    value={data.up_limit} 
                    emptyValue 
                    onSave={onChangeUploadLimit}
                />
            </Item>
        </Card>
    )
}


GeneralTabTransfer.propTypes = {
    data: PropTypes.any
};

function mapDispatchToProps(dispatch) {
    return {
        changeUploadLimit: limit => dispatch(torrentDetailsActions.changeUploadLimit(limit)),
        changeDownloadLimit: limit => dispatch(torrentDetailsActions.changeDownloadLimit(limit)),
    };
}

export default compose(
    connect(
        null,
        mapDispatchToProps
    )
)(GeneralTabTransfer);
