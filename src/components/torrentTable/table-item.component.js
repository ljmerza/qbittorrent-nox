import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, LinearProgress } from '@material-ui/core';

import InfoChip from '../fields/infoChip.component';
import SubText from '../fields/subText.component';
import SpeedIcon from '../speedIcon.component';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        margin: theme.spacing(1),
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
    },
    row: {
        display: 'flex',
        alignItems: 'center',
    },
    rowEnd: {
        flexGrow: 2,
        textAlign: 'right'
    },
    infoButton: {
        cursor: 'pointer',
        marginLeft: theme.spacing(1),
    },
    seperated: {
        marginTop: theme.spacing(1)
    },
    title: {
        display: 'flex',
        wordBreak: 'break-word',
        textAlign: 'left',
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

function TableItem({ torrent, selectTorrent, isSelected }) {
    const classes = useStyles();

    const onClick = event => {
        event.stopPropagation();

        if (event.ctrlKey) {
            console.log("Ctrl+click has just happened!");
            return;
        }

        selectTorrent(torrent.hash);
    }

    const sizes = `${torrent.completedUi} / ${torrent.totalSizeUi}`;
    const peersRatio = torrent.isDone ? `Ratio: ${torrent.ratio.toFixed(2)}` : `${torrent.num_complete} / ${torrent.num_incomplete} peers`;

    let speeds = '';
    if (torrent.dlspeed && torrent.upspeed) {
        speeds = (
            <>
                <div>{torrent.dlspeedUi}</div>
                <SpeedIcon />
                <div>{torrent.upspeedUi}</div>
            </>
        );
    } else if (torrent.dlspeed && !torrent.upspeed) {
        speeds = (
            <>
                <div>{torrent.dlspeedUi}</div>
                <SpeedIcon Icon={ArrowDownwardIcon} />
            </>
        );
    } else if (!torrent.dlspeed && torrent.upspeed){
        speeds = (
            <>
                <div>{torrent.upspeedUi}</div>
                <SpeedIcon Icon={ArrowUpwardIcon} />
            </>
        );
    }

    return (
        <Card key={torrent.hash} className={classes.card}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6" className={classes.title}>
                        <div>{torrent.name}</div>
                        <div className={classes.rowEnd}>
                            <div className={classes.infoButton}>
                                <div onClick={onClick}><SpeedIcon Icon={InfoIcon} /></div>
                            </div>
                        </div>
                    </Typography>

                    <div>
                        <div className={clsx(classes.row, classes.seperated)}>
                            <SubText text={sizes} />
                            <InfoChip label={torrent.percentDone} />
                            {torrent.category ? <InfoChip label={torrent.category} /> : null}
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

                            {(torrent.dlspeed || torrent.upspeed) ? (<div className={classes.speeds}>{speeds}</div>) : null}
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
};

export default React.memo(TableItem);