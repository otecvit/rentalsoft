import React, { useState, useEffect } from 'react'
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
        tariffDetail: [{ label: "", duration: "", period: "1", price: "" }],
        periodExtra: "1",
        priceExtra: "",
      }
    }
  );

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "tariffDetail",
  });

  useEffect(() => {
    // загружаем тарифы
    dispatch(tariffsActions.load({ companyToken: user.companyToken }));
  }, []);


  const onSubmit = data => {
    // закрываем диалог
    setOpenDialog(false);

    if (!!data.id)
      dispatch(tariffsActions.edit({ ...data, companyToken: user.companyToken })); // редактируем наш тариф
    else
      dispatch(tariffsActions.add({ ...data, companyToken: user.companyToken })); // добавляем наш тариф
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
      tariffDetail: [{ label: "", duration: "", period: "1", price: "" }],
      periodExtra: "1",
      priceExtra: "",
    });

    // определяем текущий тариф
    const currentTariff = tariffs.find((item) => params.id === item.id);

    if (value === "edit") {
      // заменяем значение в react-hook-form
      setValue("name", currentTariff.name);
      setValue("id", currentTariff.id);
      replace(currentTariff.arrTariffDetail);
      setValue("periodExtra", currentTariff.periodExtra);
      setValue("priceExtra", currentTariff.priceExtra);
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
      tariffDetail: [{ label: "", duration: "", period: "1", price: "" }],
      periodExtra: "1",
      priceExtra: "",
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
    append({
      label: "",
      duration: "",
      period: "1",
      price: ""
    })
  }

  const handleDelTariffDetail = (index) => {
    remove(index);
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
          <Stack direction="row" spacing={2} sx={{ paddingTop: "10px" }}>
            <FormInputText label="Template name" name="name" control={control} variant="outlined" />
          </Stack>
          {
            fields.map((item, index) => {
              return (
                <Stack direction="row" spacing={2} key={index} sx={{ paddingTop: "20px" }}>
                  <FormInputText name={`tariffDetail[${index}].label`} control={control} label="Label" value={item.label} />
                  <FormInputText name={`tariffDetail[${index}].duration`} control={control} label="Duration" value={item.duration} />
                  <Box>
                    <FormInputSelect
                      id={`period${index}`}
                      name={`tariffDetail[${index}].period`}
                      control={control}
                      defaultValue={item.period}
                      variant="outlined"
                      margin="normal"
                      label="Period"
                      labelId="rental-period-id"
                      size="small"
                    >
                      <MenuItem value="1">Hours</MenuItem>
                      <MenuItem value="2">Days</MenuItem>
                      <MenuItem value="3">Weeks</MenuItem>
                      <MenuItem value="4">Months</MenuItem>
                    </FormInputSelect>
                  </Box>
                  <FormInputText name={`tariffDetail[${index}].price`} control={control} label="Price" value={item.price} />
                  <IconButton aria-label="delete" onClick={() => handleDelTariffDetail(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>)
            })
          }
          <Button onClick={handleAddTariffDetail}>Add row</Button>
          <Box sx={{ minWidth: '90px' }}>
            <Typography variant="p" component="div">Each extra</Typography>
          </Box>
          <Stack direction="row" spacing={2} sx={{ paddingTop: "20px" }}>
            <Box>
              <FormInputSelect
                id={`periodEachExtra`}
                name={`periodExtra`}
                control={control}
                variant="outlined"
                margin="normal"
                label="Period"
                labelId="rental-each-extra"
                size="small"
              >
                <MenuItem value="1">Hours</MenuItem>
                <MenuItem value="2">Days</MenuItem>
                <MenuItem value="3">Weeks</MenuItem>
                <MenuItem value="4">Months</MenuItem>
              </FormInputSelect>
            </Box>
            <FormInputText name="priceExtra" control={control} label="Price" />
          </Stack>
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
    </div>
  );
}