import React from 'react';
// import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { BottomNavigationAction } from '@material-ui/core';

import BottomNavigationComponent from 'components/bottomNavigation.component';

import Speed from 'components/speed.component';
import BottomMenu from './bottomMenu.component';

function BottomNav(props) {

    return (
        <BottomNavigationComponent>
            {/* keep everything centered with empty action */}
            <BottomNavigationAction icon={null} label={null} /> 
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

