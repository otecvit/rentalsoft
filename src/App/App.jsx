import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';

import { history } from '../_helpers';
import { PrivateRoute } from '../_components';

import { HomePage } from '../HomePage';
import { AuthenticationPage } from '../Pages/AuthenticationPage';
import customTheme from '../App/theme';

function App() {

    return (
        <Router history={history}>
            <ThemeProvider theme={customTheme}>
                <Switch>
                    <PrivateRoute path="/dashboard" component={HomePage} />
                    <PrivateRoute path="/customers" component={HomePage} />
                    <PrivateRoute path="/inventory" component={HomePage} />
                    <PrivateRoute path="/settings" component={HomePage} />
                    <Route exact path="/">
                        <Redirect exact from="/" to="dashboard" />
                    </Route>
                    <Route path="/login" component={AuthenticationPage} />
                    <Route path="/register" component={AuthenticationPage} />
                    <Redirect from="*" to="/" />
                </Switch>
            </ThemeProvider>
        </Router>
    );
}

export { App };