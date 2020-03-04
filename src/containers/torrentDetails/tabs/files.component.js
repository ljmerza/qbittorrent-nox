import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { getSettingsInternalRefreshInterval } from 'containers/settings/settings.selectors';
import LoadingIndicator from 'components/LoadingIndicator';

import { torrentDetailsActions } from '../torrentDetails.reducer';
import { getFilesInfoLoading, getFilesInfoGrouped } from '../torrentDetails.selectors';

import FileGroup from './files/fileGroup.component';

class FilesTab extends PureComponent {
    componentDidMount() {
        this.timerId = setInterval(() => {
            if (!this.props.loading) this.props.getFilesInfo();
        }, this.props.refreshInterval);
    }

    componentWillUnmount() {
        if (this.timerId) clearInterval(this.timerId);
    }

    render() {
        if (!this.props.data && this.props.loading) {
            return <LoadingIndicator noOverlay />
        } else if (!this.props.data || this.props.data.length === 0) {
            return null;
        }

        return this.props.data.map(group => <FileGroup key={group.folder} group={group} />);
    }
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
        data: getFilesInfoGrouped(state),
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
