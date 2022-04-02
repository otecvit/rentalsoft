import React,  { useState } from 'react'
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

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DataGrid = styled(MuiDataGrid)(({ theme }) => ({
    "& .MuiDataGrid-columnHeaders": { display: "none" },
    "& .MuiDataGrid-virtualScroller": { marginTop: "0!important" },
    
  }));

const rows = [
    {
      id: "1111",
      name: 'MUI',
      stars: 28000,
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

    const  currentlySelected = (params) => {
        const value = params.colDef.field;
        //const api: GridApi = params.api;

        if (!(value === "edit" || value === "delete")) {
        return;
        }

        const fields = rows.find( (item) => params.id === item.id );

        setSelectedTariff(fields);
        
        setOpenDialog(true);
    }

    const handleClose = () => {
        setOpenDialog(false);
      };


    return (
        <div style={{ height: 250, width: '100%' }}>
            Template pricing structures
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
                    <DialogContentText id="alert-dialog-description">
                        {JSON.stringify(selectedTariff)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}