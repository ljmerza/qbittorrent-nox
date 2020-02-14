import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

import { getSelectedTorrent, getIsOpen } from './torrentDetails.selectors';
import { torrentDetailsActions } from './torrentDetails.reducer';
import SingleTorrentDetails from './singleTorrentDetails.component';
import MultiTorrentDetails from './multiTorrentDetails.component';

const useStyles = makeStyles(() => ({
    drawerWidth: {
        width: '80%',
        maxWidth: 700,
    }
}));

function TorrentDetails({ selectedTorrent, isOpen, clearTorrent, closeDetails }) {
    const classes = useStyles();

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => setValue(newValue);

    const isMultiSelect = Array.isArray(selectedTorrent);

    const onBackdropClick = () => {
        setValue(0); // reset selected tab

        if (isMultiSelect) {
            closeDetails();
        } else {
            clearTorrent();
        }
    }

    return (
        <Drawer
            anchor='right'
            open={isOpen}
            ModalProps={{ onBackdropClick }}
            classes={{ paper: classes.drawerWidth }}
        >
            {isMultiSelect ? (
                <MultiTorrentDetails 
                    handleChange={handleChange} 
                    value={value} 
                /> 
            ) : (
                <SingleTorrentDetails
                    handleChange={handleChange} 
                    value={value} 
                />
            )}
        </Drawer>
    );
}

TorrentDetails.propTypes = {
    selectedTorrent: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    clearTorrent: PropTypes.func.isRequired,
    closeDetails: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
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
        closeDetails: () => dispatch(torrentDetailsActions.closeDetails()),
    };
}



export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(TorrentDetails);
