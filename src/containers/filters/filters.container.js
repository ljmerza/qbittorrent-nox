import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

import { filtersActions } from './filters.reducer';
import { getOpenDrawer } from './filters.selectors';

import FilterState from './sections/state.component';
import FilterCategories from './sections/categories.component';
import FilterTags from './sections/tags.component';
import FilterTracker from './sections/trackers.component';
import FilterSort from './sections/sort.component';
import FilterSearch from './sections/search.component';

const useStyles = makeStyles(() => ({
    drawerWidth: {
        minWidth: 230
    }
}));

function FiltersContainer({ openDrawer, toggleFilterDrawer }) {
    const classes = useStyles();

    return (
        <Drawer open={openDrawer} ModalProps={{ onBackdropClick: toggleFilterDrawer }} classes={{ paper: classes.drawerWidth}}>
            <FilterState />
            <FilterCategories />
            <FilterTags />
            <FilterTracker />
            <FilterSort />
            <FilterSearch />
        </Drawer>
    );  
}

FiltersContainer.propTypes = {
    openDrawer: PropTypes.bool.isRequired,
    toggleFilterDrawer: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        openDrawer: getOpenDrawer(state), 
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
)(FiltersContainer);
