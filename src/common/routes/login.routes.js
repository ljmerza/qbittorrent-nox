import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import LoginComponent from 'containers/login';
import CredentialsComponent from 'containers/credentials';

function LoginRoutes() {
    return (
        <Switch>
            <Route exact path="/login">
                <LoginComponent />
            </Route>
            <Route exact path="/credentials">
                <CredentialsComponent />
            </Route>
            <Redirect from="*" to="/login" />
        </Switch>
    );
}

export default LoginRoutes;