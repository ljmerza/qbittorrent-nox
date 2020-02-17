import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import LoginComponent from 'containers/login';

function LoginRoutes() {
    return (
        <Switch>
            <Route exact path="/login">
                <LoginComponent />
            </Route>
            <Redirect from="*" to="/login" />
        </Switch>
    );
}

export default LoginRoutes;