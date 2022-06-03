import React from 'react'
import {
    TableCell,
    Typography,
    Stack,
    Avatar
} from '@mui/material';
import BoxChipVariants from '../../StyledComponent/BoxChipVariants';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            fontSize: '1.00rem',
        },
        children: `${name.replace(/ +(?= )/g, '').split(' ')[0][0]}${name.replace(/ +(?= )/g, '').split(' ')[1][0]}`,
    };
}


const CustomersTableCell = ({ row }) => {

    const name = 'Антон Исаев'
    // console.log(`${row.chFirstName.split(' ')[0][0]}${row.chLastName.split(' ')[1][0]}`);
    //console.log(`${row.chFirstName} ${row.chLastName}`);

    return (
        <>
            <TableCell align="left"><Typography variant="subtitle2">#{row.iNom}</Typography></TableCell>
            <TableCell align="left">
                <Avatar {...stringAvatar(`${row.chFirstName} ${row.chLastName}`)} />
            </TableCell>
            <TableCell align="left">
                <Stack direction="row" justifyContent="flex-start" alignItems="center">
                    {/* <Avatar alt={row.chName} src={row.arrFilePath ? row.arrFilePath[0].file : ""} variant="avatartable" /> */}
                    <Typography variant="subtitle2">{`${row.chFirstName} ${row.chLastName}`}</Typography>
                </Stack>
            </TableCell>
            <TableCell align="left">
                <BoxChipVariants type="quantity" text="10" />
            </TableCell>
            <TableCell align="left">Starting at $20.00</TableCell>
            <TableCell align="left">
                <BoxChipVariants type="success" text="active" />
            </TableCell>
        </>
    );
}

export { CustomersTableCell };