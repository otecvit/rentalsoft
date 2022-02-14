import React, { useState, useEffect } from 'react';
import { useHistory, Link, Route, Redirect } from "react-router-dom";
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
            <div>
                field add customers
            </div>
        )
    }

    return (
        <div>
            <Route exact path="/customers" component={browseCustomers} />
            <Route path="/customers/new" component={addCustomers} />   
        </div>
    );
}

export { CustomersPage };