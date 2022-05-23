import React, { useState, useEffect } from 'react';
import { useHistory, Link, Route, Redirect, Switch } from "react-router-dom";

import { NewInventoryPage } from './NewInventoryPage';
import { EditInventoryPage } from '../InventoryPage/EditInventoryPage';
import { BrowseInventoryPage } from '../InventoryPage/BrowseInventoryPage';
import { ViewInventoryPage } from '../InventoryPage/ViewInventoryPage';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


function InventoryPage() {

    return (
        <div>
            <Switch>
                <Route path="/inventory/new" component={NewInventoryPage} />
                <Route path="/inventory/view/:inventoryToken" component={ViewInventoryPage} />
                <Route path="/inventory/detail/:inventoryToken" component={EditInventoryPage} />
                <Route path="/inventory" component={BrowseInventoryPage} />
            </Switch>
        </div>
    );
}

export { InventoryPage };