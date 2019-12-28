import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Tabs, Tab, Box } from '@material-ui/core';

import InfoIcon from '@material-ui/icons/Info';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import PublicIcon from '@material-ui/icons/Public';

import SpeedIcon from '../../components/speedIcon.component';
import { torrentDetailsActions } from './torrentDetails.reducer';
import { getIsOpen, getSelectedTorrent } from './torrentDetails.selectors';

import GeneralTab from './tabs/general.component';
import TrackersTab from './tabs/trackers.component';
import PeersTab from './tabs/peers.component';
import FilesTab from './tabs/files.component';

const TabPanel = props => {
    const { children, value, index } = props;
    return value === index ? <Box>{children}</Box> : null;
}

function TorrentDetails({ isOpen, clearTorrent }) {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <Drawer 
            anchor='right'
            open={isOpen} 
            ModalProps={{ 
                onBackdropClick: () => {
                    setValue(0); // reset selected tab
                    clearTorrent();
                }}
            } 
            classes={{ paper: classes.drawerWidth }}
        >
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label={<SpeedIcon Icon={InfoIcon} color='inherit' />} />
                    <Tab label={<SpeedIcon Icon={PublicIcon} color='inherit' />} />
                    <Tab label={<SpeedIcon Icon={PeopleIcon} color='inherit' />} />
                    <Tab label={<SpeedIcon Icon={DescriptionIcon} color='inherit' />} />
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
        </Drawer>
    );
}

const useStyles = makeStyles(theme => ({
    drawerWidth: {
        width: '80%'
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    }
}));

TorrentDetails.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    selectedTorrent: PropTypes.any,
    clearTorrent: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        isOpen: getIsOpen(state),
        selectedTorrent: getSelectedTorrent(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        clearTorrent: () => dispatch(torrentDetailsActions.clearTorrent()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(TorrentDetails);
