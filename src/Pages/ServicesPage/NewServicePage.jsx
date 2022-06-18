import React from 'react';
import {
    Box
} from '@mui/material';

import { ServiceComponent } from '../ServicesPage/ServiceComponent';

const NewServicePage = () => {


    return (
        <Box>
            <ServiceComponent actions="add" />
        </Box>
    );

}

export { NewServicePage };