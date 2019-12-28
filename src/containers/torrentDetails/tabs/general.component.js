import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

import Text from '../../../components/fields/text.component';
import { Container, Item } from '../../../components/grid.component';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { torrentDetailsActions } from '../torrentDetails.reducer';
import { getGeneralInfoLoading, getGeneralInfo, getSelectedTorrent } from '../torrentDetails.selectors';
import { getConfigInternalRefreshInterval } from '../../config/config.selectors';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1),
    },
}));

function GeneralTab({ refreshInterval, getGeneralInfo, loading, data, selectedTorrent }){
    const classes = useStyles();
    const [ changedFields, setChangedFields ] = useState({})

    useEffect(() => {
        getGeneralInfo();
        let timerId = setInterval(getGeneralInfo, refreshInterval);
        return () => clearInterval(timerId);
    }, [getGeneralInfo, refreshInterval]);

    const onChange = ({ target: { name, value } }) => {
        const numbersOnly = ['dl_limit', 'up_limit'].includes(name);
        if(numbersOnly) value = value.replace(/\D/g, '');

        setChangedFields({ ...changedFields, [name]: value });
    }


    if (!data && loading){
        return <LoadingIndicator noOverlay />
    } else if (!data || !selectedTorrent){
        return null;
    }

    // editable values
    const name = changedFields.name === undefined ? selectedTorrent.name : changedFields.name;
    const savePath = changedFields.save_path === undefined ? data.save_path : changedFields.save_path;

    const downLimit = changedFields.dl_limit === undefined ? data.dl_limit : changedFields.dl_limit;
    const upLimit = changedFields.up_limit === undefined ? data.up_limit : changedFields.up_limit;

    return ( 
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Typography component="h6" variant="h6">Information</Typography>
                    <Container>
                        <Item xs={12} sm={12}>
                            <Text label='Name' name='name' onChange={onChange} value={name} />
                        </Item>
                        <Item xs={12} sm={12}>
                            <Text label='Save Path' name='save_path' onChange={onChange} value={savePath} />
                        </Item>
                        <Item>
                            <Text label='Time Active' disabled value={data.timeElapsedUi} />
                        </Item>
                        <Item>
                            <Text label='ETA' disabled value={data.etaUi} />
                        </Item>
                        <Item>
                            <Text label='Added On' disabled value={data.additionDateUi} />
                        </Item>
                        <Item>
                            <Text label='Completed On' disabled value={data.completionDateUi} />
                        </Item>
                        <Item>
                            <Text label='Last Seen Complete' disabled value={data.lastSeenUi} />
                        </Item>
                        <Item>
                            <Text label='Pieces' disabled value={`${data.pieces_num} x ${data.pieceSizeUi} (have ${data.pieces_have})`} />
                        </Item>
                        <Item>
                            <Text label='Created By' disabled value={data.created_by} />
                        </Item>
                        <Item>
                            <Text label='Reannounce In' disabled value={data.reannounceUi} />
                        </Item>
                        <Item xs={12}>
                            <Text label='Comment' disabled value={data.comment} />
                        </Item>
                    </Container>
                </CardContent>
            </Card>

            <Card className={classes.card}>
                <CardContent>
                    <Typography component="h6" variant="h6">Transfer</Typography>
                    <Container>
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
                    </Container>
                </CardContent>
            </Card>
        </>
    )
}


GeneralTab.propTypes = {
    refreshInterval: PropTypes.number.isRequired,
    getGeneralInfo: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
    selectedTorrent: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        refreshInterval: getConfigInternalRefreshInterval(state),
        loading: getGeneralInfoLoading(state),
        data: getGeneralInfo(state),
        selectedTorrent: getSelectedTorrent(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getGeneralInfo: () => dispatch(torrentDetailsActions.getGeneralInfo()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(GeneralTab);
