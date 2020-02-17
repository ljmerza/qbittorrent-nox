import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { BottomNavigationAction } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import ClearAllIcon from '@material-ui/icons/ClearAll';

import { filtersActions } from 'containers/filters/filters.reducer';
import { torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

import Speed from 'components/speed.component';
import BottomNavigationComponent from 'components/bottomNavigation.component';

import MultiSelectMenu from './multiSelectMenu.component';
import BottomMenu from './bottomMenu.component';


function BottomNav({ toggleFilterDrawer, selectedTorrent, clearTorrent }) {
    // if in multi select mode then use multi select menu
    const isMultiSelect = Array.isArray(selectedTorrent);

    return (
        <BottomNavigationComponent>
            {isMultiSelect? (
                <BottomNavigationAction icon={<ClearAllIcon />} onClick={clearTorrent} />
            ) : (
                <BottomNavigationAction icon = {<FilterListIcon />} onClick={toggleFilterDrawer} />
            )}

            <BottomNavigationAction icon={null} label={<Speed />} />
            <BottomNavigationAction icon={isMultiSelect ? <MultiSelectMenu /> : <BottomMenu />} />
            
        </BottomNavigationComponent>
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

