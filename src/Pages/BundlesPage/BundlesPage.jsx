import React, { useState, useEffect } from 'react';
import { useHistory, Link, Route, Redirect, Switch } from "react-router-dom";

import { EditBundlePage } from '../BundlesPage/EditBundlePage';
import { BrowseBundlesPage } from '../BundlesPage/BrowseBundlesPage';
import { NewBundlePage } from '../BundlesPage/NewBundlePage';
// import { ViewCustomerPage } from '../CustomersPage/ViewCustomerPage';
// import { NewCustomerPage } from '../CustomersPage/NewCustomerPage';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


function BundlesPage() {

    return (
        <div>
            <Switch>
                <Route path="/bundles/new" component={NewBundlePage} />
                {/* <Route path="/customers/view/:chTokenCustomer" component={ViewCustomerPage} /> */}
                <Route path="/bundles/detail/:chTokenBundle" component={EditBundlePage} />
                <Route path="/bundles" component={BrowseBundlesPage} />
            </Switch>
        </div>
    );
}

export { BundlesPage };