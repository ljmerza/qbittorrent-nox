import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

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
                torrent: '',
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

    render(){
        const { classes, children, categories } = this.props;
        const { form } = this.state;

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
                    <Container>
                        <Item>
                            <FileSelector label='Torrent' name='torrent' onChange={this.onChange} />
                        </Item>
                        <Item>
                            <Select label='Torrent Management Mode' name='managementMode' value={form.managementMode} options={MANAGEMENT_MODES} onChange={this.onChange} />
                        </Item>
                        <Item>
                            <Text emptyValue label='Save Location' name='saveLocation' value={form.saveLocation} onChange={this.onChange} disabled={disableManualInputs} />
                        </Item>
                        <Item>
                            <Text emptyValue label='Rename To' name='renameTorrent' value={form.renameTorrent} onChange={this.onChange} />
                        </Item>
                        <Item>
                            <Select label='Category' value={form.category} options={selectableCategories} onChange={this.onChange} />
                        </Item>
                        <Item>
                            <Text emptyValue label='Download Rate (kb/s)' name='limitDownloadRate' value={form.limitDownloadRate} onChange={this.onChange} />
                        </Item>
                        <Item>
                            <Text emptyValue label='Upload Rate (kb/s)' name='limitUploadRate' value={form.limitUploadRate} onChange={this.onChange} />
                        </Item>
                        <Item>
                            <Checkbox label='Start Torrent' name='startTorrent' value={form.startTorrent} onChange={this.onChange}  />
                        </Item>
                        <Item>
                            <Checkbox label='Skip Hash Check' name='skipHash' value={form.skipHash} onChange={this.onChange} />
                        </Item>
                        <Item>
                            <Checkbox label='Create Subfolder' name='createSubDirectory' value={form.createSubDirectory} onChange={this.onChange} />
                        </Item>
                        <Item>
                            <Checkbox label='Download Sequentially' name='downloadSequential' value={form.downloadSequential} onChange={this.onChange} />
                        </Item>
                        <Item>
                            <Checkbox label='Download First/Last Pieces' name='downloadFirstLast' value={form.downloadFirstLast} onChange={this.onChange} />
                        </Item>
                    </Container>
                    
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        margin: theme.spacing(1),
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    body: {

    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: theme.spacing(1),
    },
    close: {
        cursor: 'pointer',
    },
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
