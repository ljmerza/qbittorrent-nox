import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import CollapsibleList from 'components/fields/collapsibleList.component';

import { getCategoriesCount } from 'containers/torrents/torrents.selectors';
import { filtersActions } from '../filters.reducer';
import { getSelectedCategory, getOpenCategories } from '../filters.selectors';

function FilterCategory({ categoriesCount, openCategories, selectedCategory, changeSelectedCategory, toggleCollapsedCategory }) {

    return (
        <CollapsibleList
            title='Category'
            open={openCategories}
            selected={selectedCategory}
            items={categoriesCount}
            onChangeSelected={changeSelectedCategory}
            onToggleCollapsed={toggleCollapsedCategory}
        />
    );
}

FilterCategory.propTypes = {
    categoriesCount: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    openCategories: PropTypes.bool.isRequired,
    changeSelectedCategory: PropTypes.func.isRequired,
    toggleCollapsedCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        categoriesCount: getCategoriesCount(state),
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
)(FilterCategory);
