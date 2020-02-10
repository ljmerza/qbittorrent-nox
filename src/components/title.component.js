import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { getServerStateDown, getServerStateUp } from 'containers/torrents/torrents.selectors';

function Title({ dlSpeed, upSpeed }) {
    const title = (dlSpeed && upSpeed) ? `D: ${dlSpeed}, U: ${upSpeed}` : ``;

    return (
        <Helmet defer={false}>
            <title>{title}</title>
        </Helmet>
    );
}

Title.propTypes = {
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
)(Title);
