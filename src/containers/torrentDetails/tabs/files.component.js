import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { getSettingsInternalRefreshInterval } from 'containers/settings/settings.selectors';
import LoadingIndicator from 'components/LoadingIndicator';

import { torrentDetailsActions } from '../torrentDetails.reducer';
import { getFilesInfoLoading, getFilesInfo } from '../torrentDetails.selectors';

import FileGroup from './files/fileGroup.component';
import { groupByFolderPath } from './files/tools';

function FilesTab({ refreshInterval, getFilesInfo, data, loading }) {

    useEffect(() => {
        getFilesInfo();
        const timerId = setInterval(() => {
            if (!loading) getFilesInfo();
        }, refreshInterval);
        return () => clearInterval(timerId);
    }, [getFilesInfo, refreshInterval, loading]);


    if (!data.length && loading) {
        return <LoadingIndicator noOverlay />
    } else if (!data.length) {
        return null;
    }

    const groupedFiles = groupByFolderPath(data);
    return groupedFiles.map(group => <FileGroup key={group.folder} group={group} />);
}


FilesTab.propTypes = {
    refreshInterval: PropTypes.number.isRequired,
    getFilesInfo: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        refreshInterval: getSettingsInternalRefreshInterval(state),
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
