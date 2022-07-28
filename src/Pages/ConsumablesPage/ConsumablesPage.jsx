import React, { useState, useEffect } from 'react';
import { useHistory, Link, Route, Redirect, Switch } from "react-router-dom";

import { EditConsumablesPage } from '../ConsumablesPage/EditConsumablesPage';
import { BrowseConsumablesPage } from '../ConsumablesPage/BrowseConsumablesPage';
import { NewConsumablePage } from '../ConsumablesPage/NewConsumablePage';
// import { ViewCustomerPage } from '../CustomersPage/ViewCustomerPage';
// import { NewCustomerPage } from '../CustomersPage/NewCustomerPage';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


function ConsumablesPage() {

    return (
        <div>
            <Switch>
                <Route path="/consumables/new" component={NewConsumablePage} />
                {/* <Route path="/customers/view/:chTokenCustomer" component={ViewCustomerPage} /> */}
                <Route path="/consumables/detail/:chTokenConsumable" component={EditConsumablesPage} />
                <Route path="/consumables" component={BrowseConsumablesPage} />
            </Switch>
        </div>
    );
}

export { ConsumablesPage };