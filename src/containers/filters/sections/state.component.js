import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { TORRENT_FILTER_STATES_MAP } from 'utilities/torrent-states';
import { filtersActions } from '../filters.reducer';
import { getSelectedState, getOpenState } from '../filters.selectors';

function FiltersState({ openState, selectedState, changeSelectedState, toggleCollapsedState, classes }) {

    return (
        <List component="nav">
            <ListItem button onClick={toggleCollapsedState}>
                <ListItemText primary="States" />
                {openState ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openState} timeout="auto" unmountOnExit>
                <List component="div">
                    {TORRENT_FILTER_STATES_MAP.map(state => {
                        return (
                            <ListItem
                                key={state.id}
                                dense
                                button
                                className={clsx(classes.nested, {
                                    [classes.selected]: state.id === selectedState
                                })}
                                onClick={() => changeSelectedState(state.id)}
                            >
                                <ListItemText primary={state.label} />
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </List>
    );
}

FiltersState.propTypes = {
    classes: PropTypes.object.isRequired,
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
