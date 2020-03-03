import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { getSettingsInternalRefreshInterval } from 'containers/settings/settings.selectors';
import Text from 'components/fields/text.component';
import { Item } from 'components/grid.component';
import LoadingIndicator from 'components/LoadingIndicator';

import { torrentDetailsActions } from '../torrentDetails.reducer';
import { getPeersInfoLoading, getPeersInfo } from '../torrentDetails.selectors';

import Card from 'components/card.component';

const PeerCard = ({ peer }) => {
    const country = `${peer.country}${peer.country_code ? `(${peer.country_code})` : ''}`;
    
    return (
        <Card title={`${peer.ip}:${peer.port}`}>
            <Item>
                <Text label='Down Speed' disabled value={peer.dlspeedUi} />
            </Item>
            <Item>
                <Text label='Up Speed' disabled value={peer.upspeedUi} />
            </Item>

            <Item>
                <Text label='Downloaded' disabled value={peer.downloadedUi} />
            </Item>
            <Item>
                <Text label='Uploaded' disabled value={peer.uploadedUi} />
            </Item>

            <Item>
                <Text label='Connection' disabled value={peer.connection} />
            </Item>
            <Item>
                <Text label='Flags' disabled value={peer.flags} />
            </Item>

            <Item>
                <Text label='Country' disabled value={country} />
            </Item>
            <Item>
                <Text label='Client' disabled value={peer.client} />
            </Item>

            <Item>
                <Text label='Progress' disabled value={peer.progressUi} />
            </Item>
            <Item>
                <Text label='Relevance' disabled value={peer.relevanceUi} />
            </Item>

            <Item xs={12} sm={12} md={12}>
                <Text label='Files' disabled value={peer.files} />
            </Item>
        </Card>
    )
}

function PeersTab({ refreshInterval, getPeersInfo, loading, data }) {

    useEffect(() => {
        getPeersInfo();
        const timerId = setInterval(() => {
            if (!loading) getPeersInfo();
        }, refreshInterval);
        return () => clearInterval(timerId);
    }, [getPeersInfo, refreshInterval, loading]);


    if (!data && loading) {
        return <LoadingIndicator noOverlay />
    } else if (!data || data.length === 0) {
        return null;
    }

    return data.map(tracker => <PeerCard key={tracker.ip} peer={tracker} />)
}


PeersTab.propTypes = {
    refreshInterval: PropTypes.number.isRequired,
    getPeersInfo: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        refreshInterval: getSettingsInternalRefreshInterval(state),
        loading: getPeersInfoLoading(state),
        data: getPeersInfo(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getPeersInfo: () => dispatch(torrentDetailsActions.getPeersInfo()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(PeersTab);
