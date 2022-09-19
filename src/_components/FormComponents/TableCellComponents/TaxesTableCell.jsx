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
            <TableCell align="left">{row.chTaxRate}%</TableCell>
            <TableCell align="left">
                {
                    row.blDefault === "0" ?
                        <BoxChipVariants type="redcolor" text="No" /> :
                        <BoxChipVariants type="success" text="Yes" />
                }
            </TableCell>
            <TableCell align="left">
                {
                    row.blActive === "0" ?
                        <BoxChipVariants type="redcolor" text="Deactive" /> :
                        <BoxChipVariants type="success" text="Active" />
                }
            </TableCell>
        </>
    );
}

export { TaxesTableCell };