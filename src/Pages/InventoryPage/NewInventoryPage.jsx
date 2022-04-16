import React, { useState, useEffect, Fragment } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import MUIRichTextEditor from 'mui-rte';

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
    Checkbox,
    Autocomplete,
    TextField
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from '@mui/system';

import { categoryActions, tariffsActions, supportActions } from '../../_actions';

import { FormInputText } from "../../_components/FormComponents/FormInputText";
import { DialogSelectCategory } from "../../_components/FormComponents/DialogSelectCategory";
import { FormInputSelect } from "../../_components/FormComponents/FormInputSelect";
import { FormInputSelectControlValue } from "../../_components/FormComponents/FormInputSelectControlValue";

import { FormInputNumber } from "../../_components/FormComponents/FormInputNumber";
//import { Previews } from '../../_components/FormComponents/DropZone';
import { CustomLayout } from '../../_components/FormComponents/DropZoneUploader';
import { DialogEditTarif } from '../../_components/FormComponents/DialogEditTariff';
import BoxStyled from '../../_components/StyledComponent/BoxStyled';
import BoxStyledTextEditor from '../../_components/StyledComponent/BoxStyledTextEditor';

const tags = [
    { title: 'aaaaaaaa', idTag: 1994 },
    { title: 'bbbbbbbb', idTag: 1972 },
    { title: 'ccccc', idTag: 1974 },
    { title: 'xxxxxxxx', idTag: 2008 },
    { title: 'rrrrrrr', idTag: 1957 },
]


