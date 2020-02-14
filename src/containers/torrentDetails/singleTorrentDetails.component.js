import React from 'react';
import PropTypes from 'prop-types';

import { AppBar, Tabs, Tab, Box } from '@material-ui/core';

import InfoIcon from '@material-ui/icons/Info';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import PublicIcon from '@material-ui/icons/Public';

import Icon from 'components/icon.component';

import GeneralTab from './tabs/general.component';
import TrackersTab from './tabs/trackers.component';
import PeersTab from './tabs/peers.component';
import FilesTab from './tabs/files.component';

const TabPanel = props => {
    const { children, value, index } = props;
    return value === index ? <Box>{children}</Box> : null;
}

function SingleTorrentDetails({ value, handleChange }) {
    return (
        <>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label={<Icon Icon={InfoIcon} color='inherit' />} />
                    <Tab label={<Icon Icon={PublicIcon} color='inherit' />} />
                    <Tab label={<Icon Icon={PeopleIcon} color='inherit' />} />
                    <Tab label={<Icon Icon={DescriptionIcon} color='inherit' />} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <GeneralTab />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TrackersTab />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PeersTab />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <FilesTab />
            </TabPanel>
        </>
    );
}

SingleTorrentDetails.propTypes = {
    value: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
};


export default SingleTorrentDetails;
