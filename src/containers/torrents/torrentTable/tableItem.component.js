import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, LinearProgress } from '@material-ui/core';

import InfoChip from 'components/fields/infoChip.component';
import SubText from 'components/fields/subText.component';
import { torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

import Speed from './speed.component';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        margin: theme.spacing(1),
        cursor: 'pointer',
    },
    isSelected: {
        border: `3px solid ${theme.palette.primary.main}`,
    },
    button: {
        width: '100%'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    content: {
        flex: '1 0 auto',
        padding: `${theme.spacing(2)}px !important`,
    },
    row: {
        display: 'flex',
        alignItems: 'center',
    },
    rowEnd: {
        flexGrow: 2,
        textAlign: 'right'
    },
    seperated: {
        marginTop: theme.spacing(1)
    },
    title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    speedContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    speeds: {
        display: 'flex',
        alignContent: 'center',
    }
}));

function TableItem({ torrent, selectTorrent, selectedTorrent }) {
    const classes = useStyles();
    const isSelected = selectedTorrent && (Array.isArray(selectedTorrent) ? selectedTorrent.includes(torrent) : selectedTorrent === torrent);

    const onClick = () => {

        // if not in multiselect mode then set selected
        if (!Array.isArray(selectedTorrent)) return selectTorrent(torrent.hash);

        // if removing last torrent then clear out selected
        if (isSelected && selectedTorrent.length === 1) return selectTorrent(null);

        // either remove or add this torrent
        const newSelectedTorrents = (isSelected ? selectedTorrent.filter(t => t !== torrent) : [...selectedTorrent, torrent]).map(t => t.hash);
        selectTorrent(newSelectedTorrents);
    }

    const sizes = `${torrent.completedUi} / ${torrent.totalSizeUi}`;
    const peersRatio = torrent.isDone ? `Ratio: ${torrent.ratio.toFixed(2)}` : `${torrent.num_complete} / ${torrent.num_incomplete} peers`;

    return (
        <Card key={torrent.hash} onClick={onClick} className={clsx(classes.card, {
            [classes.isSelected]: isSelected,
        })}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component='div' className={classes.title}>
                        <div className={classes.torrentName}>{torrent.name}</div>
                    </Typography>

                    <div>
                        <div className={clsx(classes.row, classes.seperated)}>
                            <SubText text={sizes} />
                            <InfoChip label={torrent.percentDone} />
                            {torrent.categoryUi ? <InfoChip label={torrent.categoryUi} /> : null}
                            <SubText text={torrent.etaUi} className={classes.rowEnd} />
                        </div>

                        <div className={classes.seperated}>
                            <LinearProgress
                                className={classes.seperated}
                                variant="determinate"
                                value={torrent.progress * 100}
                            />
                        </div>
                        
                        <div className={clsx(classes.speedContainer, classes.seperated)}>
                            <div>
                                <SubText text={torrent.stateUi} />
                                {<InfoChip label={peersRatio} />}
                            </div>

                            {(torrent.dlspeed || torrent.upspeed) ? (
                                <div className={classes.speeds}>
                                    <Speed 
                                        dlspeed={torrent.dlspeed} 
                                        upspeed={torrent.upspeed} 
                                        dlspeedUi={torrent.dlspeedUi} 
                                        upspeedUi={torrent.upspeedUi} 
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

TableItem.propTypes = {
    torrent: PropTypes.object.isRequired,
    selectTorrent: PropTypes.func.isRequired,
    clearTorrent: PropTypes.func.isRequired,
    selectedTorrent: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const mapStateToProps = state => {
    return {
        selectedTorrent: getSelectedTorrent(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        selectTorrent: torrent => dispatch(torrentDetailsActions.selectTorrent(torrent)),
        clearTorrent: () => dispatch(torrentDetailsActions.clearTorrent()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(TableItem);
