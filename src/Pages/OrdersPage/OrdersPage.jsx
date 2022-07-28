import React, { useState, useEffect } from 'react';
import { useHistory, Link, Route, Redirect, Switch } from "react-router-dom";

import { EditOrderPage } from '../OrdersPage/EditOrderPage';
import { BrowseOrdersPage } from '../OrdersPage/BrowseOrdersPage';
import { NewOrderPage } from '../OrdersPage/NewOrderPage';
// import { ViewCustomerPage } from '../CustomersPage/ViewCustomerPage';
// import { NewCustomerPage } from '../CustomersPage/NewCustomerPage';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


function OrdersPage() {

    return (
        <div>
            <Switch>
                <Route path="/orders/new" component={NewOrderPage} />
                {/* <Route path="/customers/view/:chTokenCustomer" component={ViewCustomerPage} /> */}
                <Route path="/orders/detail/:chTokenOrder" component={EditOrderPage} />
                <Route path="/orders" component={BrowseOrdersPage} />
            </Switch>
        </div>
    );
}

export { OrdersPage };