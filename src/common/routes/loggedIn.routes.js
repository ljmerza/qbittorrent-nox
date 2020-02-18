import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';


import LoadingIndicator from 'components/LoadingIndicator';

import TorrentsComponent from 'containers/torrents';
import FiltersComponent from 'containers/filters';
import SettingsComponent from 'containers/settings';

import { getLoading } from 'containers/torrents/torrents.selectors';
import { getSettingsInternalRefreshInterval, getSettingsLoading } from 'containers/settings/settings.selectors';
import { settingsActions } from 'containers/settings/settings.reducer';
import { torrentsActions } from 'containers/torrents/torrents.reducer';

class LoggedInRoutes extends PureComponent {
    componentDidMount() {
        this.props.getSettings();
        this.props.getTorrents();

        // load every set interval unless currently loading
        this._interval = setInterval(async () => {
            if (this.props.loading) return;
            this.props.getTorrents();

        }, this.props.refreshInterval);
    }

    componentWillUnmount() {
        if (this._interval) clearInterval(this._interval);
    }

    render(){
        if (this.props.loadingSettings) return <LoadingIndicator />;
        
        return (
            <Switch>
                <Route path="/torrents">
                    <TorrentsComponent />
                </Route>
                <Route path="/filters">
                    <FiltersComponent />
                </Route>
                <Route path="/settings">
                    <SettingsComponent />
                </Route>
                <Redirect from="*" to="/torrents" />
            </Switch>
        );
    }
}

LoggedInRoutes.propTypes = {
    refreshInterval: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    loadingSettings: PropTypes.bool.isRequired,
    getTorrents: PropTypes.func.isRequired,
    getSettings: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        loading: getLoading(state),
        loadingSettings: getSettingsLoading(state),
        refreshInterval: getSettingsInternalRefreshInterval(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getTorrents: () => dispatch(torrentsActions.torrents()),
        getSettings: () => dispatch(settingsActions.getSettings()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(LoggedInRoutes);