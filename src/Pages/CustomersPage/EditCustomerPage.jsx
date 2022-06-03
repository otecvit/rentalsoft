import React from 'react';
import { useParams } from "react-router-dom";
import {
  Box
} from '@mui/material';

import { CustomerComponent } from '../CustomersPage/CustomerComponent';

const EditCustomerPage = () => {
  let { chTokenCustomer } = useParams();

  return (
    <Box>
      <CustomerComponent chTokenCustomer={chTokenCustomer} actions="edit" />
    </Box>
  );

}

export { EditCustomerPage };