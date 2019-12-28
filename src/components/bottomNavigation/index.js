import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import SpeedIcon from '../speedIcon.component';
import { filtersActions } from '../../containers/filters/filters.reducer';
import { getServerStateDown, getServerStateUp } from '../../containers/torrents/torrents.selectors';

export const BOTTOM_NAV_HEIGHT = 56;

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
    },
    spacer: {
        height: BOTTOM_NAV_HEIGHT,
        width: '100%',
    },
    speeds: {
        display: 'flex',
        alignItems: 'center'
    }
});

function BottomNav({ toggleFilterDrawer, dlSpeed, upSpeed }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const down = `${dlSpeed || 0}/s`;
    const up = `${upSpeed || 0}/s`;
    const title = (dlSpeed && upSpeed) ? `D: ${down}, U: ${up}` : ``;

    const SpeedUi = (
        <div className={classes.speeds}>
            {down} <SpeedIcon /> {up}
        </div>
    );
    
    return (
        <>  
            <Helmet defer={false}>
                <title>{title}</title>
            </Helmet>

            {/* add spacing so elements above arent hidden behind fixed BottomNavigation */}
            <div className={classes.spacer}></div>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                showLabels
                className={classes.root}
            >
                
                <BottomNavigationAction icon={<FilterListIcon />} onClick={toggleFilterDrawer} />
                <BottomNavigationAction icon={<KeyboardArrowUpIcon />} label={SpeedUi} />
                <BottomNavigationAction icon={<MoreVertIcon />} />
                
            </BottomNavigation>
        </>
    );
}

BottomNav.propTypes = {
    toggleFilterDrawer: PropTypes.func.isRequired,
    dlSpeed: PropTypes.string.isRequired,
    upSpeed: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    return {
        dlSpeed: getServerStateDown(state),
        upSpeed: getServerStateUp(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        toggleFilterDrawer: () => dispatch(filtersActions.toggleFilterDrawer()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(BottomNav);

