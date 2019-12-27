import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

import { filtersActions } from './filters.reducer';
import { getOpenDrawer } from './filters.selectors';

import FiltersState from './state.component';
import FiltersCategories from './categories.component';
import FiltersTags from './tags.component';
import FiltersSort from './sort.component';

function FiltersContainer({ openDrawer, toggleFilterDrawer }) {
    const classes = useStyles();

    return (
        <Drawer open={openDrawer} ModalProps={{ onBackdropClick: toggleFilterDrawer }} classes={{ paper: classes.drawerWidth}}>
            <FiltersState classes={classes} />
            <FiltersCategories classes={classes} />
            <FiltersTags classes={classes} />
            <FiltersSort classes={classes} />
        </Drawer>
    );  
}

const useStyles = makeStyles(theme => ({
    drawerWidth: {
        minWidth: 200
    },
    nested: {
        paddingLeft: theme.spacing(3),
    },
    selected: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
    },
    sortContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    sortDirection: {
        marginLeft: theme.spacing(1)
    }
}));

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
