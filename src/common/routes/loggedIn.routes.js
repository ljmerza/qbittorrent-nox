import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';

import { configActions } from 'containers/config/config.reducer';
import TorrentsComponent from 'containers/torrents';
import FiltersComponent from 'containers/filters';


function LoggedInRoutes({ getConfig }) {
    useEffect(() => {
        getConfig();
    });

    return (
        <Switch>
            <Route exact path="/torrents" component={TorrentsComponent} />
            <Route exact path="/filters" component={FiltersComponent} />
            <Redirect from="*" to="/torrents" />
        </Switch>
    );
}

LoggedInRoutes.propTypes = {
    getConfig: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        getConfig: () => dispatch(configActions.getConfig()),
    };
}

export default compose(
    connect(null, mapDispatchToProps)
)(LoggedInRoutes);
