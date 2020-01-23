import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { getConfigInternalRefreshInterval } from 'containers/config/config.selectors';
import LoadingIndicator from 'components/LoadingIndicator';

import { torrentDetailsActions } from '../torrentDetails.reducer';
import { getGeneralInfoLoading, getGeneralInfo, getSelectedTorrent } from '../torrentDetails.selectors';

import GeneralTabActions from './general/actions.component';
import GeneralTabInformation from './general/information.component';
import GeneralTabTransfer from './general/transfer.component';


function GeneralTab({ refreshInterval, getGeneralInfo, loading, generalInfo, selectedTorrent }){

    useEffect(() => {
        getGeneralInfo();
        let timerId = setInterval(getGeneralInfo, refreshInterval);
        return () => clearInterval(timerId);
    }, [getGeneralInfo, refreshInterval]);

    console.log({ loading, generalInfo })

    return (
        <>
            {selectedTorrent ? <GeneralTabActions selectedTorrent={selectedTorrent} /> : null}
            {(loading && !generalInfo) ? <LoadingIndicator noOverlay /> : (
                !selectedTorrent ? null : (
                    <>
                        <GeneralTabInformation generalInfo={generalInfo} selectedTorrent={selectedTorrent} />
                        <GeneralTabTransfer generalInfo={generalInfo} />
                    </>
                )
            )}
        </>
    )
}

GeneralTab.propTypes = {
    refreshInterval: PropTypes.number.isRequired,
    getGeneralInfo: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    generalInfo: PropTypes.any,
    selectedTorrent: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        refreshInterval: getConfigInternalRefreshInterval(state),
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
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(GeneralTab);
