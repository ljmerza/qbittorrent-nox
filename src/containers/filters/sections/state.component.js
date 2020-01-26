import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import CollapsibleList from 'components/fields/collapsibleList.component';
import { getStatesCount } from 'containers/torrents/torrents.selectors';

import { filtersActions } from '../filters.reducer';
import { getSelectedState, getOpenState } from '../filters.selectors';

function FiltersState({ statesCount, openState, selectedState, changeSelectedState, toggleCollapsedState }) {
    return (
        <CollapsibleList 
            title='State'
            open={openState}
            selected={selectedState}
            items={statesCount}
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
    statesCount: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
    return {
        selectedState: getSelectedState(state),
        openState: getOpenState(state),
        statesCount: getStatesCount(state),
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
