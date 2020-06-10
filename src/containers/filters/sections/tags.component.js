import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import CollapsibleList from 'components/fields/collapsibleList.component';

import { getTagsCount } from 'containers/torrents/torrents.selectors';
import { filtersActions } from '../filters.reducer';
import { getSelectedTag, getOpenTags } from '../filters.selectors';

function FilterContainer({ tagsCount, selectedTag, openTags, changeSelectedTag, toggleCollapsedTag }) {
    return (
        <CollapsibleList
            title='Tags'
            open={openTags}
            selected={selectedTag}
            items={tagsCount}
            onChangeSelected={changeSelectedTag}
            onToggleCollapsed={toggleCollapsedTag}
        />
    );
}

FilterContainer.propTypes = {
    tagsCount: PropTypes.array.isRequired,
    selectedTag: PropTypes.string.isRequired,
    openTags: PropTypes.bool.isRequired,
    changeSelectedTag: PropTypes.func.isRequired,
    toggleCollapsedTag: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        tagsCount: getTagsCount(state),
        selectedTag: getSelectedTag(state),
        openTags: getOpenTags(state)
    }
};

function mapDispatchToProps(dispatch) {
    return {
        changeSelectedTag: tag => dispatch(filtersActions.changeSelectedTag(tag)),
        toggleCollapsedTag: () => dispatch(filtersActions.toggleCollapsedTag()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(FilterContainer);
