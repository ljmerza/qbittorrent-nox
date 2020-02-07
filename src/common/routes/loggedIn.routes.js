import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';

import { configActions } from 'containers/config/config.reducer';
import TorrentsComponent from 'containers/torrents';
import FiltersComponent from 'containers/filters';

import { getLoading } from 'containers/torrents/torrents.selectors';
import { torrentsActions } from 'containers/torrents/torrents.reducer';
import { getConfigInternalRefreshInterval } from 'containers/config/config.selectors';

class LoggedInRoutes extends PureComponent {
    componentDidMount() {
        this.props.getConfig();
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
        return (
            <Switch>
                <Route exact path="/torrents" component={TorrentsComponent} />
                <Route exact path="/filters" component={FiltersComponent} />
                <Redirect from="*" to="/torrents" />
            </Switch>
        );
    }
}

LoggedInRoutes.propTypes = {
    refreshInterval: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    getTorrents: PropTypes.func.isRequired,
    getConfig: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        loading: getLoading(state),
        refreshInterval: getConfigInternalRefreshInterval(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getTorrents: () => dispatch(torrentsActions.torrents()),
        getConfig: () => dispatch(configActions.getConfig()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(LoggedInRoutes);