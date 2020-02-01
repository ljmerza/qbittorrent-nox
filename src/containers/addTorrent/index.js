import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { compose } from 'recompose';
// import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import Text from 'components/fields/text.component';
import Select from 'components/fields/select.component';
import { Container, Item } from 'components/grid.component';
import Modal from 'components/modal.component';

class AddTorrentContainer extends Component {
    state = {
        open: false,
        form: {
            torrent: '',
            managementMode: '',
            saveLocation: '',
            cookie: '',
            renameTorrent: '',
            category: '',
            startTorrent: true,
            skipHash: false,
            createSubDirectory: true,
            downloadSequential: true,
            downloadFirstLast: true,
            limitDownloadRate: 0,
            limitUploadRate: 0,
        }
    }

    handleOpen = () => this.setState({ open: true });
    handleClose = () => this.setState({ open: false });

    onChange = ({ target: { name, value } }) => {
        console.log({ name, value })
    }
    
    render(){
        const { classes, children } = this.props;
        const { form } = this.state;

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
                            <Select label='Torrent Management Mode' name='managementMode' value={form.categoryUi} options={[]} onChange={this.onChange} />
                        </Item>
                        <Item>
                            <Text emptyValue label='Save Location' name='saveLocation' value={form.saveLocation} onChange={this.onChange}/>
                        </Item>
                        <Item>
                            <Text emptyValue label='Cookie' name='cookie' value={form.cookie} onChange={this.onChange} />
                        </Item>
                        <Item>
                            <Text emptyValue label='Rename To' name='renameTorrent' value={form.renameTorrent} onChange={this.onChange} />
                        </Item>
                        <Item>
                            <Text emptyValue label='Download Rate' name='limitDownloadRate' value={form.limitDownloadRate} onChange={this.onChange} />
                        </Item>
                        <Item>
                            <Text emptyValue label='Upload Rate' name='limitUploadRate' value={form.limitUploadRate} onChange={this.onChange} />
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

};

export default compose(
    withStyles(styles),
    // connect(null, mapDispatchToProps)
)(AddTorrentContainer);