function NewInventoryPage() {

    const { handleSubmit, control, reset, setValue } = useForm({
        defaultValues: {
            name: "",
            article: "",
            identifier: "",
            sellPrice: "0",
            depositAmount: "0",
            category: "Select Category",
            countItem: "0",
            rentalTariff: "",
            options: [{ optionName: "", optionValue: "" }],
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: "options",
    })

    const [open, setOpen] = useState(false);
    const [openNewTariff, setOpenNewTariff] = useState(false);
    const [selectedTariff, setTariff] = useState("");
    const [selectedCategory, setCategory] = useState("");
    const [trackMethod, setTrackMethod] = React.useState("0");
    const user = useSelector(state => state.authentication.user);
    const category = useSelector(state => state.category);
    const tariffs = useSelector(state => state.tariffs);
    const support = useSelector(state => state.support);
    const dispatch = useDispatch();

    useEffect(() => {
        // загружаем категории
        dispatch(categoryActions.load({ companyToken: user.companyToken }));
        dispatch(tariffsActions.load({ companyToken: user.companyToken }));
    }, []);


    useEffect(() => {

        if (support.lastTariffID && support.lastTariffID !== "") {
            setValue("rentalTariff", support.lastTariffID); // меняем значение формы
            setTariff(support.lastTariffID); // устанавливаем текущий пароль
            dispatch(supportActions.lastTariff("")); // очищаем редюсер
        }

    }, [tariffs]);

    const SelectCategoryBtn = () => {
        return (
            <IconButton onClick={handleClickOpen} sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        );
    }

    const handleAddOptions = () => {
        append({
            optionName: "",
            optionValue: ""
        })
    };

    const handleDelOptions = () => {

    }

    /// ищем значение категории по id
    const findById = (array, id) => {
        var result;
        array.some(item => result = item.id === id ? item : findById(item.children || [], id));
        return result;
    };

    const handleOk = (currentCategory) => {
        // Записываем в форму
        setValue("category", findById(category, currentCategory).name);
        // сохраняем в state категоррию
        setCategory(currentCategory);
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChangeTrackMethod = (event) => {
        setTrackMethod(event.target.value)
    }

    const handleChangeCount = () => {

    }

    const handleChangeTariff = (event) => {
        //console.log("+");
        setTariff(event.target.value);
    }

    const handleOpenNewTariffDialog = () => {
        setOpenNewTariff(true);
    }

    const handleOkNewTariffDialog = (data) => {
        dispatch(tariffsActions.add({ ...data, companyToken: user.companyToken }));
        setOpenNewTariff(false);
    }


    const handleCloseNewTariffDialog = () => {
        setOpenNewTariff(false);
    }


    return (
        <Box>
            <Container maxWidth="lg">
                <Box>
                    Create a new product
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={0} variant="main">
                            <FormInputText name="name" control={control} label="Product name" />
                            <BoxStyled>
                                <Typography variant="body2">
                                    Description
                                </Typography>
                                <BoxStyledTextEditor>
                                    <MUIRichTextEditor label="Start typing..." />
                                </BoxStyledTextEditor>
                            </BoxStyled>
                            <BoxStyled>
                                <Typography variant="body2">
                                    Images
                                </Typography>
                                <CustomLayout />
                            </BoxStyled>
                        </Paper>
                        <Paper elevation={0} variant="mainMargin">
                            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 3 }}>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputNumber
                                        name="sellPrice"
                                        control={control}
                                        label="Sell Price"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            inputProps: { min: 0 },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputNumber
                                        name="depositAmount"
                                        control={control}
                                        label="Deposit Amount"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            inputProps: { min: 0 },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputSelect
                                        id="salesTax"
                                        name="salesTax"
                                        control={control}
                                        defaultValue=""
                                        variant="outlined"
                                        margin="normal"
                                        label="Sales Tax"
                                        labelId="sales-tax-label-id"

                                    >
                                        <MenuItem value="">Select Tax</MenuItem>
                                        <MenuItem value="servidor">1</MenuItem>
                                        <MenuItem value="clt">2</MenuItem>
                                        <MenuItem value="autonomo">3</MenuItem>
                                        <MenuItem value="desempregado">4</MenuItem>
                                        <MenuItem value="empresario">5</MenuItem>
                                    </FormInputSelect>
                                </Grid>
                            </Grid>
                            <BoxStyled>
                                <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 3 }}>
                                    <Grid item xs={12} sm={3} md={2}>
                                        <FormInputSelectControlValue
                                            id="rentalTariff"
                                            name="rentalTariff"
                                            control={control}
                                            defaultValue=""
                                            variant="outlined"
                                            margin="normal"
                                            label="Rental Price"
                                            labelId="rental-price-label-id"
                                            onChange={handleChangeTariff}
                                            value={selectedTariff}
                                        >
                                            <MenuItem value="">Select Tariff</MenuItem>
                                            {
                                                tariffs.map((item, index) => (
                                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                                ))
                                            }
                                        </FormInputSelectControlValue>
                                    </Grid>
                                    <Grid item xs={12} sm={3} md={1}>
                                        <Button variant="contained" themecolor="rentalTheme" size="large" onClick={handleOpenNewTariffDialog}>
                                            Add New
                                        </Button>
                                        {openNewTariff && <DialogEditTarif data="" handleOk={handleOkNewTariffDialog} handleClose={handleCloseNewTariffDialog} />}
                                    </Grid>
                                </Grid>
                            </BoxStyled>

                            {
                                !!(selectedTariff) &&
                                (
                                    <BoxStyled>
                                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 2, sm: 12, md: 12 }}>
                                            {
                                                tariffs.find(x => x.id === selectedTariff).arrTariffDetail.map((item, index) => (
                                                    <Grid item xs={12} sm={3} md={3} key={index}>
                                                        <Paper elevation={0} variant="main" contentalign="center">
                                                            <Typography variant="h3" style={{ fontSize: '2rem' }}>
                                                                ${item.price}
                                                            </Typography>
                                                            <Typography variant="subtitle1" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgb(99, 115, 129)' }}>
                                                                {item.label}
                                                            </Typography>
                                                        </Paper>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </BoxStyled>
                                )
                            }

                        </Paper>
                        <Paper elevation={0} variant="mainMargin">
                            <Typography variant="body2">
                                Options
                            </Typography>
                            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                {
                                    fields.map((item, index) => (
                                        <Fragment key={index}>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <FormInputText name={`options[${index}].optionName`} control={control} label="Option name" value={item.optionName} />
                                            </Grid>
                                            <Grid item xs={12} sm={5} md={5}>
                                                <FormInputText name={`options[${index}].optionValue`} control={control} label="Option value" value={item.optionValue} />
                                            </Grid>
                                            <Grid item xs={12} sm={1} md={1} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                {
                                                    index < fields.length - 1 ?
                                                        <IconButton aria-label="add" onClick={handleDelOptions}>
                                                            <DeleteIcon />
                                                        </IconButton> :
                                                        <IconButton aria-label="add" onClick={handleAddOptions}>
                                                            <AddIcon />
                                                        </IconButton>
                                                }
                                            </Grid>
                                        </Fragment>
                                    ))
                                }

                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={0} variant="main">
                            <Typography variant="body2">
                                Product Tracking
                            </Typography>
                            <RadioGroup
                                defaultValue="individual"
                                name="radio-buttons-group"
                                value={trackMethod}
                                onChange={handleChangeTrackMethod}
                                row
                            >
                                <FormControlLabel value="0" control={<Radio />} label="Group items" />
                                <FormControlLabel value="1" control={<Radio />} label="Individual item" />
                            </RadioGroup>
                            <BoxStyled>
                                {
                                    trackMethod === "0" ?
                                        <FormInputNumber name="countItem" control={control} label="Count item" InputProps={{ inputProps: { min: 0, max: 100 } }} onChange={handleChangeCount} /> :
                                        <FormInputText name="identifier" control={control} label="Identifier" />
                                }
                            </BoxStyled>
                            <BoxStyled>
                                <FormInputText name="category" control={control} label="Category" InputProps={{ readOnly: true, endAdornment: <SelectCategoryBtn /> }} />
                                {open && <DialogSelectCategory data={category} handleOk={handleOk} handleClose={handleClose} />}
                            </BoxStyled>
                            <BoxStyled>
                                <FormInputSelect
                                    id="profissao"
                                    name="profissao"
                                    control={control}
                                    defaultValue=""
                                    variant="outlined"
                                    margin="normal"
                                    label="Rental Location"
                                    labelId="rental-location-label-id"
                                >
                                    <MenuItem value="">Select rental location</MenuItem>
                                    <MenuItem value="servidor">1</MenuItem>
                                    <MenuItem value="clt">2</MenuItem>
                                    <MenuItem value="autonomo">3</MenuItem>
                                    <MenuItem value="desempregado">4</MenuItem>
                                    <MenuItem value="empresario">5</MenuItem>
                                </FormInputSelect>
                            </BoxStyled>
                        </Paper>
                        <Paper elevation={0} variant="mainMargin">
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={tags}
                                getOptionLabel={(option) => option.title}
                                defaultValue={[]}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Multiple values"
                                        placeholder=""
                                    />
                                )}
                            />
                            <BoxStyled>
                                <FormInputText name="yourSKU" control={control} label="Your SKU" />
                            </BoxStyled>
                            <BoxStyled>
                                <FormControlLabel control={<Checkbox />} label="Make as featured" />
                            </BoxStyled>
                        </Paper>
                        <Paper elevation={0} variant="mainMargin">
                            <Typography variant="body2">
                                Shipping Params
                            </Typography>
                            <FormInputText name="identifier" control={control} label="Weight" />
                            <BoxStyled>
                                <FormInputText name="identifier" control={control} label="Height" />
                            </BoxStyled>
                            <BoxStyled>
                                <FormInputText name="identifier" control={control} label="Width" />
                            </BoxStyled>
                            <BoxStyled>
                                <FormInputText name="identifier" control={control} label="Length" />
                            </BoxStyled>
                            <BoxStyled>
                                <FormControlLabel control={<Checkbox />} label="Free shipping" />
                            </BoxStyled>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );

    /*

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 10 }}>
                <Paper elevation={1} sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <Typography variant="h6" gutterBottom component="div">Basic details</Typography>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <Box
                                style={{
                                    display: "grid",
                                    gridRowGap: "20px",
                                }}
                            >
                                <FormInputText name="name" control={control} label="Product name" />
                                <FormInputText name="category" control={control} label="Category" InputProps={{ readOnly: true, endAdornment: <SelectCategoryBtn /> }} />
                                {open && <DialogSelectCategory data={data} handleOk={handleOk} handleClose={handleClose} />}
                                <FormInputSelect
                                    id="profissao"
                                    name="profissao"
                                    control={control}
                                    defaultValue=""
                                    variant="outlined"
                                    margin="normal"
                                    label="Rental Location"
                                    labelId="rental-location-label-id"
                                >
                                    <MenuItem value="">Select rental location</MenuItem>
                                    <MenuItem value="servidor">1</MenuItem>
                                    <MenuItem value="clt">2</MenuItem>
                                    <MenuItem value="autonomo">3</MenuItem>
                                    <MenuItem value="desempregado">4</MenuItem>
                                    <MenuItem value="empresario">5</MenuItem>
                                </FormInputSelect>
                                <FormInputText name="sku" control={control} label="SKU" />

                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    )
    */
}

export { NewInventoryPage }