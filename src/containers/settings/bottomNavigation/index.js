import React from 'react';
// import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { BottomNavigationAction } from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

import BottomNavigationComponent from 'components/bottomNavigation.component';

import Speed from 'components/speed.component';
import BottomMenu from './bottomMenu.component';

function BottomNav({ history, ...props }) {
    return (
        <BottomNavigationComponent>
            <BottomNavigationAction icon={<HomeOutlinedIcon />} onClick={() => history.push('/torrents')}/> 
            <BottomNavigationAction icon={null} label={<Speed />} />
            <BottomNavigationAction icon={<BottomMenu {...props} />} />
        </BottomNavigationComponent>
    );
}

BottomNav.propTypes = {
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
)(BottomNav);

