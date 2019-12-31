import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { getConfigInternalRefreshInterval } from 'containers/config/config.selectors';
import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import TextSave from 'components/fields/textSave.component';
import { Item } from 'components/grid.component';
import LoadingIndicator from 'components/LoadingIndicator';
import Select from 'components/fields/select.component';

import { torrentDetailsActions, FILE_PRIORITY_UI } from '../torrentDetails.reducer';
import { getFilesInfoLoading, getFilesInfo } from '../torrentDetails.selectors';

const FileCard = ({ file, setFilePriority, setFileRename, fileId }) => {

    console.log({ setFileRename })

    const onFileNameSave = ({ target: { value } }) => setFileRename(fileId, value);

    // need file 'id' (index in list of files) AND priority value
    const onSetPriority = priority => setFilePriority(fileId, priority);

    return (
        <Card>
            <Item xs={12} md={12} lg={12}>
                <TextSave label='Name' value={file.name} onSave={onFileNameSave} />
            </Item>
            <Item>
                <Text label='Size' disabled value={file.sizeUi}/>
            </Item>
            <Item>
                <Text label='Progress' disabled value={file.progressUi} />
            </Item>
            <Item>
                <Select label='Priority' value={file.priority} options={FILE_PRIORITY_UI} onChange={onSetPriority} />
            </Item>
            <Item>
                <Text label='Availability' disabled value={file.availabilityUi} />
            </Item>
        </Card>
    )
}
function FilesTab({ refreshInterval, getFilesInfo, loading, data, setFilePriority, setFileRename }) {

    useEffect(() => {
        getFilesInfo();
        let timerId = setInterval(getFilesInfo, refreshInterval);
        return () => clearInterval(timerId);
    }, [getFilesInfo, refreshInterval]);


    if (!data.length && loading) {
        return <LoadingIndicator noOverlay />
    } else if (!data.length) {
        return null;
    }

    return data.map((file, idx) => (
        <FileCard
            key={file.name} 
            file={file} 
            setFilePriority={setFilePriority} 
            setFileRename={setFileRename} 
            fileId={idx} 
        />
    ));
}


FilesTab.propTypes = {
    refreshInterval: PropTypes.number.isRequired,
    getFilesInfo: PropTypes.func.isRequired,
    setFilePriority: PropTypes.func.isRequired,
    setFileRename: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        refreshInterval: getConfigInternalRefreshInterval(state),
        loading: getFilesInfoLoading(state),
        data: getFilesInfo(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getFilesInfo: () => dispatch(torrentDetailsActions.getFilesInfo()),
        setFilePriority: (fileId, priority) => dispatch(torrentDetailsActions.setFilePriority({ fileId, priority })),
        setFileRename: (fileId, name) => dispatch(torrentDetailsActions.setFileRename({ fileId, name })),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(FilesTab);
