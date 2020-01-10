import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import CollapsibleList from 'components/fields/collapsibleList.component';

import { getCategories } from 'containers/torrents/torrents.selectors';
import { filtersActions } from '../filters.reducer';
import { getSelectedCategory, getOpenCategories } from '../filters.selectors';

function FiltersContainer({ categories, openCategories, selectedCategory, changeSelectedCategory, toggleCollapsedCategory }) {
    return (
        <CollapsibleList
            title='Category'
            open={openCategories}
            selected={selectedCategory}
            items={categories}
            onChangeSelected={changeSelectedCategory}
            onToggleCollapsed={toggleCollapsedCategory}
        />
    );
}

FiltersContainer.propTypes = {
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
