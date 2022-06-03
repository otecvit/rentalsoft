import React, { useState, useEffect } from 'react';
import { useHistory, Link, Route, Redirect, Switch } from "react-router-dom";

import { EditCustomerPage } from '../CustomersPage/EditCustomerPage';
import { BrowseCustomersPage } from '../CustomersPage/BrowseCustomersPage';
import { NewCustomerPage } from '../CustomersPage/NewCustomerPage';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


function CustomersPage() {

    return (
        <div>
            <Switch>
                <Route path="/customers/new" component={NewCustomerPage} />
                {/* <Route path="/inventory/view/:chTokenCustomer" component={ViewInventoryPage} /> */}
                <Route path="/customers/detail/:chTokenCustomer" component={EditCustomerPage} />
                <Route path="/customers" component={BrowseCustomersPage} />
            </Switch>
        </div>
    );
}

export { CustomersPage };