import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { ButtonGroup, Button, Typography } from '@material-ui/core';
import ClearAllIcon from '@material-ui/icons/ClearAll';

import Card from 'components/card.component';
import MultipleSelect from 'components/fields/multipleSelect.component';
import Select from 'components/fields/select.component';
import { Container, Item } from 'components/grid.component';
import TextSave from 'components/fields/textSave.component';

import {
    ACTION_RESUME, ACTION_PAUSE, ACTION_DELETE,
    ACTION_F_RESUME, ACTION_CHECK
} from 'utilities/torrent-states';

import { getTagsWithReset, getCategoriesWithReset } from 'containers/torrents/torrents.selectors';
import GeneralTabActionsDelete from 'containers/torrentDetails/tabs/general/actionsDeleteModal.component';

import { torrentDetailsActions } from './torrentDetails.reducer';
import { getIsOpen, getSelectedTorrent } from './torrentDetails.selectors';


class MultiTorrentDetails extends PureComponent { 
    state = {
        openDeleteModal: false,
        savePath: '',
        selectedCategory: '',
        selectedTag: [],
        upLimit: '',
        dlLimit: '',
    }

    onSavePath = event => {
        this.setState({ savePath: event.target.value });
        this.props.changeTorrentLocation(event);
    }

    onChangeCategory = event => {
        this.setState({ selectedCategory: event.target.value });
        this.props.changeTorrentCategory(event);
    }

    onChangeTag = event => {
        this.setState({ selectedTag: event.target.value });
        this.props.changeTorrentTags(event);
    }

    onChangeDownloadLimit = ({ target: { value } }) => this.props.changeDownloadLimit(value);
    onChangeUploadLimit = ({ target: { value } }) => this.props.changeUploadLimit(value);

    setOpenDeleteModal = openDeleteModal => this.setState({ openDeleteModal })

    render(){
        return (
            <>
                <GeneralTabActionsDelete 
                    openDeleteModal={this.state.openDeleteModal} 
                    setOpenDeleteModal={this.setOpenDeleteModal} 
                    deleteCallback={this.props.closeDetails}
                />
    
                <Card title='Information'>
                    <Item xs={12} sm={12} md={12}>
                        <TextSave 
                            label='Save Path' 
                            name='save_path' 
                            onSave={this.onSavePath} 
                            value={this.state.savePath} 
                        />
                    </Item>
                    <Item>
                        <Select 
                            label='Category' 
                            value={this.state.selectedCategory} 
                            options={this.props.categories} 
                            onChange={this.onChangeCategory} 
                        />
                    </Item>
                    <Item>
                        <MultipleSelect 
                            label='Tags' 
                            value={this.state.selectedTag} 
                            options={this.props.tags} 
                            onChange={this.onChangeTag} 
                        />
                    </Item>

                    <Container>
                        <Item>
                            <TextSave
                                label="Upload Limit"
                                name='upLimit'
                                numbericOnly
                                value={this.state.upLimit}
                                onSave={this.onChangeDownloadLimit}
                            />
                        </Item>
                        <Item>
                            <TextSave
                                label="Download Limit"
                                name='dlLimit'
                                value={this.state.dlLimit}
                                numbericOnly
                                onSave={this.onChangeDownloadLimit}
                            />
                        </Item>
                    </Container>

                    <Container>
                        <Item xs={12} sm={12} md={12}>
                            <ButtonGroup
                                className={this.props.classes.buttonGroup}
                                orientation="vertical"
                                color="primary"
                            >
                                <Button 
                                    classes={{ label: this.props.classes.buttonLabel }} 
                                    startIcon={<ACTION_RESUME.icon />} 
                                    onClick={() => {
                                        this.props.resumeSelectedTorrent();
                                        this.props.closeDetails();
                                    }
                                }>
                                    <Typography>Resume</Typography>
                                </Button>
        
                                <Button 
                                    classes={{ label: this.props.classes.buttonLabel }} 
                                    startIcon={<ACTION_PAUSE.icon />} 
                                    onClick={() => {
                                        this.props.pauseSelectedTorrent();
                                        this.props.closeDetails();
                                    }
                                }>
                                    <Typography>Pause</Typography>
                                </Button>
        
                                <Button 
                                    classes={{ label: this.props.classes.buttonLabel }} 
                                    startIcon={<ACTION_F_RESUME.icon />} 
                                    onClick={() => {
                                        this.props.forceResumeSelectedTorrent();
                                        this.props.closeDetails();
                                    }
                                }>
                                    <Typography>Force Resume</Typography>
                                </Button>
        
                                <Button 
                                    classes={{ label: this.props.classes.buttonLabel }} 
                                    startIcon={<ACTION_DELETE.icon />} 
                                    onClick={() => this.setOpenDeleteModal(true)}
                                >
                                    <Typography>Delete</Typography>
                                </Button>
        
                                <Button 
                                    classes={{ label: this.props.classes.buttonLabel }} 
                                    startIcon={<ACTION_CHECK.icon />} 
                                    onClick={() => {
                                        this.props.checkSelectedTorrent();
                                        this.props.closeDetails();
                                    }
                                }>
                                    <Typography>Recheck</Typography>
                                </Button>
        
                                <Button 
                                    classes={{ label: this.props.classes.buttonLabel }} 
                                    startIcon={<ClearAllIcon />} 
                                    onClick={() => {
                                        this.props.selectTorrent(null);
                                        this.props.closeDetails();
                                    }
                                }>
                                    <Typography>Clear Selected</Typography>
                                </Button>
                            </ButtonGroup>
                        </Item>
                    </Container>
                </Card>
    
            </>
        );
    }
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
