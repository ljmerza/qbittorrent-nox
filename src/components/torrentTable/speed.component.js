import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon.component';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SwapVertIcon from '@material-ui/icons/SwapVert';

function Speed({ dlspeed, upspeed, dlspeedUi, upspeedUi }) {
    let speeds = '';

    if (dlspeed && upspeed) {
        speeds = (
            <>
                <div>{dlspeedUi}</div>
                <Icon Icon={SwapVertIcon} />
                <div>{upspeedUi}</div>
            </>
        );
    } else if (dlspeed && !upspeed) {
        speeds = (
            <>
                <div>{dlspeedUi}</div>
                <Icon Icon={ArrowDownwardIcon} />
            </>
        );
    } else if (!dlspeed && upspeed) {
        speeds = (
            <>
                <div>{upspeedUi}</div>
                <Icon Icon={ArrowUpwardIcon} />
            </>
        );
    }

    return speeds;
}

Speed.propTypes = {
    dlspeed: PropTypes.number,
    upspeed: PropTypes.number,
    dlspeedUi: PropTypes.string,
    upspeedUi: PropTypes.string,
};

export default React.memo(Speed);