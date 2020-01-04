import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { getCategories } from 'containers/torrents/torrents.selectors';
import { filtersActions } from '../filters.reducer';
import { getSelectedCategory, getOpenCategories } from '../filters.selectors';

function FiltersContainer({ classes, categories, openCategories, selectedCategory, changeSelectedCategory, toggleCollapsedCategory }) {

    return (
        <List component="nav">
            <ListItem button onClick={toggleCollapsedCategory}>
                <ListItemText primary="Categories" />
                {openCategories ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCategories} timeout="auto" unmountOnExit>
                <List component="div">
                    {categories.map(category => {
                        return (
                            <ListItem
                                key={category.name}
                                dense
                                button
                                className={clsx(classes.nested, {
                                    [classes.selected]: category.id === selectedCategory
                                })}
                                onClick={() => changeSelectedCategory(category.id)}
                            >
                                <ListItemText primary={category.name} name={category.name} />
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </List>
    );
}

FiltersContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    openCategories: PropTypes.bool.isRequired,
    changeSelectedCategory: PropTypes.func.isRequired,
    toggleCollapsedCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        categories: getCategories(state),
        selectedCategory: getSelectedCategory(state),
        openCategories: getOpenCategories(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        changeSelectedCategory: category => dispatch(filtersActions.changeSelectedCategory(category)),
        toggleCollapsedCategory: () => dispatch(filtersActions.toggleCollapsedCategory()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(FiltersContainer);
