import React, { useState, useEffect } from 'react';
import { useHistory, Link, Route, Redirect, Switch } from "react-router-dom";

import { EditServicePage } from '../ServicesPage/EditServicePage';
import { BrowseServicesPage } from '../ServicesPage/BrowseServicesPage';
import { NewServicePage } from '../ServicesPage/NewServicePage';
// import { ViewCustomerPage } from '../CustomersPage/ViewCustomerPage';
// import { NewCustomerPage } from '../CustomersPage/NewCustomerPage';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


function ServicesPage() {

    return (
        <div>
            <Switch>
                <Route path="/services/new" component={NewServicePage} />
                {/* <Route path="/customers/view/:chTokenCustomer" component={ViewCustomerPage} /> */}
                <Route path="/services/detail/:chTokenService" component={EditServicePage} />
                <Route path="/services" component={BrowseServicesPage} />
            </Switch>
        </div>
    );
}

export { ServicesPage };