import React from "react";
import {
    Typography,
    Breadcrumbs,
    Stack,
} from '@mui/material';
import { styled } from '@mui/system';

import EmptyContent from '../../image/icons/empty_content.svg';



const EmptyData = ({ title, subtitle = "", size = "200px" }) => {

    const TitleLabel = styled('div')({
        fontSize: '0.80rem',
        color: 'rgb(86, 86, 86)',
        fontWeight: '700',
        marginTop: '25px',
    });

    const SubTitleLabel = styled('div')({
        fontSize: '0.80rem',
        color: 'rgb(39, 44, 52)',
        fontWeight: '500',
    });

    return (
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={0} sx={{ marginTop: 5, marginBottom: 5 }}>
            <img src={EmptyContent} width={size} alt="No data" />
            <TitleLabel>{title}</TitleLabel>
            <SubTitleLabel>{subtitle}</SubTitleLabel>
        </Stack>
    )
}

export default EmptyData;