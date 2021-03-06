import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { getSettingsInternalRefreshInterval } from 'containers/settings/settings.selectors';
import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import ZeroText from 'components/fields/zeroText.component';
import TextSave from 'components/fields/textSave.component';
import { Item } from 'components/grid.component';
import LoadingIndicator from 'components/LoadingIndicator';

import { torrentDetailsActions } from '../torrentDetails.reducer';
import { getTrackersInfoLoading, getTrackersInfo } from '../torrentDetails.selectors';
import TrackerActions from './trackers/actions';
import { DHT_TRACKERS } from './trackers/tools';

const TrackerCard = ({ tracker, trackerEditUrl }) => {

    const isDhtTracker = DHT_TRACKERS.includes(tracker.url);
    const UrlText = isDhtTracker ? TextSave : TextSave;

    const onSave = ({ target: { value } }) => trackerEditUrl(tracker.url, value);

    return (
        <Card>
            <Item xs={12} sm={12} md={12}>
                <UrlText label='Url' disabled={isDhtTracker} value={tracker.url} onSave={onSave}/>
            </Item>
            <Item>
                <Text label='Tier' disabled value={tracker.tier} />
            </Item>
            <Item>
                <ZeroText label='Seeds' disabled value={tracker.num_seeds} />
            </Item>
            <Item>
                <ZeroText label='Peers' disabled value={tracker.num_trackers} />
            </Item>
            <Item>
                <ZeroText label='Leeches' disabled value={tracker.num_leeches} />
            </Item>
            <Item>
                <ZeroText label='Downloaded' disabled value={tracker.num_downloaded} />
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

class TrackersTab extends PureComponent {
    componentDidMount() {
        this.timerId = setInterval(() => {
            if (!this.props.loading) this.props.getTrackersInfo();
        }, this.props.refreshInterval);
    }

    componentWillUnmount() {
        if (this.timerId) clearInterval(this.timerId);
    }

    render() {
        if (!this.props.data && this.props.loading) {
            return (
                <>
                    <TrackerActions />
                    <LoadingIndicator noOverlay />
                </>
            );
        } else if (!this.props.data || this.props.data.length === 0) {
            return null;
        }

        return (
            <>
                <TrackerActions trackers={this.props.data} />
                {this.props.data.map(tracker => <TrackerCard key={tracker.url} tracker={tracker} trackerEditUrl={this.props.trackerEditUrl} />)}
            </>
        );
    }
}

TrackersTab.propTypes = {
    refreshInterval: PropTypes.number.isRequired,
    getTrackersInfo: PropTypes.func.isRequired,
    trackerEditUrl: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        refreshInterval: getSettingsInternalRefreshInterval(state),
        loading: getTrackersInfoLoading(state),
        data: getTrackersInfo(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getTrackersInfo: () => dispatch(torrentDetailsActions.getTrackersInfo()),
        trackerEditUrl: (origUrl, newUrl) => dispatch(torrentDetailsActions.trackerEditUrl({ origUrl, newUrl })),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(TrackersTab);
