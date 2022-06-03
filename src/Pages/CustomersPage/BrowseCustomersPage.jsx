import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from "react-hook-form";

import { loadCSS } from 'fg-loadcss';

import { customerActions } from '../../_actions';

import {
  Container,
  Box,
  Paper,
  Grid,
  IconButton,
  Button,
  Link,
  Icon,
  Stack,
  Tabs,
  Tab
} from '@mui/material';


import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import BoxStyled from '../../_components/StyledComponent/BoxStyled';
import BoxStyledTextEditor from '../../_components/StyledComponent/BoxStyledTextEditor';
import BoxStyledTitle from '../../_components/StyledComponent/BoxStyledTitle';
import HeaderComponent from '../../_components/InterfaceComponent/HeaderComponent';

import BoxChipVariants from '../../_components/StyledComponent/BoxChipVariants';

import { FormInputText } from "../../_components/FormComponents/FormInputText";
import { DataGridComponent } from "../../_components/FormComponents/DataGridComponent";


function handleClickBreadcrumbs(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

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
    id: 'chFirstName',
    numeric: false,
    label: 'Name',
    align: 'left',
  },
  {
    id: 'chLastName',
    numeric: true,
    label: 'Quantity',
    align: 'left',
  },
  {
    id: 'iStatus',
    numeric: true,
    label: 'Rent Price',
    align: 'left',
  },
  {
    id: 'iCategory',
    numeric: true,
    label: 'Status',
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

function BrowseCustomersPage() {
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

  const TitleDataGrid = styled('div')({
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 20px',

  });

  const [currentTab, setTab] = useState(0);



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
    <span key="4">
      Breadcrumb
    </span>
    ,
  ];

  const dispatch = useDispatch();

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  }


  const handleAddCustomer = () => {
    let path = `/customers/new`;
    history.push(path);
  }

  useEffect(() => {
    // загружаем иконки fontawesome
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v6.1.1/css/all.css',
      // Inject before JSS
      document.querySelector('#font-awesome-css') || document.head.firstChild,
    );


    dispatch(customerActions.load({ chTokenCompany: user.chTokenCompany }));

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);


  const handleClearCustomer = () => {
    dispatch(customerActions.clearCustomerState());
  }


  return (
    <Box>
      <Container maxWidth="xl">
        <BoxStyledTitle>
          <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 12 }} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={2} md={8} >
              <HeaderComponent title="Customers" breadcrumbs={breadcrumbs} />
            </Grid>
            <Grid item xs={12} sm={1} md={4} style={{ textAlign: 'right' }}>
              <Button variant="contained" themecolor="rentalBtnSmall" startIcon={<AddIcon />} onClick={handleAddCustomer}>
                Add Customer
              </Button>
            </Grid>
          </Grid>
        </BoxStyledTitle>

        <Paper elevation={0} variant="mainMarginNoPadding">
          <Paper variant="titleTabDatagrid">
            <div style={{
              alignItems: 'center',
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0px 20px',
            }}>
              <Tabs value={currentTab} onChange={handleChangeTab}>
                <Tab disableTouchRipple icon={<BoxChipVariants text="3" type="success" style={{ marginRight: '8px' }} />} iconPosition="start" label={`Current`} />
                <Tab disableTouchRipple icon={<BoxChipVariants text="12" type="quantity" style={{ marginRight: '8px' }} />} iconPosition="start" label="Archived" />
                <Tab disableTouchRipple icon={<BoxChipVariants text="3" type="redcolor" style={{ marginRight: '8px' }} />} iconPosition="start" label="Deleted" />
              </Tabs>
              <Stack direction="row" justifyContent="end">
                <IconButton aria-label="delete">
                  <Icon baseClassName="fas" className="fa-file-excel" fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete">
                  <Icon baseClassName="fas" className="fa-file-pdf" fontSize="small" />
                </IconButton>
                <IconButton aria-label="add an alarm">
                  <Icon baseClassName="fas" className="fa-file-csv" fontSize="small" />
                </IconButton>
                <IconButton aria-label="add an alarm">
                  <Icon baseClassName="fas" className="fa-file-import" fontSize="small" />
                </IconButton>
              </Stack>
            </div>
          </Paper>
          <Paper elevation={0} variant="mainNoneBorder">
            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 24 }}>
              <Grid item xs={12} sm={6} md={5}>
                <FormInputText name="" control={control} label="Option name" defaultValue="" />
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <FormInputText name="" control={control} label="Option name" defaultValue="" />
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <FormInputText name="" control={control} label="Option name" defaultValue="" />
              </Grid>
              <Grid item xs={12} sm={5} md={5}>
                <FormInputText name="" control={control} label="Option name" defaultValue="" />
              </Grid>
              <Grid item xs={12} sm={1} md={4} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                <Button variant="contained" themecolor="rentalThemeSubmit" startIcon={<SearchIcon />} size="large">
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <DataGridComponent
            data={customers}
            handleClear={handleClearCustomer}
            type="customers"
            headCells={headCells}
            chTokenCompany={user.chTokenCompany}
          />
        </Paper>
      </Container>
    </Box>

  );

}

export { BrowseCustomersPage };