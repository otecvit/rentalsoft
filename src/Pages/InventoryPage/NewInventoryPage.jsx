import React, { useState, useEffect, Fragment } from "react";
import { FormProvider, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import MUIRichTextEditor from 'mui-rte';
import { convertToRaw } from 'draft-js'

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
    Breadcrumbs
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from '@mui/system';

import { categoryActions, tariffsActions, supportActions, inventoryActions } from '../../_actions';

import { FormInputText } from "../../_components/FormComponents/FormInputText";
import { DialogSelectCategory } from "../../_components/FormComponents/DialogSelectCategory";
import { FormInputSelect } from "../../_components/FormComponents/FormInputSelect";
import { FormInputSelectControlValue } from "../../_components/FormComponents/FormInputSelectControlValue";

import { FormInputNumber } from "../../_components/FormComponents/FormInputNumber";
//import { Previews } from '../../_components/FormComponents/DropZone';
import { CustomLayout } from '../../_components/FormComponents/DropZoneUploader';
import { DropZoneController } from '../../_components/FormComponents/DropZoneController';
import { DialogEditTarif } from '../../_components/FormComponents/DialogEditTariff';
import BoxStyled from '../../_components/StyledComponent/BoxStyled';
import BoxStyledTextEditor from '../../_components/StyledComponent/BoxStyledTextEditor';
import BoxStyledTitle from '../../_components/StyledComponent/BoxStyledTitle';
import { update } from "react-spring";

const tags = [
    { title: 'aaaaaaaa', idTag: 1994 },
    { title: 'bbbbbbbb', idTag: 1972 },
    { title: 'ccccc', idTag: 1974 },
    { title: 'xxxxxxxx', idTag: 2008 },
    { title: 'rrrrrrr', idTag: 1957 },
]




function NewInventoryPage() {

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues,
        register,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: {
            productName: "",
            description: "",
            sellPrice: "0",
            depositAmount: "0",
            salesTax: "",
            options: [{ optionName: "", optionValue: "" }],
            productTracking: [],
            countItem: "0",
            identifier: "",
            category: "Select Category",
            rentalLocation: "",
            rentalTariff: "",
            yourSKU: "",
            makeFeatured: false,
            weight: "",
            height: "",
            width: "",
            length: "",
            freeShipping: false,
        }
    });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "options",
    })

    // const files = watch('files');

    const [open, setOpen] = useState(false);
    const [openNewTariff, setOpenNewTariff] = useState(false);
    const [selectedTariff, setTariff] = useState("");
    const [selectedCategory, setCategory] = useState("");
    const [tagsInventory, setTag] = useState([]);
    const [files, setFiles] = useState(null)

    const [trackMethod, setTrackMethod] = useState("0");
    const user = useSelector(state => state.authentication.user);
    const category = useSelector(state => state.category);
    const tariffs = useSelector(state => state.tariffs);
    const support = useSelector(state => state.support);
    const dispatch = useDispatch();

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            <Typography>
                Dashboard
            </Typography>
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/material-ui/getting-started/installation/"
        >
            Core
        </Link>,
        <Typography variant="body3" key="3">
            Breadcrumb
        </Typography>,
    ];

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


    /// ищем значение категории по id
    const findById = (array, id) => {
        var result;
        array.some(item => result = item.id === id ? item : findById(item.children || [], id));
        return result;
    };

    // обратная функция выбора категории в диалоговом окне
    const handleOk = (currentCategory) => {

        if (!!currentCategory) {
            // Записываем в форму
            setValue("category", findById(category, currentCategory).name);
            // сохраняем в state категоррию
            setCategory(currentCategory);
        }
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

    const handleControlledDropzonChangeStatus = (status, allFiles) => {
        setTimeout(() => {
            if (['done', 'removed'].includes(status)) {
                //console.log([...allFiles]);
                setFiles([...allFiles]);
            }
        }, 0);
    };


    const handleSubmitInventory = (data) => {

        //console.log(files[0].file);
        //console.log('---++', data.fileUpload)

        // console.log({
        //     ...data,
        //     tariff: selectedTariff,
        //     categoryID: selectedCategory,
        //     tags: tagsInventory,
        //     fileToUpload: files[0].file,
        //     companyToken: user.companyToken
        // })

        //fileToUpload: files[0].file,


        // dispatch(inventoryActions.add({
        //     ...data,
        //     tariff: selectedTariff,
        //     categoryID: selectedCategory,
        //     tags: tagsInventory,
        //     fileToUpload: files ? files[0].file : null,
        //     companyToken: user.companyToken,
        // }));

        console.log(files);

        dispatch(inventoryActions.addFiles({
            ...data,
            tariff: selectedTariff,
            categoryID: selectedCategory,
            tags: tagsInventory,
            filesToUpload: files ? files : null,
            companyToken: user.companyToken,
        }));

    }



    return (
        <Box>
            <Container maxWidth="lg">
                <BoxStyledTitle>

                    <Typography variant="h4">
                        Create a new product
                    </Typography>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>

                </BoxStyledTitle>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={0} variant="main">
                            <FormInputText
                                name="productName"
                                control={control}
                                label="Product name"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Product name is required."
                                    }
                                }} />
                            <BoxStyled>
                                <Typography variant="body2">
                                    Description
                                </Typography>
                                <BoxStyledTextEditor>
                                    <MUIRichTextEditor
                                        label="Start typing..."
                                        controls={["title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "numberList", "bulletList", "quote", "code", "clear"]}
                                        onChange={value => {
                                            const content = JSON.stringify(
                                                convertToRaw(value.getCurrentContent())
                                            );
                                            setValue("description", content);
                                        }}
                                    />
                                </BoxStyledTextEditor>
                            </BoxStyled>
                            <BoxStyled>
                                <Typography variant="body2">
                                    Images
                                </Typography>
                                <DropZoneController name="files" control={control} handleControlledDropzonChangeStatus={handleControlledDropzonChangeStatus} />
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
                                        <Fragment key={item.id}>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <FormInputText name={`options[${index}].optionName`} control={control} label="Option name" defaultValue={item.optionName} />
                                            </Grid>
                                            <Grid item xs={12} sm={5} md={5}>
                                                <FormInputText name={`options[${index}].optionValue`} control={control} label="Option value" value={item.optionValue} />
                                            </Grid>
                                            <Grid item xs={12} sm={1} md={1} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                {
                                                    index < fields.length - 1 ?
                                                        <IconButton aria-label="del" onClick={() => remove(index)}>
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
                                <FormControlLabel value="0" control={<Radio />} {...register("productTracking")} label="Group items" />
                                <FormControlLabel value="1" control={<Radio />} {...register("productTracking")} label="Individual item" />
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
                                    id="rentalLocation"
                                    name="rentalLocation"
                                    control={control}
                                    defaultValue=""
                                    variant="outlined"
                                    margin="normal"
                                    label="Rental Location"
                                    labelId="rental-location-label-id"
                                >
                                    <MenuItem value="">Select rental location</MenuItem>
                                    <MenuItem value="111111">Chikago</MenuItem>
                                    <MenuItem value="222222">New-York</MenuItem>
                                    <MenuItem value="333333">Baltimor</MenuItem>
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
                                onChange={(event, newValue) => {
                                    setTag(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tags"
                                        placeholder=""
                                    />
                                )}
                            />
                            <BoxStyled>
                                <FormInputText name="yourSKU" control={control} label="Your SKU" />
                            </BoxStyled>
                            <BoxStyled>
                                <FormControlLabel control={<Switch />} {...register("makeFeatured")} label="Make as featured" />
                            </BoxStyled>
                        </Paper>
                        <Paper elevation={0} variant="mainMargin">
                            <Typography variant="body2">
                                Shipping Params
                            </Typography>
                            <FormInputText name="weight" control={control} label="Weight" />
                            <BoxStyled>
                                <FormInputText name="height" control={control} label="Height" />
                            </BoxStyled>
                            <BoxStyled>
                                <FormInputText name="width" control={control} label="Width" />
                            </BoxStyled>
                            <BoxStyled>
                                <FormInputText name="length" control={control} label="Length" />
                            </BoxStyled>
                            <BoxStyled>
                                <FormControlLabel control={<Switch />} {...register("freeShipping")} label="Free shipping" />
                            </BoxStyled>
                        </Paper>
                        <BoxStyled>
                            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                <Grid item xs={12} md={6}>
                                    <Button variant="contained" themecolor="rentalThemeCancel" size="large" onClick={handleOpenNewTariffDialog}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button variant="contained" themecolor="rentalThemeSubmit" size="large" onClick={handleSubmit(handleSubmitInventory)}>
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </BoxStyled>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );


}

export { NewInventoryPage }