import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Text from 'components/fields/text.component';
import TextSave from 'components/fields/textSave.component';
import { Container, Item } from 'components/grid.component';
import Select from 'components/fields/select.component';

import { torrentDetailsActions, FILE_PRIORITY_UI, VALID_FILE_PRIORITIES } from '../../torrentDetails.reducer';


const FileCard = ({ file, setFilePriority, setFileRename }) => {
    const onFileNameSave = ({ target: { value } }) => setFileRename(file.fileId, value);
    const onSetPriority = priority => setFilePriority(file.fileId, priority);

    // file priority 1-4 is normal but to simplify - all normal priorities will be '4'
    const priority = VALID_FILE_PRIORITIES.includes(file.priority) ? file.priority : 4;

    return (
        <Container>
            <Item xs={12} sm={12} md={12}>
                <TextSave label='Name' value={file.fileName} onSave={onFileNameSave} />
            </Item>
            <Item>
                <Text label='Size' disabled value={file.sizeUi} />
            </Item>
            <Item>
                <Text label='Progress' disabled value={file.progressUi} />
            </Item>
            <Item>
                <Select label='Priority' value={priority} options={FILE_PRIORITY_UI} onChange={onSetPriority} />
            </Item>
            <Item>
                <Text label='Availability' disabled value={file.availabilityUi} />
            </Item>
        </Container>
    );
}

FileCard.propTypes = {
    setFilePriority: PropTypes.func.isRequired,
    setFileRename: PropTypes.func.isRequired,
    file: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        setFilePriority: (fileId, priority) => dispatch(torrentDetailsActions.setFilePriority({ fileId, priority })),
        setFileRename: (fileId, name) => dispatch(torrentDetailsActions.setFileRename({ fileId, name })),
    };
}

export default compose(
    connect(
        null,
        mapDispatchToProps
    )
)(FileCard);

