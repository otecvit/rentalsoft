import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from "react-hook-form";

import { customerActions } from '../../_actions';


import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


import { FormInputText } from "../../_components/FormComponents/FormInputText";

function handleClickBreadcrumbs(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

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

  const rows = [];

function BrowseInventoryPage() {
    const history = useHistory();

    const { handleSubmit, control, reset, setValue } = useForm({
        defaultValues: { 
            search: "",
            article: "",
            identifier: "",
            category: "Uncategorized",
        }
      });

    const customers = useSelector(state => state.customers);
    const user = useSelector(state => state.authentication.user);

    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);


    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClickBreadcrumbs}>
          MUI
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="inherit"
          href="/getting-started/installation/"
          onClick={handleClickBreadcrumbs}
        >
          Core
        </Link>,
        <Typography key="3" color="text.primary">
          Breadcrumb
        </Typography>,
      ];

    const dispatch = useDispatch();

    const handleAddCustomer = () => { 
        let path = `/inventory/new`; 
        history.push(path);
    }

    const handleMenuItemClick = (event,) => {
        let path = `/inventory/new_group`; 
        history.push(path);
        setOpen(false);
    };

    
    useEffect(() => {
      // загружаем данные клиентов
      
      //dispatch(customerActions.load({ token: user.token }));  
    }, []);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }
        setOpen(false);
    };

    
    const handleClickSearch = data => console.log(data);
    

    return (
        <div>
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f9f9f9', width: 'auto' }}>
            <Grid container spacing={2}>
                
                <Grid item xs={6}>
                    <Stack direction="row" alignItems="center" gap={2}>
                        <Typography variant="h5">INVENTORY</Typography>
                        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                            <Button variant="contained" startIcon={<AddIcon />} sx={{textTransform: 'none'}}  size="small" onClick={handleAddCustomer}>
                                New
                            </Button>
                            <Button
                                size="small"
                                aria-controls={open ? 'split-button-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-label="select merge strategy"
                                aria-haspopup="menu"
                                onClick={handleToggle}
                            >
                                <ArrowDropDownIcon />
                            </Button>
                        </ButtonGroup>
                    </Stack>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    <MenuItem
                                        onClick={(event) => handleMenuItemClick(event)}
                                    >
                                        New group inventory
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                            </Paper>
                        </Grow>
                        )}
                    </Popper>
                </Grid>
                <Grid item xs={6}>
                    <Stack direction="row" justifyContent="end">
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>
                </Grid>
            </Grid> 
        </Box>
            <Paper
                elevation={0}
                sx={{
                display: "grid",
                gridRowGap: "20px",
                padding: "20px",
                margin: "20px 40px",         
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <FormInputText name="search" control={control} label="Text search..." />
                    </Grid>
                    <Grid item xs={3}>
                        <FormInputText name="search" control={control} label="Text search..." />
                    </Grid>
                    <Grid item xs={3}>
                        <FormInputText name="search" control={control} label="Text search..." />
                    </Grid>
                    <Grid item xs={3} >
                        <Button variant="contained" startIcon={<SearchIcon />} sx={{textTransform: 'none'}}  onClick={handleSubmit(handleClickSearch)}>
                                Search
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper
                elevation={0}
                sx={{
                display: "grid",
                gridRowGap: "20px",
                padding: "20px",
                margin: "20px 40px",         
                }}
            >
                <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f9f9f9', width: 'auto' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Stack direction="row" spacing={2}>
                                <Button>Current</Button>
                                <Button>Archived</Button>
                                <Button>Deleted</Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack direction="row" justifyContent="end">
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="delete" disabled color="primary">
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton color="secondary" aria-label="add an alarm">
                                    <AlarmIcon />
                                </IconButton>
                                <IconButton color="primary" aria-label="add to shopping cart">
                                    <AddShoppingCartIcon />
                                </IconButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" size="small">All</Button>
                    <Button variant="outlined" size="small">A</Button>
                    <Button variant="outlined" size="small">B</Button>
                    <Button variant="outlined" size="small">C</Button>
                    <Button variant="outlined" size="small">D</Button>
                    <Button variant="outlined" size="small">E</Button>
                    <Button variant="outlined" size="small">F</Button>
                </Stack>
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
            </Paper>
        </div>
    );

}

export { BrowseInventoryPage };