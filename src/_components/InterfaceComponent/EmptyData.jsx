import React from "react";
import {
    Typography,
    Breadcrumbs,
    Stack,
} from '@mui/material';
import { styled } from '@mui/system';

import EmptyContent from '../../image/icons/empty_content.svg';



const EmptyData = ({ title, subtitle = "", size = "200px" }) => {

    const TableLabel = styled('div')({
        fontSize: '0.80rem',
        color: 'rgb(39, 44, 52)',
        fontWeight: '700',
    });

    return (
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={0}>
            <img src={EmptyContent} width={size} alt="No data" />
            <TableLabel>{title}</TableLabel>
            <TableLabel>{subtitle}</TableLabel>
        </Stack>
    )
}

export default EmptyData;