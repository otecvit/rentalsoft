import React, { useEffect, useState, Fragment } from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import MUIRichTextEditor from 'mui-rte';
import { convertToRaw } from 'draft-js'
import { styled } from '@mui/system';

import {
    Container,
    Box,
    Paper,
    Grid,
    Typography,
    MenuItem,
    IconButton,
    InputAdornment,
    Button,
    Link,
    Skeleton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Autocomplete,
    CircularProgress
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { categoryActions, bundlesActions, supportActions, inventoryActions, customerActions } from '../../_actions';

import { FormInputText } from "../../_components/FormComponents/FormInputText";
import { FormInputDate } from "../../_components/FormComponents/FormInputDate";
import { FormInputSelect } from "../../_components/FormComponents/FormInputSelect";
import { DialogSelectCategory } from "../../_components/FormComponents/DialogSelectCategory";

import { FormInputNumber } from "../../_components/FormComponents/FormInputNumber";

import { AutocompleteSearchInventory } from '../../_components/FormComponents/AutocompleteSearch/AutocompleteSearchInventory';
import { AutocompleteSearchServices } from '../../_components/FormComponents/AutocompleteSearch/AutocompleteSearchServices';
import { AutocompleteSearchConsumables } from '../../_components/FormComponents/AutocompleteSearch/AutocompleteSearchConsumables';

import BoxClear from '../../_components/StyledComponent/BoxClear';
import BoxStyled from '../../_components/StyledComponent/BoxStyled';
import BoxStyledBorderTop from '../../_components/StyledComponent/BoxStyledBorderTop';
import BoxStyledTextEditor from '../../_components/StyledComponent/BoxStyledTextEditor';
import BoxStyledTitle from '../../_components/StyledComponent/BoxStyledTitle';
import HeaderComponent from '../../_components/InterfaceComponent/HeaderComponent';
import AddImages from '../../_components/AddImages/AddImages';
import EmptyData from '../../_components/InterfaceComponent/EmptyData';


const tags = [
    { title: 'aaaaaaaa', idTag: 1994 },
    { title: 'bbbbbbbb', idTag: 1972 },
    { title: 'ccccc', idTag: 1974 },
    { title: 'xxxxxxxx', idTag: 2008 },
    { title: 'rrrrrrr', idTag: 1957 },
]

const BundleComponent = ({ chTokenBundle = "", actions }) => {
    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: {
            chName: "",
            arrInventory: [],
            arrServices: [],
            arrConsumables: [],
            chCategoryName: "",
            txtDescription: "",
            chYourSKU: ""
        }
    });

    const {
        fields: arrInventoryFields,
        append: arrInventoryAppend,
        remove: arrInventoryRemove,
    } = useFieldArray({
        control,
        name: "arrInventory",
    });

    const {
        fields: arrServicesFields,
        append: arrServicesAppend,
        remove: arrServicesRemove,
    } = useFieldArray({
        control,
        name: "arrServices",
    });

    const {
        fields: arrConsumablesFields,
        append: arrConsumablesAppend,
        remove: arrConsumablesRemove,
    } = useFieldArray({
        control,
        name: "arrConsumables",
    });



    const [onSkeleton, setSceleton] = useState(false);
    const [arrCurrentFiles, setFiles] = useState(null); // state в котором хранятся текущие файлы, которые отображаются
    const [removeFiles, setRemoveFiles] = useState([])
    const [selectedCategory, setCategory] = useState("");
    const [open, setOpen] = React.useState(false);
    const [tagsInventory, setTag] = useState([]);


    const user = useSelector(state => state.authentication.user);
    const support = useSelector(state => state.support);
    const category = useSelector(state => state.category);
    const bundles = useSelector(state => state.bundles);
    const dispatch = useDispatch();

    const TableLabel = styled('div')({
        fontSize: '0.80rem',
        color: 'rgb(39, 44, 52)',
        fontWeight: '700',
    });


    const SelectCategoryBtn = () => {
        return (
            <IconButton onClick={handleClickOpen} sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        );
    }



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
        if (actions === "edit")
            dispatch(bundlesActions.loadData({ chTokenCompany: user.chTokenCompany, chTokenBundle: chTokenBundle }));

        else
            dispatch(bundlesActions.clear());
    }, []);


    useEffect(() => {
        // статус загрузки
        if (actions === "edit")
            if (bundles !== undefined && bundles.length != 0) {
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

    const initialValueEdit = () => {

        setValue("chName", bundles[0].chName);
        setValue("txtDescription", bundles[0].txtDescription);
        setValue("arrInventory", bundles[0].arrInventory);
        setValue("arrServices", bundles[0].arrServices);
        setValue("arrConsumables", bundles[0].arrConsumables);
        setValue("files", bundles[0].arrFilePath.length ? bundles[0].arrFilePath : []);
        setFiles(bundles[0].arrFilePath.length ? bundles[0].arrFilePath.map((item) => { return { preview: item.file } }) : []);
        handleSelectCategory(bundles[0].chCategoryID);
        if (!!bundles[0].arrTags) setTag(tags.filter(x => bundles[0].arrTags.includes(x.idTag)));
        setValue("chYourSKU", bundles[0].chYourSKU);

    }

    const initialValueAdd = () => {
        setFiles([]);
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

    /// ищем значение категории по id
    const findById = (array, id) => {
        var result;
        array.some(item => result = item.id === id ? item : findById(item.children || [], id));
        return result;
    };


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

    const handleAddInventory = (inventorySelected) => {
        arrInventoryAppend({
            chTokenInventory: inventorySelected.chTokenInventory,
            chName: inventorySelected.chName,
            chQuantity: "1",
            chDiscount: "0",
        });
    }

    const handleAddServices = (serviceSelected) => {
        arrServicesAppend({
            chTokenService: serviceSelected.chTokenService,
            chName: serviceSelected.chName,
            chQuantity: "1",
            chDiscount: "0",
        });
    }

    const handleAddConsumables = (consumableSelected) => {
        arrConsumablesAppend({
            chTokenConsumable: consumableSelected.chTokenConsumable,
            chName: consumableSelected.chName,
            chQuantity: "1",
            chDiscount: "0",
        });
    }


    const handleSubmitBundle = (data) => {

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



            console.log({
                ...data,
                chTokenBundle: chTokenBundle,
                chCategoryID: selectedCategory,
                arrTags: tagsInventory.map(item => item.idTag),
                filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
                filesToRemove: filesToRemove ? filesToRemove : null,
                filesToLeave: filesToLeave ? filesToLeave.map(item => ({ file: item })) : null,
                chTokenCompany: user.chTokenCompany,
            });

            dispatch(bundlesActions.edit({
                ...data,
                chTokenBundle: chTokenBundle,
                chCategoryID: selectedCategory,
                arrTags: tagsInventory.map(item => item.idTag),
                filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
                filesToRemove: filesToRemove ? filesToRemove : null,
                filesToLeave: filesToLeave ? filesToLeave.map(item => ({ file: item })) : null,
                chTokenCompany: user.chTokenCompany,
            }));
        }
        else {

            console.log({
                ...data,
                chCategoryID: selectedCategory,
                arrTags: tagsInventory.map(item => item.idTag),
                filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
                filesToRemove: filesToRemove ? filesToRemove : null,
                filesToLeave: null,
                chTokenCompany: user.chTokenCompany,
            });

            dispatch(bundlesActions.add({
                ...data,
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
                    <HeaderComponent title={actions === "edit" ? `${getValues("chName")}` : "Create a new bundle"} breadcrumbs={breadcrumbs} />
                    : <Skeleton width="50%" />
                }
            </BoxStyledTitle>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={0} variant="main">
                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormInputText
                                    name="chName"
                                    control={control}
                                    label="Bundle name"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Bundle name is required."
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper elevation={0} variant="mainMargin">
                        <BoxClear>

                            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <AutocompleteSearchInventory
                                        id="inv"
                                        key="inv5566"
                                        fnAddToBundle={handleAddInventory}
                                        data="inventory"
                                        labelTitle="Search to add inventory"
                                    />
                                </Grid>
                            </Grid>
                            {
                                arrInventoryFields.length ?
                                    <BoxStyled>
                                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                            <Grid item xs={12} sm={7} md={7}>
                                            </Grid>
                                            <Grid item xs={12} sm={2} md={2} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>Quantity</TableLabel>
                                            </Grid>
                                            <Grid item xs={11} sm={2} md={2} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>Discount</TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={1} md={1}>
                                            </Grid>
                                        </Grid>
                                    </BoxStyled> :
                                    <EmptyData title="This bundle is empty." subtitle="Please add some inventory." size="200px" />
                            }

                            {
                                arrInventoryFields.map((item, index) => (

                                    <BoxStyledBorderTop key={item.id}>
                                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                            <Grid item xs={12} sm={7} md={7} style={{ justifyContent: "left", alignItems: "center", display: "flex", }}>
                                                <TableLabel>{item.chName}</TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={2} md={2}>
                                                <FormInputNumber
                                                    name={`arrInventory[${index}].chQuantity`}
                                                    control={control}
                                                    size="small"
                                                    defaultValue={item.chQuantity}
                                                    sx={{
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    InputProps={{
                                                        inputProps: { min: 1 },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={11} sm={2} md={2}>
                                                <FormInputNumber
                                                    name={`arrInventory[${index}].chDiscount`}
                                                    control={control}
                                                    size="small"
                                                    defaultValue={item.chDiscount}
                                                    sx={{
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                                        inputProps: { min: 0, max: 100 },
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={1} md={1} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <IconButton aria-label="del" onClick={() => arrInventoryRemove(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </BoxStyledBorderTop>

                                ))
                            }
                        </BoxClear>
                    </Paper>

                    <Paper elevation={0} variant="mainMargin">
                        <BoxClear>
                            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <AutocompleteSearchServices
                                        id="serv"
                                        key="333444"
                                        fnAddToBundle={handleAddServices}
                                        data="services"
                                        labelTitle="Search to add service"
                                    />
                                </Grid>
                            </Grid>
                            {
                                arrServicesFields.length ?
                                    <BoxStyled>
                                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                            <Grid item xs={12} sm={7} md={7}>
                                            </Grid>
                                            <Grid item xs={12} sm={2} md={2} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>Quantity</TableLabel>
                                            </Grid>
                                            <Grid item xs={11} sm={2} md={2} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>Discount</TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={1} md={1}>
                                            </Grid>
                                        </Grid>
                                    </BoxStyled> :
                                    <EmptyData title="This bundle is empty." subtitle="Please add some inventory." size="200px" />
                            }

                            {
                                arrServicesFields.map((item, index) => (

                                    <BoxStyledBorderTop key={item.id}>
                                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                            <Grid item xs={12} sm={7} md={7} style={{ justifyContent: "left", alignItems: "center", display: "flex", }}>
                                                <TableLabel>{item.chName}</TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={2} md={2}>
                                                <FormInputNumber
                                                    name={`arrServices[${index}].chQuantity`}
                                                    control={control}
                                                    size="small"
                                                    defaultValue={item.chQuantity}
                                                    sx={{
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    InputProps={{
                                                        inputProps: { min: 1 },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={11} sm={2} md={2}>
                                                <FormInputNumber
                                                    name={`arrServices[${index}].chDiscount`}
                                                    control={control}
                                                    size="small"
                                                    defaultValue={item.chDiscount}
                                                    sx={{
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                                        inputProps: { min: 0, max: 100 },
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={1} md={1} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <IconButton aria-label="del" onClick={() => arrServicesRemove(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </BoxStyledBorderTop>
                                ))
                            }
                        </BoxClear>
                    </Paper>

                    <Paper elevation={0} variant="mainMargin">
                        <BoxClear>
                            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <AutocompleteSearchConsumables
                                        fnAddToBundle={handleAddConsumables}
                                        data="consumables"
                                        labelTitle="Search to add consumable"
                                    />
                                </Grid>
                            </Grid>
                            {
                                arrConsumablesFields.length ?
                                    <BoxStyled>
                                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                            <Grid item xs={12} sm={7} md={7}>
                                            </Grid>
                                            <Grid item xs={12} sm={2} md={2} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>Quantity</TableLabel>
                                            </Grid>
                                            <Grid item xs={11} sm={2} md={2} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>Discount</TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={1} md={1}>
                                            </Grid>
                                        </Grid>
                                    </BoxStyled> :
                                    <EmptyData title="This bundle is empty." subtitle="Please add some consumable." size="200px" />
                            }

                            {
                                arrConsumablesFields.map((item, index) => (
                                    <BoxStyledBorderTop key={item.id}>
                                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                            <Grid item xs={12} sm={7} md={7} style={{ justifyContent: "left", alignItems: "center", display: "flex", }}>
                                                <TableLabel>{item.chName}</TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={2} md={2}>
                                                <FormInputNumber
                                                    name={`arrConsumables[${index}].chQuantity`}
                                                    control={control}
                                                    size="small"
                                                    defaultValue={item.chQuantity}
                                                    sx={{
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    InputProps={{
                                                        inputProps: { min: 1 },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={11} sm={2} md={2}>
                                                <FormInputNumber
                                                    name={`arrConsumables[${index}].chDiscount`}
                                                    control={control}
                                                    size="small"
                                                    defaultValue={item.chDiscount}
                                                    sx={{
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                                        inputProps: { min: 0, max: 100 },
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={1} md={1} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <IconButton aria-label="del" onClick={() => arrConsumablesRemove(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </BoxStyledBorderTop>
                                ))
                            }
                        </BoxClear>
                    </Paper>

                    <Paper elevation={0} variant="mainMargin">
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
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={0} variant="main">
                        <FormInputText name="chCategoryName" control={control} label="Category" InputProps={{ readOnly: true, endAdornment: <SelectCategoryBtn /> }} />
                        {open && <DialogSelectCategory data={category} handleOk={handleSelectCategory} handleClose={handleClose} />}
                        <BoxStyled>
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
                        </BoxStyled>
                        <BoxStyled>
                            <FormInputText name="chYourSKU" control={control} label="Your SKU" />
                        </BoxStyled>
                    </Paper>
                    <BoxStyled>
                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                            <Grid item xs={12} md={6}>
                                <Button variant="contained" themecolor="rentalThemeCancel" size="large" onClick={() => { }}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button variant="contained" themecolor="rentalThemeSubmit" size="large" onClick={handleSubmit(handleSubmitBundle)}>
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

export { BundleComponent };