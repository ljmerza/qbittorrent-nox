import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { Container, Item } from 'components/grid.component';
import Text from 'components/fields/text.component';
import { filtersActions } from '../filters.reducer';
import { getOpenSearch, getSearch, getSearchBy } from '../filters.selectors';
import { SEARCH_BY_OPTIONS } from '../filter.tools';

class FiltersSearch extends Component {
    constructor(props){
        super(props);

        this.state = {
            search: props.search
        };
    }

    onSearchChange = ({ target: { value } }) => {
        this.setState({ search: value });

        // wait for search to be done typing before updating store and therefore torrent list
        clearTimeout(this.intervalId);
        this.intervalId = setTimeout(() => this.props.changeSearch(value), 500);
    }

    onSearchByChange = id => {
        // when changing searchBy, the store search value will be reset 
        // so reset the internal value too
        this.setState({ search: '' });
        this.props.changeSearchBy(id);
    }

    render(){
        const { openSearch, selectedSearchBy, toggleCollapsedSearch, classes } = this.props;
        const { search } = this.state;

        const searchedBy = SEARCH_BY_OPTIONS.find(search => search.id === selectedSearchBy);
        const searchLabel = `Search By ${searchedBy ? searchedBy.label : ''}`;

        return (
            <List component="nav">
                <ListItem button onClick={toggleCollapsedSearch}>
                    <ListItemText primary="Search" />
                    {openSearch ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSearch} timeout="auto" unmountOnExit>

                    <Container>
                        <Item xs={12} md={12} lg={12} className={classes.searchInput}>
                            <Text
                                label={searchLabel}
                                name='search'
                                value={search}
                                onChange={this.onSearchChange}
                                hideAdorment
                                emptyValue
                            />
                        </Item>
                    </Container>

                    <List component="div">
                        {SEARCH_BY_OPTIONS.map(searchBy => {
                            return (
                                <ListItem
                                    key={searchBy.id}
                                    dense
                                    button
                                    className={clsx(classes.nested, {
                                        [classes.selected]: searchBy.id === selectedSearchBy
                                    })}
                                    onClick={() => this.onSearchByChange(searchBy.id)}
                                >
                                    <ListItemText primary={searchBy.label} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Collapse>
            </List>
        );
    }
}

FiltersSearch.propTypes = {
    classes: PropTypes.object.isRequired,

    openSearch: PropTypes.bool.isRequired,
    search: PropTypes.string.isRequired,
    selectedSearchBy: PropTypes.string.isRequired,

    changeSearch: PropTypes.func.isRequired,
    changeSearchBy: PropTypes.func.isRequired,
    toggleCollapsedSearch: PropTypes.func.isRequired,
};

const styles = theme => ({
    searchInput: {
        marginLeft: theme.spacing(1),
    }
});

const mapStateToProps = state => {
    return {
        openSearch: getOpenSearch(state),
        search: getSearch(state),
        selectedSearchBy: getSearchBy(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        changeSearch: search => dispatch(filtersActions.changeSearch(search)),
        changeSearchBy: searchBy => dispatch(filtersActions.changeSearchBy(searchBy)),
        toggleCollapsedSearch: () => dispatch(filtersActions.toggleCollapsedSearch()),
    };
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(FiltersSearch);
