import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';

import {
    Grid,
    Switch,
    Button,
    InputAdornment,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { FormInputText } from "../../../_components/FormComponents/FormInputText";
import { FormInputNumber } from "../../../_components/FormComponents/FormInputNumber";
import { DataGridSettings } from "../../../_components/FormComponents/DataGridSettings";

import BoxStyled from '../../../_components/StyledComponent/BoxStyled';
import BoxStyledTop from '../../../_components/StyledComponent/BoxStyledTop';


import { templatesActions } from '../../../_actions';


const headCells = [
    {
        id: 'chName',
        numeric: false,
        label: 'Template Name',
        align: 'left',
    },
    {
        id: 'blActive',
        numeric: false,
        label: 'Active',
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

const handleClearTemplates = () => {
    dispatch(templatesActions.clear());
}


export const PrintTemplateBrowse = () => {

    const history = useHistory();
    const [open, setOpenDialog] = useState(false);

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues
    } = useForm({
        defaultValues: {
            chTokenTax: "",
            chName: "",
            chTaxRate: "",
            blDefault: false,
            blActive: true,
        }
    });

    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);
    const templates = useSelector(state => state.templates);
    const isLoadingTemplates = useSelector(state => state.support.isLoadingTemplates);

    useEffect(() => {
        // загружаем категории
        dispatch(templatesActions.load({ chTokenCompany: user.chTokenCompany }));
    }, []);

    const TitleSection = styled('div')({
        fontSize: '1.25rem',
        color: 'rgb(39, 44, 52)',
        fontWeight: '400',
    });

    const handleOpen = () => {
        reset({
            chTokenTax: '',
            chName: '',
            chTaxRate: '',
            blDefault: false,
            blActive: true,

        });

        setOpenDialog(true);
    }


    const handleRemoveTax = (data) => {
        dispatch(templatesActions.remove({
            chTokenTax: data,
            chTokenCompany: user.chTokenCompany,
        }))
    }

    const handleAddTemplate = () => {
        let path = `/templates/new`;
        history.push(path);
    }

    const handleEditTemplate = (chEditTokenTemplate) => {

        let path = `/templates/${chEditTokenTemplate}`;
        history.push(path);

        // reset({
        //     chTokenTax: '',
        //     chName: '',
        //     chTaxRate: '',
        //     blDefault: false,
        //     blActive: true,

        // });

        // // определяем текущий налог
        // const currentTax = taxes.find((item) => chEditTokenTax === item.chTokenTax);

        // setValue("chTokenTax", currentTax.chTokenTax);
        // setValue("chName", currentTax.chName);
        // setValue("chTaxRate", currentTax.chTaxRate);
        // setValue("blDefault", currentTax.blDefault === "0" ? false : true);
        // setValue("blActive", currentTax.blActive === "0" ? false : true);

        // setOpenDialog(true);
    }


    return (
        <>
            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 12 }} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={2} md={8} >
                    <TitleSection>
                        Print template
                    </TitleSection>
                </Grid>
                <Grid item xs={12} sm={1} md={4} style={{ textAlign: 'right' }}>
                    <Button variant="contained" themecolor="rentalBtnSmall" startIcon={<AddIcon />} onClick={handleAddTemplate}>
                        Add Template
                    </Button>
                </Grid>
            </Grid>
            <BoxStyled>
                <DataGridSettings
                    data={templates}
                    handleClear={handleClearTemplates}
                    handleEdit={handleEditTemplate}
                    handleRemove={handleRemoveTax}
                    type="templates"
                    headCells={headCells}
                    chTokenCompany={user.chTokenCompany}
                />
            </BoxStyled>
        </>
    )

}