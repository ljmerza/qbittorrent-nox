import React, { PureComponent } from 'react';
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

class GeneralDetailsTab extends PureComponent {
    componentDidMount(){
        this.timerId = setInterval(() => {
            if (!this.props.loading) this.props.getGeneralInfo();
        }, this.props.refreshInterval);
    }
    
    componentWillUnmount() {
        if (this.timerId) clearInterval(this.timerId);
    }

    render(){
        if (!this.props.selectedTorrent) return null;
        if (!this.props.generalInfo) return <div className={this.props.classes.progressIndicator}><LoadingIndicator noOverlay /></div>;

        return (
            <>
                <GeneralTabInformation generalInfo={this.props.generalInfo} selectedTorrent={this.props.selectedTorrent} />
                <GeneralTabTransfer generalInfo={this.props.generalInfo} />
            </>
        );
    }
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
