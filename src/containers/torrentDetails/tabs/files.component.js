import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';

import Card from '../../../components/card.component';
import Text from '../../../components/fields/text.component';
import { Item } from '../../../components/grid.component';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { torrentDetailsActions } from '../torrentDetails.reducer';
import { getFilesInfoLoading, getFilesInfo } from '../torrentDetails.selectors';
import { getConfigInternalRefreshInterval } from '../../config/config.selectors';

const SIDEBAR_TAB_HEIGHT = 100;

const FileCard = ({ file }) => {
    return (
        <Card key={file.url} title={file.name}>
            <Item>
                <Text label='Size' disabled value={file.sizeUi} />
            </Item>
            <Item>
                <Text label='Progress' disabled value={file.progressUi} />
            </Item>
            <Item>
                <Text label='Priority' disabled value={file.priorityUi} />
            </Item>
            <Item>
                <Text label='Availability' disabled value={file.availabilityUi} />
            </Item>
        </Card>
    )
}
function FilesTab({ refreshInterval, getFilesInfo, loading, data }) {

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

    return (
        <Virtuoso
            style={{ height: `calc(100vh - ${SIDEBAR_TAB_HEIGHT}px)` }}
            totalCount={data.length}
            item={index => <FileCard file={data[index]} />}
        />
    )
}


FilesTab.propTypes = {
    refreshInterval: PropTypes.number.isRequired,
    getFilesInfo: PropTypes.func.isRequired,
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
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(FilesTab);
