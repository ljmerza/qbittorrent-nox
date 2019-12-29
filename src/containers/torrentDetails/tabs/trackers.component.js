import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { getConfigInternalRefreshInterval } from 'containers/config/config.selectors';
import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import { Item } from 'components/grid.component';
import LoadingIndicator from 'components/LoadingIndicator';

import { torrentDetailsActions } from '../torrentDetails.reducer';
import { getTrackersInfoLoading, getTrackersInfo } from '../torrentDetails.selectors';

const TrackerCard = ({ tracker }) => {
    return (
        <Card key={tracker.url} title={tracker.url}>
            <Item>
                <Text label='Tier' disabled value={tracker.tier} />
            </Item>
            <Item>
                <Text label='Seeds' disabled value={tracker.num_seeds} />
            </Item>
            <Item>
                <Text label='Peers' disabled value={tracker.num_trackers} />
            </Item>
            <Item>
                <Text label='Leeches' disabled value={tracker.num_leeches} />
            </Item>
            <Item>
                <Text label='Downloaded' disabled value={tracker.num_downloaded} />
            </Item>
            <Item xs={12} sm={12} md={12}>
                <Text label='Status' disabled value={tracker.statusUi} />
            </Item>
            <Item xs={12} sm={12} md={12}>
                <Text label='Message' disabled value={tracker.msg} />
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

    return data.map(tracker => <TrackerCard key={tracker.url} tracker={tracker} />);
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
