import React from "react";
import {
    Box,
} from '@mui/material';
import { InventoryComponent } from '../InventoryPage/InventoryComponent';

function NewInventoryPage() {

    return (
        <Box>
            <InventoryComponent actions="add" />
        </Box>
    );


}

export { NewInventoryPage }