
export { default as tabContainer } from './tabContainer.component'; import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { AppBar } from '@material-ui/core';

import TabHeader from './tabHeader.component';
import TabBody from './tabBody.component';

function TabContainer({ defaultTab }) {
    const [selectedTabIndex, setSelectedTabIndex] = useState(defaultTab);

    // find the currently selected tab
    const { tabs } = this.props;
    const selectedTab = tabs.find(tab => tab.index === selectedTabIndex) || {};

    return (
        <>
            <AppBar position="static">
                <TabHeader
                    selectedTabIndex={selectedTab.index}
                    handleTabChange={(event, newValue) => setSelectedTabIndex(newValue)}
                    tabs={tabs}
                />
            </AppBar>

            <TabBody>{selectedTab.panel}</TabBody>
        </>
    );
}

TabContainer.propTypes = {
    tabs: PropTypes.array.isRequired,
    defaultTab: PropTypes.number.isRequired
};

TabContainer.defaultProps = {
    defaultTab: 0
};

export default TabContainer;