import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import { filtersActions } from 'containers/filters/filters.reducer';
import { torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

import BottomMenu from 'components/bottomMenu';
import Speed from './speed.component';

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
});

function BottomNav({ toggleFilterDrawer }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);


    return (
        <>  
            {/* add spacing so elements above arent hidden behind fixed BottomNavigation */}
            <div className={classes.spacer}></div>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                showLabels
                className={classes.root}
            >
                
                <BottomNavigationAction icon={<FilterListIcon />} onClick={toggleFilterDrawer} />
                <BottomNavigationAction icon={null} label={<Speed />} />
                <BottomNavigationAction icon={<BottomMenu />} />
                
            </BottomNavigation>
        </>
    );
}

BottomNav.propTypes = {
    toggleFilterDrawer: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        selectedTorrent: getSelectedTorrent(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        toggleFilterDrawer: () => dispatch(filtersActions.toggleFilterDrawer()),
        clearTorrent: () => dispatch(torrentDetailsActions.clearTorrent()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(BottomNav);

