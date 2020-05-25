import React from 'react';
// import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { BottomNavigationAction } from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

import BottomNavigationComponent from 'components/bottomNavigation.component';
import SpeedStats from 'containers/settings/bottomNavigation/speedStats.component';
import BottomMenu from './bottomMenu.component';

/**
 * bottom mobile nav when in settings view
 */
function BottomNavigationSettings({ history, ...props }) {
    return (
        <BottomNavigationComponent>
            <BottomNavigationAction icon={<HomeOutlinedIcon />} onClick={() => history.push('/torrents')}/> 
            <BottomNavigationAction icon={null} label={<SpeedStats />} />
            <BottomNavigationAction icon={<BottomMenu {...props} />} />
        </BottomNavigationComponent>
    );
}

BottomNavigationSettings.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = state => {
    return {
    }
};

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(BottomNavigationSettings);

