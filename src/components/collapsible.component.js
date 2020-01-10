import React from 'react';
import PropTypes from 'prop-types';

import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

function Collapsible({ open, onToggleCollapsed, children, title }) {
    return (
        <List component="nav">
            <ListItem button onClick={onToggleCollapsed}>
                <ListItemText primary={title} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                {children}
            </Collapse>
        </List>
    );
}

Collapsible.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.any,
    onToggleCollapsed: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
};

export default Collapsible;
