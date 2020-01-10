import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import CollapsibleList from 'components/fields/collapsibleList.component';

import { ListItemText } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { TORRENT_FILTER_SORT_MAP } from 'utilities/torrent-states';
import { filtersActions } from '../filters.reducer';
import { getSelectedSort, getOpenSort, getIsSortDescending } from '../filters.selectors';

const useStyles = makeStyles(theme => ({
    sortContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    sortDirection: {
        marginLeft: theme.spacing(1)
    }
}));

function FiltersSort({ openSort, selectedSort, changeSelectedSort, toggleCollapsedSort, isSortDescending }) {
    const classes = useStyles();

    return (
        <CollapsibleList
            title='Sort'
            open={openSort}
            selected={selectedSort}
            items={TORRENT_FILTER_SORT_MAP}
            onChangeSelected={changeSelectedSort}
            onToggleCollapsed={toggleCollapsedSort}
        >
            {(item, isSelected) => {
                let icon = null;
                if (isSelected){
                    icon = isSortDescending ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />;
                }

                return (
                    <ListItemText primary={
                        <div className={classes.sortContainer}>
                            {item.label}
                            <span className={classes.sortDirection}>{icon}</span>
                        </div>
                    } />
                );
            }}
        </CollapsibleList>
    );
}

FiltersSort.propTypes = {
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
