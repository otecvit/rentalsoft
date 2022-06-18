import React from 'react';
import {
    Box
} from '@mui/material';

import { ConsumableComponent } from '../ConsumablesPage/ConsumableComponent';

const NewConsumablePage = () => {

    return (
        <Box>
            <ConsumableComponent actions="add" />
        </Box>
    );

}

export { NewConsumablePage };