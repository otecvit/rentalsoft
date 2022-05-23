import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from "react-hook-form";

import { loadCSS } from 'fg-loadcss';

import { inventoryActions } from '../../_actions';

import {
    Container,
    Box,
    Paper,
    Grid,
    Typography,
    MenuItem,
    IconButton,
    RadioGroup,
    Radio,
    FormControlLabel,
    InputAdornment,
    Button,
    Link,
    Autocomplete,
    TextField,
    Switch,
    Breadcrumbs,
    ButtonGroup,
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

// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import AddIcon from '@mui/icons-material/Add';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import SearchIcon from '@mui/icons-material/Search';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import MenuItem from '@mui/material/MenuItem';
// import MenuList from '@mui/material/MenuList';
// import Popper from '@mui/material/Popper';
// import Grow from '@mui/material/Grow';
// import Paper from '@mui/material/Paper';
// import Chip from '@mui/material/Chip';
// import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// import { DataGrid } from '@mui/x-data-grid';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import Link from '@mui/material/Link';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AlarmIcon from '@mui/icons-material/Alarm';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


import { FormInputText } from "../../_components/FormComponents/FormInputText";
import { DataGridComponent } from "../../_components/FormComponents/DataGridComponent";


function handleClickBreadcrumbs(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

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

    const inventory = useSelector(state => state.inventory);
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
        let path = `/inventory/new`;
        history.push(path);
    }

    useEffect(() => {
        // загружаем иконки fontawesome
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v6.1.1/css/all.css',
            // Inject before JSS
            document.querySelector('#font-awesome-css') || document.head.firstChild,
        );


        dispatch(inventoryActions.load({ token: user.companyToken }));

        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const handleClearInventory = () => {
        dispatch(inventoryActions.clearInventoryState());
    }


    return (
        <Box>
            <Container maxWidth="xl">
                <BoxStyledTitle>
                    <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 12 }} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={2} md={8} >
                            <HeaderComponent title="Innventory" breadcrumbs={breadcrumbs} />
                        </Grid>
                        <Grid item xs={12} sm={1} md={4} style={{ textAlign: 'right' }}>
                            <Button variant="contained" themecolor="rentalBtnSmall" startIcon={<AddIcon />} onClick={handleAddCustomer}>
                                Add Product
                            </Button>
                        </Grid>
                    </Grid>
                </BoxStyledTitle>
                {/* <Paper elevation={0} variant="mainMargin">
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
                </Paper> */}

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
                    <DataGridComponent data={inventory} handleClear={handleClearInventory} />
                </Paper>
            </Container>
        </Box>

    );

}

export { BrowseInventoryPage };