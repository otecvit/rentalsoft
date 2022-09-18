import React from 'react'
import {
    TableCell,
    Typography,
    Stack
} from '@mui/material';
import BoxChipVariants from '../../StyledComponent/BoxChipVariants';

const TaxesTableCell = ({ row }) => {

    return (
        <>
            <TableCell align="left">
                <Stack direction="row" justifyContent="flex-start" alignItems="center">
                    <Typography variant="subtitle2">{row.chName}</Typography>
                </Stack>
            </TableCell>
            <TableCell align="center">
                <BoxChipVariants type="quantity" text={`${row.chTaxRate}%`} />
            </TableCell>
            <TableCell align="left">Starting at $20.00</TableCell>
            <TableCell align="left">
                <BoxChipVariants type="success" text="active" />
            </TableCell>
        </>
    );
}

export { TaxesTableCell };