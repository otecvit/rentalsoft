import React from 'react';
import {
    Box
} from '@mui/material';

import { OrderComponent } from '../OrdersPage/OrderComponent';

const NewOrderPage = () => {

    return (
        <Box>
            <OrderComponent actions="add" />
        </Box>
    );

}

export { NewOrderPage };