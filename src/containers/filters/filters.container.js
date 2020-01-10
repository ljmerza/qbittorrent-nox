import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

import { filtersActions } from './filters.reducer';
import { getOpenDrawer } from './filters.selectors';

import FiltersState from './sections/state.component';
import FiltersCategories from './sections/categories.component';
import FiltersTags from './sections/tags.component';
import FiltersSort from './sections/sort.component';
import FiltersSearch from './sections/search.component';

const useStyles = makeStyles(() => ({
    drawerWidth: {
        minWidth: 230
    }
}));

function FiltersContainer({ openDrawer, toggleFilterDrawer }) {
    const classes = useStyles();

    return (
        <Drawer open={openDrawer} ModalProps={{ onBackdropClick: toggleFilterDrawer }} classes={{ paper: classes.drawerWidth}}>
            <FiltersState />
            <FiltersCategories />
            <FiltersTags />
            <FiltersSort />
            <FiltersSearch />
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
