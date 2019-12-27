import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@material-ui/core';

function TabHeader() {
    return (
        <Tabs value={this.props.selectedTabIndex} onChange={this.props.handleTabChange}>
            {this.props.tabs.map(({ index, ...tab }) => (
                <Tab key={index} {...tab} />
            ))}
        </Tabs>
    );
}

TabHeader.propTypes = {
    tabs: PropTypes.array.isRequired,
    selectedTabIndex: PropTypes.number.isRequired,
    handleTabChange: PropTypes.func.isRequired
};

export default TabHeader;