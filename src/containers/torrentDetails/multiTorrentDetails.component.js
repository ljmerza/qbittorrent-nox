import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { ButtonGroup, Button, Typography } from '@material-ui/core';
import ClearAllIcon from '@material-ui/icons/ClearAll';

import Card from 'components/card.component';
import MultipleSelect from 'components/fields/multipleSelect.component';
import Select from 'components/fields/select.component';
import { Item } from 'components/grid.component';
import TextSave from 'components/fields/textSave.component';

import {
    ACTION_RESUME, ACTION_PAUSE, ACTION_DELETE,
    ACTION_F_RESUME, ACTION_CHECK
} from 'utilities/torrent-states';

import { getTagsWithReset, getCategoriesWithReset } from 'containers/torrents/torrents.selectors';
import GeneralTabActionsDelete from 'containers/torrentDetails/tabs/general/actionsDeleteModal.component';

import { torrentDetailsActions } from './torrentDetails.reducer';
import { getIsOpen, getSelectedTorrent } from './torrentDetails.selectors';


function MultiTorrentDetails({ 
    classes,
    resumeSelectedTorrent,
    pauseSelectedTorrent,
    forceResumeSelectedTorrent,
    checkSelectedTorrent,
    selectTorrent,
    closeDetails,

    categories,
    tags,
    changeTorrentCategory,
    changeTorrentTags,
    changeTorrentLocation
 }) {

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [savePath, setSavePath] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTag, setSelectedTag] = useState([]);

    const onSavePath = event => {
        setSavePath(event.target.value);
        changeTorrentLocation(event);
    }

    const onChangeCategory = event => {
        setSelectedCategory(event.target.value);
        changeTorrentCategory(event);
    }

    const onChangeTag= event => {
        setSelectedTag(event.target.value);
        changeTorrentTags(event);
    }

    return (
        <>
            <GeneralTabActionsDelete openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />

            <Card title='Information'>
                <Item xs={12} sm={12} md={12}>
                    <TextSave label='Save Path' name='save_path' onSave={onSavePath} value={savePath} />
                </Item>

                <Item>
                    <Select label='Category' value={selectedCategory} options={categories} onChange={onChangeCategory} />
                </Item>

                <Item>
                    <MultipleSelect label='Tags' value={selectedTag} options={tags} onChange={onChangeTag} />
                </Item>

                <Item xs={12} sm={12} md={12}>
                    <ButtonGroup
                        className={classes.buttonGroup}
                        orientation="vertical"
                        color="primary"
                    >
                        <Button 
                            classes={{ label: classes.buttonLabel }} 
                            startIcon={<ACTION_RESUME.icon />} 
                            onClick={() => {
                                resumeSelectedTorrent();
                                closeDetails();
                            }
                        }>
                            <Typography>Resume</Typography>
                        </Button>

                        <Button 
                            classes={{ label: classes.buttonLabel }} 
                            startIcon={<ACTION_PAUSE.icon />} 
                            onClick={() => {
                                pauseSelectedTorrent();
                                closeDetails();
                            }
                        }>
                            <Typography>Pause</Typography>
                        </Button>

                        <Button 
                            classes={{ label: classes.buttonLabel }} 
                            startIcon={<ACTION_F_RESUME.icon />} 
                            onClick={() => {
                                forceResumeSelectedTorrent();
                                closeDetails();
                            }
                        }>
                            <Typography>Force Resume</Typography>
                        </Button>

                        <Button 
                            classes={{ label: classes.buttonLabel }} 
                            startIcon={<ACTION_DELETE.icon />} 
                            onClick={() => {
                                setOpenDeleteModal(true);
                                closeDetails();
                            }
                        }>
                            <Typography>Delete</Typography>
                        </Button>

                        <Button 
                            classes={{ label: classes.buttonLabel }} 
                            startIcon={<ACTION_CHECK.icon />} 
                            onClick={() => {
                                checkSelectedTorrent();
                                closeDetails();
                            }
                        }>
                            <Typography>Recheck</Typography>
                        </Button>

                        <Button 
                            classes={{ label: classes.buttonLabel }} 
                            startIcon={<ClearAllIcon />} 
                            onClick={() => {
                                selectTorrent(null);
                                closeDetails();
                            }
                        }>
                            <Typography>Clear Selected</Typography>
                        </Button>
                    </ButtonGroup>
                </Item>
            </Card>

        </>
    );
}

MultiTorrentDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    clearTorrent: PropTypes.func.isRequired,
    selectTorrent: PropTypes.func.isRequired,
    selectedTorrent: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    resumeSelectedTorrent: PropTypes.func.isRequired,
    pauseSelectedTorrent: PropTypes.func.isRequired,
    forceResumeSelectedTorrent: PropTypes.func.isRequired,
    checkSelectedTorrent: PropTypes.func.isRequired,
    deleteSelectedTorrent: PropTypes.func.isRequired,
    openDetails: PropTypes.func.isRequired,
    closeDetails: PropTypes.func.isRequired,
    changeTorrentLocation: PropTypes.func.isRequired,
    changeTorrentCategory: PropTypes.func.isRequired,
    changeTorrentTags: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
};

const styles = theme => ({
    buttonGroup: {
        marginTop: theme.spacing(3),
    },
    buttonLabel: {
        justifyContent: 'start',
    },
});

const mapStateToProps = state => {
    return {
        isOpen: getIsOpen(state),
        selectedTorrent: getSelectedTorrent(state),
        categories: getCategoriesWithReset(state),
        tags: getTagsWithReset(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        selectTorrent: torrent => dispatch(torrentDetailsActions.selectTorrent(torrent)),
        resumeSelectedTorrent: () => dispatch(torrentDetailsActions.resumeSelectedTorrent()),
        pauseSelectedTorrent: () => dispatch(torrentDetailsActions.pauseSelectedTorrent()),
        forceResumeSelectedTorrent: () => dispatch(torrentDetailsActions.forceResumeSelectedTorrent()),
        checkSelectedTorrent: () => dispatch(torrentDetailsActions.checkSelectedTorrent()),
        deleteSelectedTorrent: deleteFiles => dispatch(torrentDetailsActions.deleteSelectedTorrent(deleteFiles)),
        openDetails: () => dispatch(torrentDetailsActions.openDetails()),
        closeDetails: () => dispatch(torrentDetailsActions.closeDetails()),
        clearTorrent: () => dispatch(torrentDetailsActions.clearTorrent()),
        changeTorrentLocation: location => dispatch(torrentDetailsActions.changeTorrentLocation(location)),
        changeTorrentCategory: category => dispatch(torrentDetailsActions.changeTorrentCategory(category)),
        changeTorrentTags: tag => dispatch(torrentDetailsActions.changeTorrentTags(tag)),
    };
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(MultiTorrentDetails);
