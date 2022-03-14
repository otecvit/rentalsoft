import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { customerActions } from '../../_actions';


import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';


const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

const columns = [
    { 
      field: 'iNom', 
      headerName: '#', 
      width: 90,
      renderCell: (params) => {
        return `#${params.value}`;
      }
    },
    {
      field: 'chName',
      headerName: 'chName',
      width: 150,
      editable: true,
      renderCell: (params) => {
          return (
        <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">Tooltip with HTML</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        }
      >
        <Button>{params.value}</Button>
      </HtmlTooltip>)
        }
    },
    {
      field: 'chEmail',
      headerName: 'Email',
      width: 150,
      editable: true,
    },
    {
        field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (params) => {

            return <Chip variant="outlined" label="primary" color="info" />
          
        }
      },
  ];

function BrowseCustomersPage() {
    const history = useHistory();

    const customers = useSelector(state => state.customers);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const handleAddCustomer = () =>{ 
        let path = `/customers/new`; 
        history.push(path);
    }

    
    useEffect(() => {
      // загружаем данные клиентов
      
      dispatch(customerActions.load({ token: user.token }));  
    }, []);

    const rows = Object.entries(customers).map((e) => e[1]); // преобразуем в массив для DataGrid
    rows.forEach((n, i) => n.id = i + 1); // добавляем поле для DataGrid
    //console.log(rows1);

    return (
        <Grid container spacing={2}>
             <Grid item xs={12}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddCustomer}>
                    ADD CUSTOMER
                </Button>
            </Grid>
            <Grid item xs={12}>
            <div style={{ display: 'flex', height: '500px' }}>
                <div style={{ flexGrow: 1 }}>
                <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={50}
                        rowsPerPageOptions={[50]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>
            </Grid>
        </Grid> 
    );

}

export { BrowseCustomersPage }