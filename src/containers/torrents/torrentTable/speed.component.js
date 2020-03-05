import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon.component';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import SubText from 'components/fields/subText.component';


function Speed({ dlspeed, upspeed, dlspeedUi, upspeedUi }) {

    if (dlspeed && upspeed) {
        return (
            <>
                <SubText>{dlspeedUi}</SubText>
                <Icon Icon={SwapVertIcon} />
                <SubText>{upspeedUi}</SubText>
            </>
        );
    } else if (dlspeed && !upspeed) {
        return(
            <>
                <SubText>{dlspeedUi}</SubText>
                <Icon Icon={ArrowDownwardIcon} />
            </>
        );
    } else if (!dlspeed && upspeed) {
        return(
            <>
                <SubText>{upspeedUi}</SubText>
                <Icon Icon={ArrowUpwardIcon} />
            </>
        );
    }

    return null;
}

Speed.propTypes = {
    dlspeed: PropTypes.number,
    upspeed: PropTypes.number,
    dlspeedUi: PropTypes.string,
    upspeedUi: PropTypes.string,
};

export default React.memo(Speed);