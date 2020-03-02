import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import Card from 'components/card.component';
import MultipleSelect from 'components/fields/multipleSelect.component';
import Select from 'components/fields/select.component';
import { Container, Item } from 'components/grid.component';
import TextSave from 'components/fields/textSave.component';

import { getTagsWithReset, getCategoriesWithReset } from 'containers/torrents/torrents.selectors';

import GeneralTabActions from './tabs/general/actions.component';
import { torrentDetailsActions } from './torrentDetails.reducer';
import { getIsOpen, getSelectedTorrent } from './torrentDetails.selectors';


class MultiTorrentDetails extends PureComponent { 
    state = {
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

    render(){
        return (
            <Box position="static" color='inherit'>
                <GeneralTabActions selectedTorrent={this.props.selectedTorrent} />

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
                </Card>
            </Box>
        );
    }
}

MultiTorrentDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedTorrent: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
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
