import React from 'react'
import {
    TableCell,
    Typography,
    Stack
} from '@mui/material';
import BoxChipVariants from '../../StyledComponent/BoxChipVariants';

const InventoryTableCell = ({ row }) => {

    return (
        <>
            <TableCell align="left"><Typography variant="subtitle2">#{row.iNom}</Typography></TableCell>
            <TableCell align="left">
                <Stack direction="row" justifyContent="flex-start" alignItems="center">
                    {/* <Avatar alt={row.chName} src={row.arrFilePath ? row.arrFilePath[0].file : ""} variant="avatartable" /> */}
                    <Typography variant="subtitle2">{row.chName}</Typography>
                </Stack>
            </TableCell>
            <TableCell align="left">
                <BoxChipVariants type="quantity" text={row.chCountItem} />
            </TableCell>
            <TableCell align="left">Starting at $20.00</TableCell>
            <TableCell align="left">
                <BoxChipVariants type="success" text="active" />
            </TableCell>
        </>
    );
}

export { InventoryTableCell };