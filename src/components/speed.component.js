import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import Icon from 'components/icon.component';

import { getServerStateDown, getServerStateUp } from 'containers/torrents/torrents.selectors';


const useStyles = makeStyles({
    speeds: {
        display: 'flex',
        alignItems: 'center'
    }
});

function Speed({ dlSpeed, upSpeed }) {
    const classes = useStyles();

    return (
        <div className={classes.speeds}>
            {dlSpeed} <Icon Icon={SwapVertIcon} /> {upSpeed}
        </div>
    );
}

Speed.propTypes = {
    dlSpeed: PropTypes.string.isRequired,
    upSpeed: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    return {
        dlSpeed: getServerStateDown(state),
        upSpeed: getServerStateUp(state),
    }
};


export default compose(
    connect(
        mapStateToProps,
        null
    )
)(Speed);
