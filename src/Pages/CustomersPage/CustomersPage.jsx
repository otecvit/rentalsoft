import React, { useState, useEffect } from 'react';
import { useHistory, Link, Route, Redirect, Switch  } from "react-router-dom";

import { EditCustomerPage } from '../CustomersPage/EditCustomerPage'

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


function CustomersPage() {
    const history = useHistory();

    const handleAddCustomer = () =>{ 
        let path = `/customers/new`; 
        history.push(path);
    }

    const browseCustomers = () => {
        return (
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddCustomer}>
                ADD CUSTOMER
            </Button>
        )
    }

    const addCustomers = () => {
        return (
            <EditCustomerPage />
        )
    }

    return (
        <div>
            <Switch>
                <Route path="/customers/new" component={EditCustomerPage}/>
                <Route path="/customers" component={browseCustomers}/>
            </Switch>
        </div>
    );
}

export { CustomersPage };