import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import LoadingIndicator from '../../../components/LoadingIndicator';
import { torrentDetailsActions } from '../torrentDetails.reducer';
import { getGeneralInfoLoading, getGeneralInfo, getSelectedTorrent } from '../torrentDetails.selectors';
import { getConfigInternalRefreshInterval } from '../../config/config.selectors';

import GeneralTabActions from './general/actions.component';
import GeneralTabInformation from './general/information.component';
import GeneralTabTransfer from './general/transfer.component';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1),
    },
    actionsBar: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}));

function GeneralTab({ refreshInterval, getGeneralInfo, loading, data, selectedTorrent }){
    const classes = useStyles();
    const [changedFields, setChangedFields] = useState({})

    useEffect(() => {
        getGeneralInfo();
        let timerId = setInterval(getGeneralInfo, refreshInterval);
        return () => clearInterval(timerId);
    }, [getGeneralInfo, refreshInterval]);

    const onChange = useCallback(({ target: { name, value } }) => {
        const numbersOnly = ['dl_limit', 'up_limit'].includes(name);
        if(numbersOnly) value = value.replace(/\D/g, '');

        setChangedFields({ ...changedFields, [name]: value });
    }, [changedFields]);

    if (!data && loading){
        return <LoadingIndicator noOverlay />
    } else if (!data || !selectedTorrent){
        return null;
    }

    return ( 
        <>
            <GeneralTabActions classes={classes} selectedTorrent={selectedTorrent} />

            <GeneralTabInformation 
                classes={classes} 
                setChangedFields={setChangedFields} 
                changedFields={changedFields} 
                onChange={onChange} 
                data={data} 
                selectedTorrent={selectedTorrent} 
            />

            <GeneralTabTransfer
                classes={classes}
                onChange={onChange}
                data={data}
                changedFields={changedFields}
                setChangedFields={setChangedFields}
            />
        </>
    )
}


GeneralTab.propTypes = {
    refreshInterval: PropTypes.number.isRequired,
    getGeneralInfo: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.any,
    selectedTorrent: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        refreshInterval: getConfigInternalRefreshInterval(state),
        loading: getGeneralInfoLoading(state),
        data: getGeneralInfo(state),
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
