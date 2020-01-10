import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import CollapsibleList from 'components/fields/collapsibleList.component';

import { TORRENT_FILTER_STATES_MAP } from 'utilities/torrent-states';
import { filtersActions } from '../filters.reducer';
import { getSelectedState, getOpenState } from '../filters.selectors';

function FiltersState({ openState, selectedState, changeSelectedState, toggleCollapsedState }) {
    return (
        <CollapsibleList 
            title='State'
            open={openState}
            selected={selectedState}
            items={TORRENT_FILTER_STATES_MAP}
            onChangeSelected={changeSelectedState} 
            onToggleCollapsed={toggleCollapsedState}
        />
    );
}

FiltersState.propTypes = {
    selectedState: PropTypes.string.isRequired,
    openState: PropTypes.bool.isRequired,
    changeSelectedState: PropTypes.func.isRequired,
    toggleCollapsedState: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        selectedState: getSelectedState(state),
        openState: getOpenState(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        changeSelectedState: state => dispatch(filtersActions.changeSelectedState(state)),
        toggleCollapsedState: () => dispatch(filtersActions.toggleCollapsedState()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(FiltersState);
