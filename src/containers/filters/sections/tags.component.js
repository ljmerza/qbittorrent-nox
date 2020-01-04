import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { getTags } from 'containers/torrents/torrents.selectors';
import { filtersActions } from '../filters.reducer';
import { getSelectedTag, getOpenTags } from '../filters.selectors';

function FiltersContainer({ classes, tags, selectedTag, openTags, changeSelectedTag, toggleCollapsedTag }) {
    return (
        <List component="nav">
            <ListItem button onClick={toggleCollapsedTag}>
                <ListItemText primary="Tags" />
                {openTags ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openTags} timeout="auto" unmountOnExit>
                <List component="div">
                    {tags.map(tag => {
                        return (
                            <ListItem
                                key={tag.id}
                                dense
                                button
                                className={clsx(classes.nested, {
                                    [classes.selected]: tag.id === selectedTag
                                })}
                                onClick={() => changeSelectedTag(tag.id)}
                            >
                                <ListItemText primary={tag.name} />
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </List>
    );
}

FiltersContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    selectedTag: PropTypes.string.isRequired,
    openTags: PropTypes.bool.isRequired,
    changeSelectedTag: PropTypes.func.isRequired,
    toggleCollapsedTag: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        tags: getTags(state),
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
)(FiltersContainer);
