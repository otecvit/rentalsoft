import React, { useState, useEffect, Fragment } from 'react'
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system'
import {
  DataGrid as MuiDataGrid,
  GridColDef,
  GridApi,
  GridCellValue,
  GridCellParams
} from '@mui/x-data-grid';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';


import { tariffsActions } from '../../_actions';

import { FormInputText } from '../FormComponents/FormInputText';
import { FormInputSelect } from '../FormComponents/FormInputSelect';

import BoxStyled from '../../_components/StyledComponent/BoxStyled';

const DataGrid = styled(MuiDataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaders": { display: "none" },
  "& .MuiDataGrid-virtualScroller": { marginTop: "0!important" },

}));

const columns = [
  { field: 'name', headerName: "Label", width: 150 },
  { field: 'stars', width: 150 },
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

export const PricingTemplateBrowse = () => {

  const [selectedTariff, setSelectedTariff] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const user = useSelector(state => state.authentication.user);
  const tariffs = useSelector(state => state.tariffs);
  const dispatch = useDispatch();

  const { handleSubmit, control, reset, setValue } = useForm(
    {
      defaultValues: {
        id: "",
        name: "",
        arrTariffDetail: [{ label: "", duration: "", period: "hours", price: "" }],
        arrExtraTariff: [{ hour: "", day: "", week: "1", month: "" }],
      }
    }
  );

  const {
    fields: arrTariffDetailFields,
    append: arrTariffDetailAppend,
    remove: arrTariffDetailRemove,
    replace: arrTariffDetailReplace,
  } = useFieldArray({
    control,
    name: "arrTariffDetail",
  });

  const {
    fields: arrExtraTariffFields,
    append: arrExtraTariffAppend,
    remove: arrExtraTariffRemove,
    replace: arrExtraTariffReplace,
  } = useFieldArray({
    control,
    name: "arrExtraTariff",
  });

  useEffect(() => {
    // загружаем тарифы
    dispatch(tariffsActions.load({ chTokenCompany: user.chTokenCompany }));
  }, []);


  const onSubmit = data => {
    // закрываем диалог
    setOpenDialog(false);

    if (!!data.id)
      dispatch(tariffsActions.edit({
        ...data,
        chTokenCompany: user.chTokenCompany
      })); // редактируем наш тариф
    else {
      dispatch(tariffsActions.add({
        ...data,
        chTokenCompany: user.chTokenCompany
      })); // добавляем наш тариф
    }
  }

  // удаляем тариф
  const onSubmitConfirm = () => {
    // закрываем диалог
    setOpenConfirm(false);
    // удаляем тариф наш тариф
    dispatch(tariffsActions.remove({
      id: selectedTariff,
      companyToken: user.companyToken
    }));
    // очищаем текущий тариф
    setSelectedTariff("");
  }


  const currentlySelected = (params) => {
    const value = params.colDef.field;
    if (!(value === "edit" || value === "delete")) {
      return;
    }

    reset({
      id: "",
      name: "",
      arrTariffDetail: [{ label: "", duration: "", period: "hours", price: "" }],
      arrExtraTariff: [{ hour: "", day: "", week: "", month: "" }],
    });

    // определяем текущий тариф
    const currentTariff = tariffs.find((item) => params.id === item.id);

    if (value === "edit") {
      // заменяем значение в react-hook-form
      setValue("name", currentTariff.name);
      setValue("id", currentTariff.id);
      arrTariffDetailReplace(currentTariff.arrTariffDetail);
      arrExtraTariffReplace(currentTariff.arrExtraTariff);
      ////////////////////////////////////////
      // открываем диалог
      setOpenDialog(true);
    } else {
      setSelectedTariff(currentTariff.id);
      setOpenConfirm(true);
    }
  }

  const handleAddTariff = () => {
    reset({
      id: "",
      name: "",
      arrTariffDetail: [{ label: "", duration: "", period: "hours", price: "" }],
      arrExtraTariff: [{ hour: "", day: "", week: "", month: "" }],
    });
    setOpenDialog(true);
  }

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  }

  const handleAddTariffDetail = () => {
    arrTariffDetailAppend({
      label: "",
      duration: "",
      period: "hours",
      price: ""
    })
  }

  const handleDelTariffDetail = (index) => {
    arrTariffDetailRemove(index);
  }


  return (
    <div style={{ height: 250, width: '100%' }}>
      Template pricing structures
      <Button onClick={handleAddTariff} color="primary">Add</Button>
      <DataGrid
        columns={columns}
        rows={tariffs}
        onCellClick={currentlySelected}
        hideFooter
        sx={{
          '&.MuiDataGrid-root': {
            border: 'none',
          },
        }}
      />
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> User </DialogTitle>
        <DialogContent>
          <BoxStyled>
            <FormInputText label="Template name" name="name" control={control} variant="outlined" />
          </BoxStyled>
          <BoxStyled>
            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 22, md: 22 }}>
              {
                arrTariffDetailFields.map((item, index) => {
                  return (
                    <Fragment key={item.id}>
                      <Grid item xs={12} sm={5} md={5}>
                        <FormInputText name={`arrTariffDetail[${index}].label`} control={control} label="Label" value={item.label} />
                      </Grid>
                      <Grid item xs={12} sm={5} md={5}>
                        <FormInputText name={`arrTariffDetail[${index}].duration`} control={control} label="Duration" value={item.duration} />
                      </Grid>
                      <Grid item xs={12} sm={5} md={5}>
                        <FormInputSelect
                          id={`period${index}`}
                          name={`arrTariffDetail[${index}].period`}
                          control={control}
                          defaultValue={item.period}
                          variant="outlined"
                          margin="normal"
                          label="Period"
                          labelId="rental-period-id"
                        >
                          <MenuItem value="hours">Hours</MenuItem>
                          <MenuItem value="days">Days</MenuItem>
                          <MenuItem value="weeks">Weeks</MenuItem>
                          <MenuItem value="months">Months</MenuItem>
                        </FormInputSelect>
                      </Grid>
                      <Grid item xs={12} sm={5} md={5}>
                        <FormInputText name={`arrTariffDetail[${index}].price`} control={control} label="Price" value={item.price} />
                      </Grid>
                      <Grid item xs={12} sm={2} md={2} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                        <IconButton aria-label="delete" onClick={() => handleDelTariffDetail(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Fragment>
                  )
                })
              }
            </Grid>
          </BoxStyled>
          <Button onClick={handleAddTariffDetail}>Add row</Button>
          <Box sx={{ minWidth: '90px' }}>
            <Typography variant="p" component="div">Each extra</Typography>
          </Box>
          <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 4, md: 4 }}>
            <Grid item xs={12} sm={1} md={1}>
              <FormInputText
                name={`arrExtraTariff[0].hour`}
                control={control}
                label="Hour"
              />
            </Grid>
            <Grid item xs={12} sm={1} md={1}>
              <FormInputText
                name={`arrExtraTariff[0].day`}
                control={control}
                label="Day"
              />
            </Grid>
            <Grid item xs={12} sm={1} md={1}>
              <FormInputText
                name={`arrExtraTariff[0].week`}
                control={control}
                label="Week"
              />
            </Grid>
            <Grid item xs={12} sm={1} md={1}>
              <FormInputText
                name={`arrExtraTariff[0].month`}
                control={control}
                label="Month"
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Remove </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove tariff?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmitConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}