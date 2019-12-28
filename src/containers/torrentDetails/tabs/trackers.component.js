import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

import Text from '../../../components/fields/text.component';
import { Container, Item } from '../../../components/grid.component';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { torrentDetailsActions } from '../torrentDetails.reducer';
import { getTrackersInfoLoading, getTrackersInfo } from '../torrentDetails.selectors';
import { getConfigInternalRefreshInterval } from '../../config/config.selectors';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1),
    },
    url: {
        wordBreak: 'break-all',
    },
}));

const SIDEBAR_TAB_HEIGHT = 100;

const TrackerCard = ({ peer, classes }) => {
    return (
        <Card key={peer.url} className={classes.card}>
            <CardContent>
                <Typography component="h6" variant="h6" className={classes.url}>
                    {peer.url}
                </Typography>
                <Container>
                    <Item>
                        <Text label='Seeds' disabled value={peer.num_seeds} />
                    </Item>
                    <Item>
                        <Text label='Peers' disabled value={peer.num_peers} />
                    </Item>
                    <Item>
                        <Text label='Downloaded' disabled value={peer.num_downloaded} />
                    </Item>
                    <Item xs={12} sm={12}>
                        <Text label='Message' disabled value={peer.msg} />
                    </Item>
                </Container>
            </CardContent>
        </Card>
    )
}

function TrackersTab({ refreshInterval, getTrackersInfo, loading, data }) {
    const classes = useStyles();

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
            item={index => <TrackerCard peer={data[index]} classes={classes} />}
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
