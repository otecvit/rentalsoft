import React from 'react';
import { useParams } from "react-router-dom";
import {
    Box
} from '@mui/material';

import { ServiceComponent } from '../ServicesPage/ServiceComponent';

const EditServicePage = () => {
    let { chTokenService } = useParams();

    return (
        <Box>
            <ServiceComponent chTokenService={chTokenService} actions="edit" />
        </Box>
    );

}

export { EditServicePage };