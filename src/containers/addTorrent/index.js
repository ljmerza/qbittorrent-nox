import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import Text from 'components/fields/text.component';
import Select from 'components/fields/select.component';
import Checkbox from 'components/fields/checkbox.component';
import FileSelector from 'components/fields/fileSelector.component';
import { Container, Item } from 'components/grid.component';
import Modal from 'components/modal.component';

import { getConfigConfig } from 'containers/config/config.selectors';
import { getCategories } from 'containers/torrents/torrents.selectors';
import { UNCATEGORIZED } from 'utilities/torrent-states';

const MANAGEMENT_MODES = [
    { id: 'manual', name: 'Manual' },
    { id: 'automatic', name: 'Automatic' },
]

class AddTorrentContainer extends Component {
    constructor(props){
        super(props);
        const { config } = props;

        this.state = {
            open: false,

            form: {
                torrents: [],
                managementMode: 'manual',
                saveLocation: config.save_path,
                cookie: '',
                renameTorrent: '',
                category: UNCATEGORIZED.id,
                startTorrent: !config.start_paused_enabled,
                skipHash: false,
                createSubDirectory: config.create_subfolder_enabled,
                downloadSequential: false,
                downloadFirstLast: false,
                limitDownloadRate: 0,
                limitUploadRate: 0,
            }
        }
    }
    
    handleOpen = () => this.setState({ open: true });
    handleClose = () => this.setState({ open: false });

    onChange = ({ target: { name, value } }) => {
        this.setState(state => ({ ...state, form: { ...state.form, [name]: value } }));
    }

    removeFile = () => {
        
    }

    render(){
        const { classes, children, categories } = this.props;
        const { form } = this.state;
        console.log({ form })

        let [, ...selectableCategories] = categories;

        const disableManualInputs = form.managementMode === 'automatic';

        return (
            <>
                <div onClick={this.handleOpen} className={classes.root}>
                    {children}
                </div>

                <Modal
                    title='Add Torrent'
                    open={this.state.open}
                    handleClose={this.handleClose}
                    submitTitle='Add'
                    onSubmit={this.handleClose}
                    onCancel={this.handleClose}
                >
                    <Box className={classes.form}>
                        <Container>
                            <Item sm={12} md={12} lg={12} className={classes.fileSelector}>
                                <FileSelector label='torrents' name='torrents' value={form.torrents} onChange={this.onChange} />
                            </Item>
                        </Container>
                       
                        <Container>
                            <Item sm={12} md={6} lg={6}>
                                <Select label='Torrent Management Mode' name='managementMode' value={form.managementMode} options={MANAGEMENT_MODES} onChange={this.onChange} />
                            </Item>
                            <Item sm={12} md={6} lg={6}>
                                <Text emptyValue label='Save Location' name='saveLocation' value={form.saveLocation} onChange={this.onChange} disabled={disableManualInputs} />
                            </Item>
                            <Item sm={12} md={6} lg={6}>
                                <Text emptyValue label='Rename To' name='renameTorrent' value={form.renameTorrent} onChange={this.onChange} />
                            </Item>
                            <Item sm={12} md={6} lg={6}>
                                <Select label='Category' value={form.category} options={selectableCategories} onChange={this.onChange} />
                            </Item>
                            <Item sm={12} md={6} lg={6}>
                                <Text emptyValue label='Download Rate (kb/s)' name='limitDownloadRate' value={form.limitDownloadRate} onChange={this.onChange} />
                            </Item>
                            <Item sm={12} md={6} lg={6}>
                                <Text emptyValue label='Upload Rate (kb/s)' name='limitUploadRate' value={form.limitUploadRate} onChange={this.onChange} />
                            </Item>
                        </Container>

                        <Container>
                            <Item sm={12} md={6} lg={6}>
                                <Checkbox label='Start Torrent' name='startTorrent' value={form.startTorrent} onChange={this.onChange} />
                            </Item>
                            <Item sm={12} md={6} lg={6}>
                                <Checkbox label='Skip Hash Check' name='skipHash' value={form.skipHash} onChange={this.onChange} />
                            </Item>
                            <Item sm={12} md={6} lg={6}>
                                <Checkbox label='Create Subfolder' name='createSubDirectory' value={form.createSubDirectory} onChange={this.onChange} />
                            </Item>
                            <Item sm={12} md={6} lg={6}>
                                <Checkbox label='Download Sequentially' name='downloadSequential' value={form.downloadSequential} onChange={this.onChange} />
                            </Item>
                            <Item sm={12} md={6} lg={6}>
                                <Checkbox label='Download First/Last Pieces' name='downloadFirstLast' value={form.downloadFirstLast} onChange={this.onChange} />
                            </Item>
                        </Container>
                    </Box>
                </Modal>
            </>
        );
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        maxWidth: '700px',
    },
    fileSelector: {
        marginBottom: theme.spacing(3)
    }
});

AddTorrentContainer.propTypes = {
    config: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
    return {
        config: getConfigConfig(state),
        categories: getCategories(state),
    }
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null)
)(AddTorrentContainer);
