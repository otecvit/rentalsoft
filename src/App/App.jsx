import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { history } from '../_helpers';
import { PrivateRoute } from '../_components';

import { HomePage } from '../HomePage';
import { AuthenticationPage } from '../Pages/AuthenticationPage';



function App() {

    return (
        <Router history={history}>
            <Switch>
                <PrivateRoute path="/dashboard" component={HomePage} />
                <PrivateRoute path="/customers" component={HomePage} />
                <Route exact path="/">
                    <Redirect exact from="/" to="dashboard" />
                </Route>
                <Route path="/login" component={AuthenticationPage} />
                <Route path="/register" component={AuthenticationPage} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    );
}

export { App };

/*
<PrivateRoute path="/dashboard" component={HomePage} />
<PrivateRoute path="/customers" component={HomePage} />
                            <Route exact path="/">
                                <Redirect exact from="/" to="dashboard" />
                            </Route>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Redirect from="*" to="/" />


<PrivateRoute exact path="/" component={HomePage} />
<Redirect from="*" to="/" />
*/ 

/**
                            <PrivateRoute exact path="/dashboard" component={HomePage} />
                            <PrivateRoute exact path="/customers" component={{main: CustomersPage}} />
                            
                            <Route exact path="/">
                                <Redirect exact from="/" to="dashboard" />
                            </Route>
 

*/