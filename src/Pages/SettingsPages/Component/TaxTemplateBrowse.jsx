import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';

import {
    Grid,
    Switch,
    Button,
    InputAdornment,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { FormInputText } from "../../../_components/FormComponents/FormInputText";
import { FormInputNumber } from "../../../_components/FormComponents/FormInputNumber";

import BoxStyled from '../../../_components/StyledComponent/BoxStyled';
import BoxStyledTop from '../../../_components/StyledComponent/BoxStyledTop';


import { taxesActions } from '../../../_actions';


export const TaxTemplateBrowse = () => {

    const [open, setOpenDialog] = useState(false);

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues
    } = useForm({
        defaultValues: {

            chName: "",
            chTaxRate: "",
            blDefault: false,
        }
    });

    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);
    const taxes = useSelector(state => state.taxes);

    useEffect(() => {
        // загружаем категории
        dispatch(taxesActions.load({ chTokenCompany: user.chTokenCompany }));
    }, []);

    const TitleSection = styled('div')({
        fontSize: '1.25rem',
        color: 'rgb(39, 44, 52)',
        fontWeight: '400',
    });

    const handleOpen = () => {
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleSubmitTax = (data) => {
        setOpenDialog(false);

        if (!!data.chTokenTax)
            dispatch(taxesActions.edit({
                ...data,
                chTokenCompany: user.chTokenCompany
            })); // редактируем налог
        else {
            dispatch(taxesActions.add({
                ...data,
                chTokenCompany: user.chTokenCompany
            })); // добавляем налог
        }
    }

    const handleChangeDefault = (event) => {
        setValue("blDefault", !getValues("blDefault"));
    };

    return (
        <>
            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 12 }} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={2} md={8} >
                    <TitleSection>
                        Tax profiles
                    </TitleSection>
                </Grid>
                <Grid item xs={12} sm={1} md={4} style={{ textAlign: 'right' }}>
                    <Button variant="contained" themecolor="rentalBtnSmall" startIcon={<AddIcon />} onClick={handleOpen}>
                        Add Tax
                    </Button>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={'sm'}
            >
                <DialogTitle>Create new tax</DialogTitle>
                <DialogContent>
                    <BoxStyledTop>
                        <FormInputText name="chName" control={control} label="Name" />
                    </BoxStyledTop>
                    <BoxStyled>
                        <FormInputNumber
                            name="chTaxRate"
                            control={control}
                            label="Tax Rate"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                inputProps: { min: 0, max: 100 },
                            }}
                        />
                    </BoxStyled>
                    <BoxStyled>
                        <Controller
                            name="blDefault"
                            control={control}
                            render={(props) => {
                                return (
                                    <>
                                        <Switch
                                            name="blDefault"
                                            onChange={handleChangeDefault}
                                            value={getValues("blDefault")}
                                            checked={getValues("blDefault")}
                                        />
                                        Apply to every order by default
                                    </>
                                );
                            }}
                        />
                    </BoxStyled>
                </DialogContent>
                <DialogActions>
                    <BoxStyledTop>
                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                            <Grid item xs={12} md={6}>
                                <Button variant="contained" themecolor="rentalThemeCancel" size="large" onClick={handleClose}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button variant="contained" themecolor="rentalThemeSubmit" size="large" onClick={handleSubmit(handleSubmitTax)}>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </BoxStyledTop>
                </DialogActions>
            </Dialog>

        </>
    )

}