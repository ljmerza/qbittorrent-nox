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

function GeneralTabTransfer({ generalInfo, changeUploadLimit, changeDownloadLimit }) {

    const onChangeDownloadLimit = ({ target: { value } }) => changeDownloadLimit(value);
    const onChangeUploadLimit = ({ target: { value } }) => changeUploadLimit(value);

    return (
        <Card title='Transfer'>
            <Item>
                <Text label='Seeds' disabled value={`${generalInfo.seeds} (${generalInfo.seeds_total})`} />
            </Item>
            <Item>
                <Text label='Peers' disabled value={`${generalInfo.peers} (${generalInfo.peers_total})`} />
            </Item>
            <Item>
                <Text label='Downloaded' disabled value={`${generalInfo.totalDownloadedUi} (${generalInfo.totalDownloadedSessionUi} session)`} />
            </Item>
            <Item>
                <Text label='Uploaded' disabled value={`${generalInfo.totalDownloadedUi} (${generalInfo.totalUploadedSessionUi} session)`} />
            </Item>
            <Item>
                <Text label='Wasted' disabled value={generalInfo.totalWastedUi} />
            </Item>
            <Item>
                <Text label='Ratio' disabled value={generalInfo.share_ratio.toFixed(2)} />
            </Item>
            <Item>
                <Text label='Download Speed (Avg)' disabled value={`${generalInfo.dlSpeedUi} (${generalInfo.dlSpeedAvgUi})`} />
            </Item>
            <Item>
                <InfinityText 
                    Component={TextSave} 
                    label={`Download Limit (${generalInfo.dlLimitUi})`} 
                    name='dl_limit' 
                    value={generalInfo.dl_limit} 
                    emptyValue 
                    onSave={onChangeDownloadLimit}
                />
            </Item>
            <Item>
                <Text label='Upload Speed (Avg)' disabled value={`${generalInfo.upSpeedUi} (${generalInfo.upSpeedAvgUi})`} />
            </Item>
            <Item>
                <InfinityText 
                    Component={TextSave} 
                    label={`Upload Limit (${generalInfo.upLimitUi})`} 
                    name='up_limit' 
                    value={generalInfo.up_limit} 
                    emptyValue 
                    onSave={onChangeUploadLimit}
                />
            </Item>
        </Card>
    )
}


GeneralTabTransfer.propTypes = {
    generalInfo: PropTypes.any
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
