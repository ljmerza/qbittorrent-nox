import React from 'react';
import PropTypes from 'prop-types';

import ListComponent from './list.component';
import Collapsible from '../collapsible.component';

function CollapsibleList({ open, selected, items, onChangeSelected, onToggleCollapsed, children, title }) {
    return (
        <Collapsible
            open={open}
            onToggleCollapsed={onToggleCollapsed}
            title={title}
        >
            <ListComponent
                selected={selected}
                items={items}
                onChangeSelected={onChangeSelected}
                children={children}
            />
        </Collapsible>
    );
}

CollapsibleList.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.any,
    selected: PropTypes.any,
    items: PropTypes.array.isRequired,
    onChangeSelected: PropTypes.func.isRequired,
    onToggleCollapsed: PropTypes.func.isRequired,
};

export default CollapsibleList;
