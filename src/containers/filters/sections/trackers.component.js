import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import CollapsibleList from 'components/fields/collapsibleList.component';

import { getTrackersCount } from 'containers/torrents/torrents.selectors';
import { filtersActions } from '../filters.reducer';
import { getSelectedTracker, getOpenTrackers } from '../filters.selectors';

function FilterTracker({ trackersCount, openTrackers, selectedTracker, changeSelectedTracker, toggleCollapsedTracker }) {
    return (
        <CollapsibleList
            title='Tracker'
            open={openTrackers}
            selected={selectedTracker}
            items={trackersCount}
            onChangeSelected={changeSelectedTracker}
            onToggleCollapsed={toggleCollapsedTracker}
        />
    );
}

FilterTracker.propTypes = {
    trackersCount: PropTypes.array.isRequired,
    selectedTracker: PropTypes.string.isRequired,
    openTrackers: PropTypes.bool.isRequired,
    changeSelectedTracker: PropTypes.func.isRequired,
    toggleCollapsedTracker: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        trackersCount: getTrackersCount(state),
        selectedTracker: getSelectedTracker(state),
        openTrackers: getOpenTrackers(state),

    }
};

function mapDispatchToProps(dispatch) {
    return {
        changeSelectedTracker: tracker => dispatch(filtersActions.changeSelectedTracker(tracker)),
        toggleCollapsedTracker: () => dispatch(filtersActions.toggleCollapsedTracker()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(FilterTracker);
