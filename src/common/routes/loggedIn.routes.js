import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import TorrentsComponent from '../../containers/torrents';
import FiltersComponent from '../../containers/filters';

function LoggedInRoutes() {
    return (
        <Switch>
            <Route exact path="/torrents" component={TorrentsComponent} />
            <Route exact path="/filters" component={FiltersComponent} />
            <Redirect from="*" to="/torrents" />
        </Switch>
    );
}

export default LoggedInRoutes;