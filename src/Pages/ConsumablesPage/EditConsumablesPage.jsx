import React from 'react';
import { useParams } from "react-router-dom";
import {
    Box
} from '@mui/material';

import { ConsumableComponent } from '../ConsumablesPage/ConsumableComponent';

const EditConsumablesPage = () => {
    let { chTokenConsumable } = useParams();

    return (
        <Box>
            <ConsumableComponent chTokenConsumable={chTokenConsumable} actions="edit" />
        </Box>
    );

}

export { EditConsumablesPage };