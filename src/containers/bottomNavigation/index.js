import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import ClearAllIcon from '@material-ui/icons/ClearAll';

import { filtersActions } from 'containers/filters/filters.reducer';
import { torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

import { BottomMenu, MultiSelectMenu } from 'components/torrentMenu';
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

function BottomNav({ toggleFilterDrawer, selectedTorrent, clearTorrent }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    // if in multi select mode then use multi select menu
    const isMultiSelect = Array.isArray(selectedTorrent);

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
                {isMultiSelect? (
                    <BottomNavigationAction icon={<ClearAllIcon />} onClick={clearTorrent} />
                ) : (
                    <BottomNavigationAction icon = {<FilterListIcon />} onClick={toggleFilterDrawer} />
                )}

                <BottomNavigationAction icon={null} label={<Speed />} />
                <BottomNavigationAction icon={isMultiSelect ? <MultiSelectMenu /> : <BottomMenu />} />
                
            </BottomNavigation>
        </>
    );
}

BottomNav.propTypes = {
    toggleFilterDrawer: PropTypes.func.isRequired,
    clearTorrent: PropTypes.func.isRequired,
    selectedTorrent: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
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

