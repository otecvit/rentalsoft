import React from 'react';
import {
    Box
} from '@mui/material';

import { CustomerComponent } from '../CustomersPage/CustomerComponent';

const NewCustomerPage = () => {

    return (
        <Box>
            <CustomerComponent actions="add" />
        </Box>
    );

}

export { NewCustomerPage };