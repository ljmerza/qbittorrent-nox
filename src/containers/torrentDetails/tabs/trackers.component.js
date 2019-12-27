import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

import SubText from '../../../components/fields/subText.component';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { torrentDetailsActions } from '../torrentDetails.reducer';
import { getTrackersInfoLoading, getTrackersInfo } from '../torrentDetails.selectors';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1),
    },
    url: {
        wordBreak: 'break-all',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
}));

const SIDEBAR_TAB_HEIGHT = 100;

const PeerCard = ({ peer, classes }) => {
    return (
        <Card key={peer.url} className={classes.card}>
            <CardContent>
                <Typography component="h6" variant="h6" className={classes.url}>
                    {peer.url}
                </Typography>
                <div className={classes.details}>
                    <SubText variant="subtitle1" text={`seed/peer: ${peer.num_seeds}/${peer.num_peers}`} />
                    <SubText variant="subtitle1" text={`Leechers: ${peer.num_leeches}`} />
                    <SubText variant="subtitle1" text={`Downloaded: ${peer.num_downloaded}`} />
                </div>
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


    if (!data && loading) {
        return <LoadingIndicator />
    } else if (!data) {
        return null;
    }

    return (
        <Virtuoso
            style={{ height: `calc(100vh - ${SIDEBAR_TAB_HEIGHT}px)` }}
            totalCount={data.length}
            item={index => <PeerCard peer={data[index]} classes={classes} />}
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
        refreshInterval: 5000,
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
