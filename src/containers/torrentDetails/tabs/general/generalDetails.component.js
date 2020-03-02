import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import { getSettingsInternalRefreshInterval } from 'containers/settings/settings.selectors';
import LoadingIndicator from 'components/LoadingIndicator';

import { torrentDetailsActions } from '../../torrentDetails.reducer';
import { getGeneralInfoLoading, getGeneralInfo, getSelectedTorrent } from '../../torrentDetails.selectors';

import GeneralTabInformation from './information.component';
import GeneralTabTransfer from './transfer.component';

function GeneralDetailsTab({ refreshInterval, getGeneralInfo, loading, generalInfo, selectedTorrent, classes }) {

    useEffect(() => {
        getGeneralInfo();
        const timerId = setInterval(() => {
            if (!loading) getGeneralInfo();
        }, refreshInterval);
        return () => clearInterval(timerId);
    }, [getGeneralInfo, refreshInterval, loading]);

    if (!selectedTorrent) return null;
    if (!generalInfo) return <div className={classes.progressIndicator}><LoadingIndicator noOverlay /></div>;

    return (
        <>
            <GeneralTabInformation generalInfo={generalInfo} selectedTorrent={selectedTorrent} />
            <GeneralTabTransfer generalInfo={generalInfo} />
        </>
    );
}

GeneralDetailsTab.propTypes = {
    refreshInterval: PropTypes.number.isRequired,
    getGeneralInfo: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    generalInfo: PropTypes.any,
    selectedTorrent: PropTypes.any,
};

const styles = theme => ({
    progressIndicator: {
        marginTop: theme.spacing(3),
    }
});

const mapStateToProps = state => {
    return {
        refreshInterval: getSettingsInternalRefreshInterval(state),
        loading: getGeneralInfoLoading(state),
        generalInfo: getGeneralInfo(state),
        selectedTorrent: getSelectedTorrent(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getGeneralInfo: () => dispatch(torrentDetailsActions.getGeneralInfo()),
    };
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(GeneralDetailsTab);
