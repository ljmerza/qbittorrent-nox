import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';

import Card from '../../../components/card.component';
import Text from '../../../components/fields/text.component';
import { Item } from '../../../components/grid.component';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { torrentDetailsActions } from '../torrentDetails.reducer';
import { getTrackersInfoLoading, getTrackersInfo } from '../torrentDetails.selectors';
import { getConfigInternalRefreshInterval } from '../../config/config.selectors';

const SIDEBAR_TAB_HEIGHT = 100;

const TrackerCard = ({ peer }) => {
    return (
        <Card key={peer.url} title={peer.url}>
            <Item>
                <Text label='Tier' disabled value={peer.tier} />
            </Item>
            <Item>
                <Text label='Seeds' disabled value={peer.num_seeds} />
            </Item>
            <Item>
                <Text label='Peers' disabled value={peer.num_peers} />
            </Item>
            <Item>
                <Text label='Leeches' disabled value={peer.num_leeches} />
            </Item>
            <Item>
                <Text label='Downloaded' disabled value={peer.num_downloaded} />
            </Item>
            <Item xs={12} sm={12} md={12}>
                <Text label='Status' disabled value={peer.statusUi} />
            </Item>
            <Item xs={12} sm={12} md={12}>
                <Text label='Message' disabled value={peer.msg} />
            </Item>
        </Card>
    )
}
function TrackersTab({ refreshInterval, getTrackersInfo, loading, data }) {

    useEffect(() => {
        getTrackersInfo();
        let timerId = setInterval(getTrackersInfo, refreshInterval);
        return () => clearInterval(timerId);
    }, [getTrackersInfo, refreshInterval]);


    if (!data.length && loading) {
        return <LoadingIndicator noOverlay />
    } else if (!data.length) {
        return null;
    }

    return (
        <Virtuoso
            style={{ height: `calc(100vh - ${SIDEBAR_TAB_HEIGHT}px)` }}
            totalCount={data.length}
            item={index => <TrackerCard peer={data[index]} />}
        />
    )
}


TrackersTab.propTypes = {
    refreshInterval: PropTypes.number.isRequired,
    getTrackersInfo: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        refreshInterval: getConfigInternalRefreshInterval(state),
        loading: getTrackersInfoLoading(state),
        data: getTrackersInfo(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getTrackersInfo: () => dispatch(torrentDetailsActions.getTrackersInfo()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(TrackersTab);
