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
import { getPeersInfoLoading, getPeersInfo } from '../torrentDetails.selectors';
import { getConfigInternalRefreshInterval } from '../../config/config.selectors';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1),
    },
    ip: {
        wordBreak: 'break-all',
    },
}));

const SIDEBAR_TAB_HEIGHT = 100;

const PeerCard = ({ peer, classes }) => {
    let country = peer.country;
    if (peer.country_code){
        country += ` (${peer.country_code})`;
    }
    return (
        <Card key={peer.ip} className={classes.card}>
            <CardContent>
                <Typography component="h6" variant="h6" className={classes.ip}>
                    {peer.ip}:{peer.port}
                </Typography>
                <Container>
                    <Item>
                        <Text label='Down Speed' disabled value={`${peer.dlspeedUi}/s`} />
                    </Item>
                    <Item>
                        <Text label='Up Speed' disabled value={`${peer.upspeedUi}/s`} />
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

                    <Item>
                        <Text label='Flags' disabled value={peer.flags} />
                    </Item>
                    <Item>
                        <Text label='Flags' disabled value={peer.flags} />
                    </Item>

                    <Item xs={12} sm={12}>
                        <Text label='Files' disabled value={peer.filesfiles} />
                    </Item>
                </Container>
            </CardContent>
        </Card>
    )
}

function PeersTab({ refreshInterval, getPeersInfo, loading, data }) {
    const classes = useStyles();

    useEffect(() => {
        getPeersInfo();
        let timerId = setInterval(getPeersInfo, refreshInterval);
        return () => clearInterval(timerId);
    }, [getPeersInfo, refreshInterval]);


    if (!data.length && loading) {
        return <LoadingIndicator noOverlay />
    } else if (!data.length) {
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


PeersTab.propTypes = {
    refreshInterval: PropTypes.number.isRequired,
    getPeersInfo: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        refreshInterval: getConfigInternalRefreshInterval(state),
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
