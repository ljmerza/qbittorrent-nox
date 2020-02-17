import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';
import LinkIcon from '@material-ui/icons/Link';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SelectAllIcon from '@material-ui/icons/SelectAll';

import { torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import AddTorrent from 'containers/addTorrent';
import Menu from 'components/menu/menu.component';


function BottomMenu({ selectTorrent, history }) {
    const onSettingsClick = () => history.push('/settings');

    return (
        <Menu>
            {({handleClose, classes}) => (
                <>
                    <Menu.MenuItem onClick={onSettingsClick}>
                        <Typography>Settings</Typography>
                        <SettingsIcon classes={{ root: classes.iconRoot }} />
                    </Menu.MenuItem>

                    <Menu.MenuItem>
                        <AddTorrent>
                            <div onClick={handleClose} className={classes.iconAction}>
                                <Typography>Add Torrent File</Typography>
                                <InsertDriveFileIcon classes={{ root: classes.iconRoot }} />
                            </div>
                        </AddTorrent>
                    </Menu.MenuItem>

                    <Menu.MenuItem>
                        <AddTorrent addUrl>
                            <div onClick={handleClose} className={classes.iconAction}>
                                <Typography>Add Torrent Link</Typography>
                                <LinkIcon classes={{ root: classes.iconRoot }} />
                            </div>
                        </AddTorrent>
                    </Menu.MenuItem>

                    <Menu.MenuItem>
                        <div
                            onClick={() => {
                                selectTorrent([]);
                                handleClose();
                            }}
                            className={classes.iconAction}
                        >
                            <Typography>Multiselect</Typography>
                            <SelectAllIcon classes={{ root: classes.iconRoot }} />
                        </div>
                    </Menu.MenuItem>

                    <Menu.MenuItem>
                        <Typography>Logout</Typography>
                        <ExitToAppIcon classes={{ root: classes.iconRoot }} />
                    </Menu.MenuItem>
                </>
            )}
        </Menu>
    );
}

BottomMenu.propTypes = {
    selectTorrent: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        selectTorrent: torrent => dispatch(torrentDetailsActions.selectTorrent(torrent)),
    };
}

export default compose(
    withRouter,
    connect(
        null,
        mapDispatchToProps
    )
)(BottomMenu);
