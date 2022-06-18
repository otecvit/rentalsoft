import React, { useEffect, useState, Fragment } from 'react';
import { FormProvider, useFieldArray, useForm, useWatch, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import MUIRichTextEditor from 'mui-rte';
import { convertToRaw } from 'draft-js'

import {
    Container,
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
    Skeleton
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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
import HeaderComponent from '../../_components/InterfaceComponent/HeaderComponent';
import AddImages from '../../_components/AddImages/AddImages';
import { update } from "react-spring";

const tags = [
    { title: 'aaaaaaaa', idTag: 1994 },
    { title: 'bbbbbbbb', idTag: 1972 },
    { title: 'ccccc', idTag: 1974 },
    { title: 'xxxxxxxx', idTag: 2008 },
    { title: 'rrrrrrr', idTag: 1957 },
]

const InventoryComponent = ({ chTokenInventory = "", actions }) => {
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
            chName: "",
            txtDescription: "",
            chSellPrice: "0",
            chDepositAmount: "0",
            chSalesTax: "",
            arrOptions: [{ optionName: "", optionValue: "" }],
            chTariff: "",
            chProductTracking: "0",
            chCountItem: "0",
            chIdentifier: "",
            chRentalLocation: "",
            chYourSKU: "",
            chWeight: "",
            chHeight: "",
            chWidth: "",
            chLength: "",
            blMakeFeatured: false,
            blFreeShipping: false,
            chCategoryName: "Find category",
            arrTagsNew: []
        }
    });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "arrOptions",
    })

    const [open, setOpen] = useState(false);
    const [openNewTariff, setOpenNewTariff] = useState(false);
    const [selectedTariff, setTariff] = useState("");
    const [selectedCategory, setCategory] = useState("");
    const [onSkeleton, setSceleton] = useState(false);
    const [tagsInventory, setTag] = useState([]);
    const [arrCurrentFiles, setFiles] = useState(null); // state в котором хранятся текущие файлы, которые отображаются
    const [removeFiles, setRemoveFiles] = useState([])

    const [trackMethod, setTrackMethod] = useState("0");
    const user = useSelector(state => state.authentication.user);
    const category = useSelector(state => state.category);
    const tariffs = useSelector(state => state.tariffs);
    const support = useSelector(state => state.support);
    const inventory = useSelector(state => state.inventory);
    const dispatch = useDispatch();

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            Dashboard
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/material-ui/getting-started/installation/"
        >
            Core
        </Link>,
        <span key="4">
            Breadcrumb
        </span>
        ,
    ];

    useEffect(() => {
        dispatch(categoryActions.load({ chTokenCompany: user.chTokenCompany }));
        dispatch(tariffsActions.load({ chTokenCompany: user.chTokenCompany }));
        if (actions === "edit")
            dispatch(inventoryActions.loadDataInventory({ chTokenCompany: user.chTokenCompany, chTokenInventory: chTokenInventory }));
        else
            dispatch(inventoryActions.clearInventoryState());
    }, []);

    useEffect(() => {
        // статус загрузки
        if (actions === "edit")
            if (inventory !== undefined && inventory.length != 0) {
                setSceleton(true);
                initialValueEdit(); // инициализация значений
            }
            else
                setSceleton(false);
        if (actions === "add") {
            setSceleton(true);
            initialValueAdd(); // инициализация значений
        }
    }, [support.isLoading]);


    useEffect(() => {

        if (support.lastTariffID && support.lastTariffID !== "") {
            setValue("chTariff", support.lastTariffID); // меняем значение формы
            setTariff(support.lastTariffID); // устанавливаем текущий тариф
            dispatch(supportActions.lastTariff("")); // очищаем редюсер
        }

    }, [tariffs]);


    const initialValueEdit = () => {
        setValue("chName", inventory[0].chName); // Product Name
        setValue("txtDescription", inventory[0].txtDescription);
        setValue("files", inventory[0].arrFilePath.length ? inventory[0].arrFilePath : []);
        setFiles(inventory[0].arrFilePath.length ? inventory[0].arrFilePath.map((item) => { return { preview: item.file } }) : []);
        setValue("chSellPrice", inventory[0].chSellPrice);
        setValue("chDepositAmount", inventory[0].chDepositAmount);
        setValue("chSalesTax", inventory[0].chSalesTax);
        setValue("chTariff", inventory[0].chTariff);
        setTariff(inventory[0].chTariff);
        setValue("arrOptions", !!inventory[0].arrOptions ? inventory[0].arrOptions : [{ optionName: "", optionValue: "" }]);
        setValue("chProductTracking", inventory[0].chProductTracking);
        setTrackMethod(inventory[0].chProductTracking);
        setValue("chCountItem", inventory[0].chCountItem);
        setValue("chIdentifier", inventory[0].chIdentifier);
        setValue("chRentalLocation", inventory[0].chRentalLocation);
        setValue("chYourSKU", inventory[0].chYourSKU);
        setValue("chWeight", inventory[0].chWeight);
        setValue("chHeight", inventory[0].chHeight);
        setValue("chWidth", inventory[0].chWidth);
        setValue("chLength", inventory[0].chLength);
        setValue("blMakeFeatured", inventory[0].blMakeFeatured === "1" ? true : false);
        setValue("blFreeShipping", inventory[0].blFreeShipping === "1" ? true : false);
        handleSelectCategory(inventory[0].chCategoryID);
        if (!!inventory[0].arrTags) setTag(tags.filter(x => inventory[0].arrTags.includes(x.idTag)));
    }

    const initialValueAdd = () => {
        setFiles([]);
    }

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


    // /// ищем значение тэга по id
    // const findByIdTag = (array, id) => {
    //     var result;
    //     array.some(item => result = item.idTag === id ? item : findById(item.children || [], id));
    //     return result;
    // };


    /// ищем значение категории по id
    const findById = (array, id) => {
        var result;
        array.some(item => result = item.id === id ? item : findById(item.children || [], id));
        return result;
    };

    // обратная функция выбора категории в диалоговом окне
    const handleSelectCategory = (currentCategory) => {
        if (!!currentCategory) {
            // Записываем в форму
            setValue("chCategoryName", findById(category, currentCategory).name);
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
        setTrackMethod(event.target.value);
        setValue("chProductTracking", event.target.value);
    }

    const handleChangeFeatured = (event) => {
        setValue("blMakeFeatured", !getValues("blMakeFeatured"));
    };

    const handleChangeShiping = (event) => {
        setValue("blFreeShipping", !getValues("blFreeShipping"))
    }

    const handleChangeCount = () => {

    }

    const handleChangeTags = (newValue) => {
        console.log(newValue)
        //setTag(newValue);
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


    const handleControlledDropzone = (allFiles) => {
        // добавляем файлы
        setFiles(prev => [...prev, ...allFiles]);
    };

    const handleDeleteFile = (allFiles, preview) => {
        //console.log(preview);
        setFiles(allFiles);
        setRemoveFiles(prev => [...prev, preview]);
    }

    const handleSubmitInventory = (data) => {

        // возвращаем массив только Файлов
        const filesToUpload = arrCurrentFiles.filter((item) => {
            if (Blob && item instanceof Blob)
                return item;
        });



        // массив файлов, которые надо удалить filesToRemove
        // проверяем на blob при удалении еще не закачанной картинки
        const filesToRemove = removeFiles.filter(e => e.search('blob:') == -1);



        if (actions === "edit") {

            // возвращаем массив файлов, которые надо оставить и не удалять
            const s = new Set(removeFiles);
            const filesToLeave = data.files.map((item) => item.file).filter(e => !s.has(e));


            // console.log({
            //     ...data,
            //     chCountItem: data.chProductTracking === "1" ? "0" : data.chCountItem,
            //     chIdentifier: data.chProductTracking === "0" ? "" : data.chIdentifier,
            //     blMakeFeatured: data.blMakeFeatured ? "1" : "0",
            //     blFreeShipping: data.blFreeShipping ? "1" : "0",
            //     chTokenInventory: chTokenInventory,
            //     chTariff: selectedTariff,
            //     chCategoryID: selectedCategory,
            //     arrTags: tagsInventory.map(item => item.idTag),
            //     filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
            //     filesToRemove: filesToRemove ? filesToRemove : null,
            //     filesToLeave: filesToLeave ? filesToLeave.map(item => ({ file: item })) : null,
            //     chTokenCompany: user.chTokenCompany,
            // });

            dispatch(inventoryActions.edit({
                ...data,
                chCountItem: data.chProductTracking === "1" ? "0" : data.chCountItem,
                chIdentifier: data.chProductTracking === "0" ? "" : data.chIdentifier,
                blMakeFeatured: data.blMakeFeatured ? "1" : "0",
                blFreeShipping: data.blFreeShipping ? "1" : "0",
                chTokenInventory: chTokenInventory,
                chTariff: selectedTariff,
                chCategoryID: selectedCategory,
                arrTags: tagsInventory.map(item => item.idTag),
                filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
                filesToRemove: filesToRemove ? filesToRemove : null,
                filesToLeave: filesToLeave ? filesToLeave.map(item => ({ file: item })) : null,
                chTokenCompany: user.chTokenCompany,
            }));
        }
        else {
            // console.log({
            //     ...data,
            //     chCountItem: data.chProductTracking === "1" ? "0" : data.chCountItem,
            //     chIdentifier: data.chProductTracking === "0" ? "" : data.chIdentifier,
            //     blMakeFeatured: data.blMakeFeatured ? "1" : "0",
            //     blFreeShipping: data.blFreeShipping ? "1" : "0",
            //     chTariff: selectedTariff,
            //     chCategoryID: selectedCategory,
            //     arrTags: tagsInventory.map(item => item.idTag),
            //     filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
            //     filesToRemove: filesToRemove ? filesToRemove : null,
            //     filesToLeave: null,
            //     chTokenCompany: user.chTokenCompany,
            // });

            dispatch(inventoryActions.add({
                ...data,
                chCountItem: data.chProductTracking === "1" ? "0" : data.chCountItem,
                chIdentifier: data.chProductTracking === "0" ? "" : data.chIdentifier,
                blMakeFeatured: data.blMakeFeatured ? "1" : "0",
                blFreeShipping: data.blFreeShipping ? "1" : "0",
                chTariff: selectedTariff,
                chCategoryID: selectedCategory,
                arrTags: tagsInventory.map(item => item.idTag),
                filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
                filesToRemove: filesToRemove ? filesToRemove : null,
                filesToLeave: null,
                chTokenCompany: user.chTokenCompany,
            }));
        }
    }

    return (

        <Container maxWidth="xl">
            <BoxStyledTitle>
                {onSkeleton ?
                    <HeaderComponent title={actions === "edit" ? getValues("chName") : "Create a new product"} breadcrumbs={breadcrumbs} />
                    : <Skeleton width="50%" />
                }
            </BoxStyledTitle>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={0} variant="main">
                        <FormInputText
                            name="chName"
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
                                    value={onSkeleton && getValues("txtDescription")}
                                    controls={["title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "numberList", "bulletList", "quote", "code", "clear"]}
                                    onChange={value => {
                                        const content = JSON.stringify(
                                            convertToRaw(value.getCurrentContent())
                                        );
                                        setValue("txtDescription", content);
                                    }}
                                />
                            </BoxStyledTextEditor>
                        </BoxStyled>
                        <BoxStyled>
                            <Typography variant="body2">
                                Images
                            </Typography>
                            <AddImages
                                initialfiles={onSkeleton ? arrCurrentFiles : []}
                                handleControlledDropzone={handleControlledDropzone}
                                handleDeleteFile={handleDeleteFile}
                            />
                        </BoxStyled>
                    </Paper>
                    <Paper elevation={0} variant="mainMargin">
                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 3 }}>
                            <Grid item xs={12} sm={3} md={1}>
                                <FormInputNumber
                                    name="chSellPrice"
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
                                    name="chDepositAmount"
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
                                    id="chSalesTax"
                                    name="chSalesTax"
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
                                        id="chTariff"
                                        name="chTariff"
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
                                            <FormInputText name={`arrOptions[${index}].optionName`} control={control} label="Option name" defaultValue={item.optionName} />
                                        </Grid>
                                        <Grid item xs={12} sm={5} md={5}>
                                            <FormInputText name={`arrOptions[${index}].optionValue`} control={control} label="Option value" value={item.optionValue} />
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
                            <FormControlLabel value="0" control={<Radio />} {...register("chProductTracking")} label="Group items" />
                            <FormControlLabel value="1" control={<Radio />} {...register("chProductTracking")} label="Individual item" />
                        </RadioGroup>
                        <BoxStyled>
                            {
                                trackMethod === "0" ?
                                    <FormInputNumber name="chCountItem" control={control} label="Count item" InputProps={{ inputProps: { min: 0, max: 100 } }} onChange={handleChangeCount} /> :
                                    <FormInputText name="chIdentifier" control={control} label="Identifier" />
                            }
                        </BoxStyled>
                        <BoxStyled>
                            <FormInputText name="chCategoryName" control={control} label="Category" InputProps={{ readOnly: true, endAdornment: <SelectCategoryBtn /> }} />
                            {open && <DialogSelectCategory data={category} handleOk={handleSelectCategory} handleClose={handleClose} />}
                        </BoxStyled>
                        <BoxStyled>
                            <FormInputSelect
                                id="rentalLocation"
                                name="chRentalLocation"
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
                            value={tagsInventory}
                            onChange={(_, newValue) => {
                                setTag(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tags"
                                />
                            )}
                        />
                        <BoxStyled>
                            <FormInputText name="chYourSKU" control={control} label="Your SKU" />
                        </BoxStyled>
                        <BoxStyled>
                            <Controller
                                name="blMakeFeatured"
                                control={control}
                                render={(props) => {
                                    return (
                                        <>
                                            <Switch
                                                name="blMakeFeatured"
                                                onChange={handleChangeFeatured}
                                                value={getValues("blMakeFeatured")}
                                                checked={getValues("blMakeFeatured")}
                                            />
                                            Make as featured
                                        </>
                                    );
                                }}
                            />
                        </BoxStyled>
                    </Paper>
                    <Paper elevation={0} variant="mainMargin">
                        <Typography variant="body2">
                            Shipping Params
                        </Typography>
                        <FormInputText name="chWeight" control={control} label="Weight" />
                        <BoxStyled>
                            <FormInputText name="chHeight" control={control} label="Height" />
                        </BoxStyled>
                        <BoxStyled>
                            <FormInputText name="chWidth" control={control} label="Width" />
                        </BoxStyled>
                        <BoxStyled>
                            <FormInputText name="chLength" control={control} label="Length" />
                        </BoxStyled>
                        <BoxStyled>
                            <Controller
                                name="blFreeShipping"
                                control={control}
                                render={(props) => {
                                    return (
                                        <>
                                            <Switch
                                                name="blFreeShipping"
                                                onChange={handleChangeShiping}
                                                value={getValues("blFreeShipping")}
                                                checked={getValues("blFreeShipping")}
                                            />
                                            Free shipping
                                        </>
                                    );
                                }}
                            />
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

    );
}

export { InventoryComponent };