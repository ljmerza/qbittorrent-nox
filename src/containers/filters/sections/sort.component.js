import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { TORRENT_FILTER_SORT_MAP } from 'utilities/torrent-states';
import { filtersActions } from '../filters.reducer';
import { getSelectedSort, getOpenSort, getIsSortDescending } from '../filters.selectors';

function FiltersSort({ openSort, selectedSort, changeSelectedSort, toggleCollapsedSort, isSortDescending, classes }) {

    return (
        <List component="nav">
            <ListItem button onClick={toggleCollapsedSort}>
                <ListItemText primary="Sort By" />
                {openSort ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSort} timeout="auto" unmountOnExit>
                <List component="div">
                    {TORRENT_FILTER_SORT_MAP.map(sort => {
                        const selected = sort.id === selectedSort;

                        let text = sort.label;
                        if (selected){
                            const icon = isSortDescending ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />;
                            text = (
                                <div className={classes.sortContainer}>
                                    {sort.label}
                                    <span className={classes.sortDirection}>{icon}</span>
                                </div>
                            );
                        } 

                        return (
                            <ListItem
                                key={sort.id}
                                dense
                                button
                                className={clsx(classes.nested, {
                                    [classes.selected]: selected
                                })}
                                onClick={() => changeSelectedSort(sort.id)}
                            >
                                <ListItemText primary={text} />
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </List>
    );
}

FiltersSort.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedSort: PropTypes.string.isRequired,
    openSort: PropTypes.bool.isRequired,
    changeSelectedSort: PropTypes.func.isRequired,
    toggleCollapsedSort: PropTypes.func.isRequired,
    isSortDescending: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
    return {
        selectedSort: getSelectedSort(state),
        openSort: getOpenSort(state),
        isSortDescending: getIsSortDescending(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        changeSelectedSort: sort => dispatch(filtersActions.changeSelectedSort(sort)),
        toggleCollapsedSort: () => dispatch(filtersActions.toggleCollapsedSort()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(FiltersSort);
