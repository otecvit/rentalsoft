import React from "react";
import {
    Typography,
    Breadcrumbs,
    Stack,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';


const HeaderComponent = ({ title, breadcrumbs, loading = false }) => {


    return (
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={5}>
            <Typography variant="h4">
                {loading ? <Skeleton width={310} height={50} /> : title}
            </Typography>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    )
}

export default HeaderComponent;