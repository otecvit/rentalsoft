import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from 'mui-rte';
import {
    useParams,
} from "react-router-dom";


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



import {
    Container,
    Box,
    Paper,
    Grid,
    Typography,
    MenuItem,
    IconButton,
    RadioGroup,
    Skeleton,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Link,
    Table,
    TableBody,
    TableCell,
    TableRow,
    ButtonGroup,
    Icon,
    Stack,
    Tabs,
    Tab
} from '@mui/material';

import {
    TabContext,
    TabList,
    TabPanel
} from '@mui/lab'


import { tableCellClasses } from "@mui/material/TableCell";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { supportConstants } from '../../_constants/support.constans';
import { inventoryActions } from '../../_actions';
import { supportActions } from '../../_actions';
import BoxStyled from '../../_components/StyledComponent/BoxStyled';
import BoxStyledTextEditor from '../../_components/StyledComponent/BoxStyledTextEditor';
import BoxStyledTitle from '../../_components/StyledComponent/BoxStyledTitle';
import HeaderComponent from '../../_components/InterfaceComponent/HeaderComponent';

import BoxChipVariants from '../../_components/StyledComponent/BoxChipVariants';

function ViewCustomerPage() {
    let { chTokenInventory } = useParams();
    const [currentTab, setTab] = useState('1');
    const [expanded, setExpanded] = useState('panel1');
    const [onSkeleton, setSceleton] = useState(false);
    const support = useSelector(state => state.support);
    const user = useSelector(state => state.authentication.user);
    const inventory = useSelector(state => state.inventory);
    const dispatch = useDispatch();

    useEffect(() => {
        // загружаем продукт для просмотра
        dispatch(inventoryActions.loadDataInventory({ chTokenCompany: user.chTokenCompany, chTokenInventory: chTokenInventory }));
    }, []);

    useEffect(() => {
        // статус загрузки
        if (inventory !== undefined && inventory.length != 0)
            setSceleton(true);
        else
            setSceleton(false);
    }, [support.isLoading]);


    // if (inventory !== undefined && inventory.length != 0 && !support.isLoading) {
    //     console.log(inventory[0].chName);
    // }
    //console.log(inventory[0].chName);


    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.body}`]: {
            padding: '2px 16px',
        },
    }));

    const DescriptionParam = styled('div')({
        margin: '0px',
        fontSize: '0.75rem',
        color: 'rgb(158, 158, 158)',
        lineHeight: '1.43',
        margin: '0px 0px 6px',
        fontWeight: '500',

    });

    const DescriptionValue = styled('div')({
        lineHeight: '1.43',
        letterSpacing: '0.01071em',
        margin: '0px 0px 6px',
        fontWeight: '500',
        fontSize: '0.875rem',
        color: 'rgb(99, 115, 129)',
    });


    const viewThemeEditor = createTheme({});

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

    function handleClickBreadcrumbs(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }



    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    }

    const handleEditInventory = () => {

    }

    return (
        <Box>
            <Container maxWidth="xl">
                <BoxStyledTitle>
                    <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 12 }} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={2} md={8} >
                            <HeaderComponent title={onSkeleton && inventory[0].chName} breadcrumbs={breadcrumbs} loading={support.isLoading} />
                        </Grid>
                        <Grid item xs={12} sm={1} md={4} style={{ textAlign: 'right' }}>
                            <Button variant="contained" themecolor="rentalBtnSmall" startIcon={<AddIcon />} onClick={handleEditInventory}>
                                Edit Product
                            </Button>
                        </Grid>
                    </Grid>
                </BoxStyledTitle>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={0} variant="main" style={{ paddingBottom: 3 }}>
                            {onSkeleton ?
                                <Carousel
                                    showArrows
                                    infiniteLoop
                                    showStatus={false}
                                    showIndicators={false}
                                    thumbWidth={60}
                                >
                                    {
                                        inventory[0].arrFilePath.map((item, index) => (
                                            <div key={index}>
                                                <img src={item.file} />
                                            </div>
                                        ))
                                    }
                                </Carousel>
                                :
                                <Carousel
                                    showArrows
                                    infiniteLoop
                                    showStatus={false}
                                    showIndicators={false}
                                    showThumbs={false}
                                >
                                    <div>
                                        <Skeleton height={200} />
                                    </div>
                                </Carousel>
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={0} variant="main">
                            <Table
                                sx={{
                                    maxWidth: '380px',
                                    [`& .${tableCellClasses.root}`]: {
                                        borderBottom: "none"
                                    }
                                }}
                            >
                                <TableBody>
                                    <TableRow>
                                        <StyledTableCell component="th" scope="row">
                                            <DescriptionParam>Inventory #</DescriptionParam>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {onSkeleton ? <DescriptionValue>#5</DescriptionValue> : <Skeleton />}
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableCell component="th" scope="row">
                                            <DescriptionParam>Identifier</DescriptionParam>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {onSkeleton ? <DescriptionValue></DescriptionValue> : <Skeleton />}
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableCell component="th" scope="row">
                                            <DescriptionParam>Location</DescriptionParam>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {onSkeleton ? <DescriptionValue>vtb</DescriptionValue> : <Skeleton />}
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableCell component="th" scope="row">
                                            <DescriptionParam>Created On</DescriptionParam>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {onSkeleton ? <DescriptionValue>05/05/2022 01:29</DescriptionValue> : <Skeleton />}
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableCell component="th" scope="row">
                                            <DescriptionParam>Cost Price</DescriptionParam>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {onSkeleton ? <DescriptionValue>$1,200.00</DescriptionValue> : <Skeleton />}
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableCell component="th" scope="row">
                                            <DescriptionParam>Rent Collected</DescriptionParam>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {onSkeleton ? <DescriptionValue>$0.00</DescriptionValue> : <Skeleton />}
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableCell component="th" scope="row">
                                            <DescriptionParam>Rent count</DescriptionParam>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {onSkeleton ? <DescriptionValue>0</DescriptionValue> : <Skeleton />}
                                        </StyledTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <StyledTableCell component="th" scope="row">
                                            <DescriptionParam>Rental Pricing</DescriptionParam>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {onSkeleton ?
                                                <>
                                                    <DescriptionValue>$12 - 1 неделя</DescriptionValue>
                                                    <DescriptionValue>$19 - 2 недели</DescriptionValue>
                                                    <DescriptionValue>$25 - 1 месяц</DescriptionValue>
                                                    <DescriptionValue>$45 - 2 месяца</DescriptionValue>
                                                </>
                                                : <Skeleton />}
                                        </StyledTableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={0} variant="main" style={{ minHeight: 410 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={6} md={6}>
                                    <Typography variant="body2">Comments</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Paper elevation={0} variant="mainMarginNoPadding">
                    <TabContext value={currentTab}>
                        <Paper variant="titleTabDatagrid">
                            <div style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '0px 20px',
                            }}>
                                <TabList onChange={handleChangeTab}>
                                    <Tab disableTouchRipple value="1" label={`Details`} />
                                    <Tab disableTouchRipple value="2" label={`Calendar`} />
                                    <Tab disableTouchRipple value="3" label={`Orders`} />
                                    <Tab disableTouchRipple value="4" label={`Services`} />
                                    <Tab disableTouchRipple value="5" label={`Variants`} />
                                </TabList>
                            </div>
                        </Paper>
                        <TabPanel value="1">
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        General
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid spacing={2} container columns={{ xs: 1, sm: 12, md: 12 }}>
                                        <Grid item xs={12} sm={12} md={4} style={{ paddingLeft: '0px' }}>
                                            <Table
                                                sx={{
                                                    maxWidth: '380px',
                                                    [`& .${tableCellClasses.root}`]: {
                                                        borderBottom: "none"
                                                    }
                                                }}
                                            >
                                                <TableBody>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Product name</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].chName}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Sell Price</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].chSellPrice}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Deposit Amount</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].chDepositAmount}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Sales Tax</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].chSalesTax}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Rental Price</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue></DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4} style={{ paddingLeft: '0px' }}>
                                            <Table
                                                sx={{
                                                    maxWidth: '380px',
                                                    [`& .${tableCellClasses.root}`]: {
                                                        borderBottom: "none"
                                                    }
                                                }}
                                            >
                                                <TableBody>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Product Tracking</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].chProductTracking === "0" ? `Group items` : `Individual item`}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Identifier</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].chIdentifier}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Count item</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].chCountItem}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Category</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue></DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Location</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].chRentalLocation}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Tags</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue></DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>SKU</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].chYourSKU}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Featured</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].blMakeFeatured === "0" ? `No` : `Yes`}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4} style={{ paddingLeft: '0px' }}>
                                            <Table
                                                sx={{
                                                    maxWidth: '380px',
                                                    [`& .${tableCellClasses.root}`]: {
                                                        borderBottom: "none"
                                                    }
                                                }}
                                            >
                                                <TableBody>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Shipping Params</DescriptionParam>
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Weight</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].chWeight}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Height</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].chHeight}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Width</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].chWidth}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Length</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].chLength}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <StyledTableCell component="th" scope="row">
                                                            <DescriptionParam>Free Shipping</DescriptionParam>
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {onSkeleton ? <DescriptionValue>{inventory[0].blFreeShipping === "0" ? `No` : `Yes`}</DescriptionValue> : <Skeleton />}
                                                        </StyledTableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Description</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {onSkeleton ?
                                        <ThemeProvider theme={viewThemeEditor}>
                                            <MUIRichTextEditor
                                                value={inventory[0].txtDescription}
                                                toolbar={false}
                                                readOnly
                                            />
                                        </ThemeProvider>
                                        : <Skeleton />}
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChangeAccordion('panel3')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3bh-content"
                                    id="panel3bh-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Options
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid spacing={2} container columns={{ xs: 1, sm: 12, md: 12 }}>
                                        <Grid item xs={12} sm={12} md={6} style={{ paddingLeft: '0px' }}>
                                            <Table
                                                sx={{
                                                    maxWidth: '450px',
                                                    [`& .${tableCellClasses.root}`]: {
                                                        borderBottom: "none"
                                                    }
                                                }}
                                            >

                                                {onSkeleton ?
                                                    <TableBody>
                                                        {inventory[0].arrOptions.map((item, index) => (
                                                            <TableRow key={index}>
                                                                <StyledTableCell component="th" scope="row">
                                                                    <DescriptionParam>{item.optionName}</DescriptionParam>
                                                                </StyledTableCell>
                                                                <StyledTableCell>
                                                                    <DescriptionValue>{item.optionValue}</DescriptionValue>
                                                                </StyledTableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                    :
                                                    <TableBody>
                                                        <TableRow>
                                                            <StyledTableCell component="th" scope="row">
                                                                <Skeleton />
                                                            </StyledTableCell>
                                                            <StyledTableCell>
                                                                <Skeleton />
                                                            </StyledTableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <StyledTableCell component="th" scope="row">
                                                                <Skeleton />
                                                            </StyledTableCell>
                                                            <StyledTableCell>
                                                                <Skeleton />
                                                            </StyledTableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <StyledTableCell component="th" scope="row">
                                                                <Skeleton />
                                                            </StyledTableCell>
                                                            <StyledTableCell>
                                                                <Skeleton />
                                                            </StyledTableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                }


                                            </Table>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </TabPanel>
                        <TabPanel value="2">
                            Item Two
                        </TabPanel>
                        <TabPanel value="3">
                            Item Three
                        </TabPanel>
                        <TabPanel value="4">
                            Item Four
                        </TabPanel>
                        <TabPanel value="5">
                            Item Five
                        </TabPanel>
                    </TabContext>
                </Paper>
            </Container>
        </Box>
    );
}


export { ViewCustomerPage };