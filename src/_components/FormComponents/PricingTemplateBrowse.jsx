import React,  { useState, useEffect } from 'react'
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

import { tariffsActions } from '../../_actions';

import { FormInputText } from '../FormComponents/FormInputText';
import { FormInputSelect } from '../FormComponents/FormInputSelect';

const DataGrid = styled(MuiDataGrid)(({ theme }) => ({
    "& .MuiDataGrid-columnHeaders": { display: "none" },
    "& .MuiDataGrid-virtualScroller": { marginTop: "0!important" },
    
  }));

const rows = [
    {
      id: "1111",
      name: 'Костыли',
      stars: 'От 8 BYN за 2 недели',
    },
    {
      id: "222",
      name: 'DataGrid',
      stars: 15000,
    },
  ];
  
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

    const [selectedTariff, setSelectedTariff] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const { handleSubmit, control, reset, setValue } = useForm(
      {
        defaultValues: { 
            name: "",
            tariffDetail: [{label: "", duration: "", period: "1", price: ""}]
        }
      }
    );
    const { fields, prepend, remove } = useFieldArray({
      control, 
      name: "tariffDetail", 
    });

    useEffect(() => {
      // загружаем тарифы
      dispatch(tariffsActions.load({ token: user.token }));  
    }, []);

    const onSubmit = data => console.log(data);

    const  currentlySelected = (params) => {
        const value = params.colDef.field;

        if (!(value === "edit" || value === "delete")) {
        return;
        }

        const fields = rows.find( (item) => params.id === item.id );

        setSelectedTariff(fields);
        
        setOpenDialog(true);
    }

    const handleAddTariff = () => {
      setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
      };

    const handleAddTariffDetail = () => {
      prepend({
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
                rows={rows}
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
                      <Stack direction="row" spacing={2} sx={{ paddingTop: "10px"}}>
                        <FormInputText label="Template name" name="name" control={control} variant="outlined"/>    
                      </Stack>
                      {
                      fields.map((item, index) => {
                        return (
                            <Stack direction="row" spacing={2} key={index} sx={{ paddingTop: "20px"}}>
                              <FormInputText name={`tariffDetail[${index}].label`} control={control} label="Label" value={item.label}/>
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
                              <FormInputText name={`tariffDetail[${index}].price`} control={control} label="Price" value={item.price}/>
                              <IconButton aria-label="delete" onClick={() => handleDelTariffDetail(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </Stack>)
                          })
                      }
                      <Button onClick={handleAddTariffDetail}>Add row</Button>
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
        </div>
    );
}