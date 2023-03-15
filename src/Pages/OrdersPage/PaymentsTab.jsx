import React, { useState, useEffect } from 'react';
import { FormProvider, useForm, Controller } from "react-hook-form";

import {
    Button,
    Dialog,
    InputAdornment,
    Grid,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import BoxStyled from '../../_components/StyledComponent/BoxStyled';
import BoxStyledTop from '../../_components/StyledComponent/BoxStyledTop';


import { DataGridComponent } from "../../_components/FormComponents/DataGridComponent";




const headCells = [
    {
        id: 'iNom',
        numeric: false,
        label: '#',
        align: 'left',
        width: 30,
    },
    {
        id: 'Avatar',
        numeric: false,
        label: '',
        align: 'left',
    },
    {
        id: 'chName',
        numeric: false,
        label: 'Name',
        align: 'left',
    },
    {
        id: 'chStaus',
        numeric: false,
        label: 'Name',
        align: 'left',
    },
    {
        id: 'chwww',
        numeric: false,
        label: 'Name',
        align: 'left',
    },
    {
        id: 'chwww2',
        numeric: false,
        label: 'Name',
        align: 'left',
    },
    {
        id: 'actions',
        numeric: true,
        label: '',
        align: 'left',
        width: 5,
    },
];

export const PaymentsTab = () => {
    return (
        <>

            <BoxStyled>
                <DataGridComponent
                    data={[]}
                    handleClear={() => { }}
                    type="bundles"
                    headCells={headCells}
                    chTokenCompany={""}
                />
            </BoxStyled>
        </>
    )
}

//export { PaymentsTab };