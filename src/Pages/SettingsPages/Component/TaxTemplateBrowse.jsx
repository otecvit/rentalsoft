import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';

import {
    DataGrid as MuiDataGrid,
    GridColDef,
    GridApi,
    GridCellValue,
    GridCellParams
} from '@mui/x-data-grid';

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


import { taxesActions } from '../../../_actions';


const headCells = [
    {
        id: 'chName',
        numeric: false,
        label: 'Tax Name',
        align: 'left',
    },
    {
        id: 'chTaxRate',
        numeric: false,
        label: 'Tax Rate',
        align: 'center',
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
        id: 'actions',
        numeric: true,
        label: '',
        align: 'left',
        width: 5,
    },
];


const DataGrid = styled(MuiDataGrid)(({ theme }) => ({
    // "& .MuiDataGrid-columnHeaders": { display: "none" },
    // "& .MuiDataGrid-virtualScroller": { marginTop: "0!important" },

}));

const columns = [
    { field: 'chName', headerName: "Label", width: 150 },
    { field: 'chTaxRate', width: 150 },
    {
        field: "edit",
        headerName: "",
        sortable: false,
        width: 50,
        disableClickEventBubbling: true,
        renderCell: () => {
            return (
                <IconButton aria-label="edit" size="small">
                    <EditIcon fontSize="small" />
                </IconButton>
            );
        }
    },
    {
        field: "delete",
        headerName: "",
        width: 50,
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: () => {
            return (
                <IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            );
        }
    },

];

const handleClearTaxes = () => {
    dispatch(taxesActions.clear());
}


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
            chTokenTax: "",
            chName: "",
            chTaxRate: "",
            blDefault: false,
        }
    });

    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);
    const taxes = useSelector(state => state.taxes);
    const isLoading = useSelector(state => state.support.isLoading);

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
                blDefault: data.blDefault ? '1' : '0',
                chTokenCompany: user.chTokenCompany
            })); // добавляем налог
        }
    }

    const handleChangeDefault = (event) => {
        setValue("blDefault", !getValues("blDefault"));
    };

    const currentlySelected = (params) => {
        const value = params.colDef.field;
        if (!(value === "edit" || value === "delete")) {
            return;
        }

        reset({
            chTokenTax: '',
            chName: '',
            chTaxRate: '',
            blDefault: false,

        });

        // определяем текущий налог
        const currentTax = taxes.find((item) => params.chTokenTax === item.chTokenTax);

        if (value === "edit") {
            // заменяем значение в react-hook-form
            setValue("chTokenTax", currentTax.chTokenTax);
            setValue("chName", currentTax.chName);
            setValue("chTaxRate", currentTax.chTaxRate);
            setValue("blDefault", currentTax.blDefault);

            ////////////////////////////////////////
            // открываем диалог
            setOpenDialog(true);
        } else {
            setSelectedTariff(currentTax.chTokenTax);
            setOpenConfirm(true);
        }
    }


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
            <BoxStyled>
                <DataGridSettings
                    data={taxes}
                    handleClear={handleClearTaxes}
                    type="taxes"
                    headCells={headCells}
                    chTokenCompany={user.chTokenCompany}
                />
            </BoxStyled>
            <BoxStyled>
                <div style={{ height: 600, width: '100%' }}>
                    {
                        !isLoading ?
                            <DataGrid
                                columns={columns}
                                rows={taxes.map((x, index) => {
                                    return {
                                        ...x,
                                        id: index,
                                    }
                                })}
                                onCellClick={currentlySelected}
                                hideFooter
                                sx={{
                                    '&.MuiDataGrid-root': {
                                        border: 'none',
                                    },
                                }}
                            /> :
                            'Loading'
                    }
                </div>
            </BoxStyled>
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