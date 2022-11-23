import React, { useEffect, useState, Fragment } from 'react';
import { FormProvider, useFieldArray, useForm, useWatch, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import MUIRichTextEditor from 'mui-rte';
import { convertToRaw } from 'draft-js'

import '../../SettingsPages/Component/style/ckeditor.css';

import {
    Container,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
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

import { Box } from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";


import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { FormInputText } from "../../../_components/FormComponents/FormInputText";
import BoxStyled from '../../../_components/StyledComponent/BoxStyled';
import BoxStyledTextEditor from '../../../_components/StyledComponent/BoxStyledTextEditor';
import BoxStyledTitle from '../../../_components/StyledComponent/BoxStyledTitle';
import HeaderComponent from '../../../_components/InterfaceComponent/HeaderComponent';
import AddImages from '../../../_components/AddImages/AddImages';
import { update } from "react-spring";


function EditPrintTemplatePage({ chTokenInventory = "", actions = "" }) {

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

    const arrPrintTag = [
        {
            chTagName: 'Номер договора',
            chTagValue: '##CONTRACT_NUMBER##',
        },
        {
            chTagName: 'Клиент',
            chTagValue: '##CLIENT##',
        },
        {
            chTagName: 'Адрес клиента',
            chTagValue: '##CLIENT_ADRESS##',
        },
        {
            chTagName: 'Инвентарь',
            chTagValue: '##INVENTORY##',
            arrTagOptions: [
                {
                    chTagOptionName: 'Наименование инвентаря',
                    chTagOptionValue: '##INVENTORY_NAME##',
                },
                {
                    chTagOptionName: 'Количество',
                    chTagOptionValue: '##INVENTORY_COUNT##',
                }
            ]
        },
        {
            chTagName: 'Общая сумма',
            chTagValue: '##TOTAL_AFTER_TAX##',
        },
        {
            chTagName: 'Номер договора',
            chTagValue: '##CONTRACT_NUMBER##',
        },
        {
            chTagName: 'Клиент',
            chTagValue: '##CLIENT##',
        },
        {
            chTagName: 'Адрес клиента',
            chTagValue: '##CLIENT_ADRESS##',
        },
        {
            chTagName: 'Инвентарь',
            chTagValue: '##INVENTORY##',
            arrTagOptions: [
                {
                    chTagOptionName: 'Наименование инвентаря',
                    chTagOptionValue: '##INVENTORY_NAME##',
                },
                {
                    chTagOptionName: 'Количество',
                    chTagOptionValue: '##INVENTORY_COUNT##',
                }
            ]
        },
        {
            chTagName: 'Общая сумма',
            chTagValue: '##TOTAL_AFTER_TAX##',
        },

    ]


    const [text, setText] = useState("");
    const [editor, setEditor] = useState(null);

    const [chSearchTag, setSearchTag] = useState("");

    const [open, setOpen] = useState(false);
    const [openNewTariff, setOpenNewTariff] = useState(false);
    const [selectedTariff, setTariff] = useState("");
    const [selectedCategory, setCategory] = useState("");
    const [selectedTax, setTax] = useState("");
    const [onSkeleton, setSceleton] = useState(false);
    const [tagsInventory, setTag] = useState([]);
    const [arrCurrentFiles, setFiles] = useState(null); // state в котором хранятся текущие файлы, которые отображаются
    const [removeFiles, setRemoveFiles] = useState([])

    const [trackMethod, setTrackMethod] = useState("0");
    const user = useSelector(state => state.authentication.user);
    const category = useSelector(state => state.category);
    const tariffs = useSelector(state => state.tariffs);
    const taxes = useSelector(state => state.taxes);
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
        setSceleton(true);
        // dispatch(categoryActions.load({ chTokenCompany: user.chTokenCompany }));
        // dispatch(tariffsActions.load({ chTokenCompany: user.chTokenCompany }));
        // dispatch(taxesActions.load({ chTokenCompany: user.chTokenCompany })); // загружаем налоги

        // if (actions === "edit")
        //     dispatch(inventoryActions.loadDataInventory({ chTokenCompany: user.chTokenCompany, chTokenInventory: chTokenInventory }));
        // else
        //     dispatch(inventoryActions.clearInventoryState());
    }, []);



    const AddTag = (tag) => {
        editor.model.change(writer => {
            writer.insert(tag, editor.model.document.selection.getFirstPosition());
        });
    }

    const handleSearchTag = (event) => {
        setSearchTag(event.target.value);
    };

    const initialValueEdit = () => {
        // setValue("chName", inventory[0].chName); // Product Name
        // setValue("txtDescription", inventory[0].txtDescription);
        // setValue("files", inventory[0].arrFilePath.length ? inventory[0].arrFilePath : []);
        // setFiles(inventory[0].arrFilePath.length ? inventory[0].arrFilePath.map((item) => { return { preview: item.file } }) : []);
        // setValue("chSellPrice", inventory[0].chSellPrice);
        // setValue("chDepositAmount", inventory[0].chDepositAmount);
        // setValue("chSalesTax", inventory[0].chSalesTax);
        // setValue("chTariff", inventory[0].chTariff);
        // setTariff(inventory[0].chTariff);
        // setValue("arrOptions", !!inventory[0].arrOptions ? inventory[0].arrOptions : [{ optionName: "", optionValue: "" }]);
        // setValue("chProductTracking", inventory[0].chProductTracking);
        // setTrackMethod(inventory[0].chProductTracking);
        // setValue("chCountItem", inventory[0].chCountItem);
        // setValue("chIdentifier", inventory[0].chIdentifier);
        // setValue("chRentalLocation", inventory[0].chRentalLocation);
        // setValue("chYourSKU", inventory[0].chYourSKU);
        // setValue("chWeight", inventory[0].chWeight);
        // setValue("chHeight", inventory[0].chHeight);
        // setValue("chWidth", inventory[0].chWidth);
        // setValue("chLength", inventory[0].chLength);
        // setValue("blMakeFeatured", inventory[0].blMakeFeatured === "1" ? true : false);
        // setValue("blFreeShipping", inventory[0].blFreeShipping === "1" ? true : false);
        // handleSelectCategory(inventory[0].chCategoryID);
        // if (!!inventory[0].arrTags) setTag(tags.filter(x => inventory[0].arrTags.includes(x.idTag)));
    }



    const handleSubmitTemplate = (data) => {

        console.log(editor.getData());


        console.log({
            ...data,

        })

        // if (actions === "edit") {

        //     // возвращаем массив файлов, которые надо оставить и не удалять
        //     const s = new Set(removeFiles);
        //     const filesToLeave = data.files.map((item) => item.file).filter(e => !s.has(e));


        //     // console.log({
        //     //     ...data,
        //     //     chCountItem: data.chProductTracking === "1" ? "0" : data.chCountItem,
        //     //     chIdentifier: data.chProductTracking === "0" ? "" : data.chIdentifier,
        //     //     blMakeFeatured: data.blMakeFeatured ? "1" : "0",
        //     //     blFreeShipping: data.blFreeShipping ? "1" : "0",
        //     //     chTokenInventory: chTokenInventory,
        //     //     chTariff: selectedTariff,
        //     //     chCategoryID: selectedCategory,
        //     //     arrTags: tagsInventory.map(item => item.idTag),
        //     //     filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
        //     //     filesToRemove: filesToRemove ? filesToRemove : null,
        //     //     filesToLeave: filesToLeave ? filesToLeave.map(item => ({ file: item })) : null,
        //     //     chTokenCompany: user.chTokenCompany,
        //     // });

        //     dispatch(inventoryActions.edit({
        //         ...data,
        //         chCountItem: data.chProductTracking === "1" ? "0" : data.chCountItem,
        //         chIdentifier: data.chProductTracking === "0" ? "" : data.chIdentifier,
        //         blMakeFeatured: data.blMakeFeatured ? "1" : "0",
        //         blFreeShipping: data.blFreeShipping ? "1" : "0",
        //         chTokenInventory: chTokenInventory,
        //         chTariff: selectedTariff,
        //         chCategoryID: selectedCategory,
        //         arrTags: tagsInventory.map(item => item.idTag),
        //         filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
        //         filesToRemove: filesToRemove ? filesToRemove : null,
        //         filesToLeave: filesToLeave ? filesToLeave.map(item => ({ file: item })) : null,
        //         chTokenCompany: user.chTokenCompany,
        //     }));
        // }
        // else {
        //     // console.log({
        //     //     ...data,
        //     //     chCountItem: data.chProductTracking === "1" ? "0" : data.chCountItem,
        //     //     chIdentifier: data.chProductTracking === "0" ? "" : data.chIdentifier,
        //     //     blMakeFeatured: data.blMakeFeatured ? "1" : "0",
        //     //     blFreeShipping: data.blFreeShipping ? "1" : "0",
        //     //     chTariff: selectedTariff,
        //     //     chCategoryID: selectedCategory,
        //     //     arrTags: tagsInventory.map(item => item.idTag),
        //     //     filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
        //     //     filesToRemove: filesToRemove ? filesToRemove : null,
        //     //     filesToLeave: null,
        //     //     chTokenCompany: user.chTokenCompany,
        //     // });

        //     dispatch(inventoryActions.add({
        //         ...data,
        //         chCountItem: data.chProductTracking === "1" ? "0" : data.chCountItem,
        //         chIdentifier: data.chProductTracking === "0" ? "" : data.chIdentifier,
        //         blMakeFeatured: data.blMakeFeatured ? "1" : "0",
        //         blFreeShipping: data.blFreeShipping ? "1" : "0",
        //         chTariff: selectedTariff,
        //         chCategoryID: selectedCategory,
        //         arrTags: tagsInventory.map(item => item.idTag),
        //         filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
        //         filesToRemove: filesToRemove ? filesToRemove : null,
        //         filesToLeave: null,
        //         chTokenCompany: user.chTokenCompany,
        //     }));
        // }
    }

    const config = {
        fontSize: {
            options: [
                '8px',
                '10px',
                '12px',
                '14px',
                '16px',
                '18px',
                '20px',
                '24px',
                '28px',
                '32px'
            ]
        },
    }

    return (

        <Container maxWidth="xl">
            <BoxStyledTitle>
                {onSkeleton ?
                    <HeaderComponent title={actions === "edit" ? getValues("chName") : "Create a new template"} breadcrumbs={breadcrumbs} />
                    : <Skeleton width="50%" />
                }
            </BoxStyledTitle>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={0} variant="main">
                        <FormInputText
                            name="chName"
                            control={control}
                            label="Template name"
                            rules={{
                                required: {
                                    value: true,
                                    message: "Template name is required."
                                }
                            }} />
                        <BoxStyled>
                            <div className="document-editor">
                                <div className="document-editor__toolbar"></div>
                                <div className="document-editor__editable-container">
                                    <CKEditor
                                        editor={DecoupledEditor}
                                        config={config}
                                        data=""
                                        onReady={editor => {
                                            const toolbarContainer = document.querySelector('.document-editor__toolbar');
                                            toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                            setEditor(editor);
                                        }}
                                        onChange={(event, editor) => {

                                            // const data = editor.getData();
                                            // setText(data);
                                        }}
                                    />
                                </div>
                            </div>
                        </BoxStyled>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={0} variant="main">
                        <TextField
                            onChange={handleSearchTag}
                            fullWidth={true}
                            label="Search tag"
                        />
                        <BoxStyled>
                            <Box
                                sx={{
                                    mb: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    height: 618,
                                    overflow: "hidden",
                                    overflowY: "scroll",
                                    // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                                }}
                            >
                                <List>
                                    {
                                        arrPrintTag.filter(x => x.chTagName.toLowerCase().includes(chSearchTag.toLowerCase())).map((item, index) => {
                                            return (
                                                <>
                                                    <ListItem key={index} disablePadding>
                                                        <ListItemButton onClick={() => AddTag(`${item.chTagValue}`)}>
                                                            <ListItemText
                                                                primary={item.chTagName}
                                                                primaryTypographyProps={{
                                                                    fontSize: '0.95rem',
                                                                    fontWeight: '600',
                                                                    color: '#606060',
                                                                }}
                                                                secondary={item.chTagValue}
                                                                secondaryTypographyProps={{
                                                                    backgroundColor: '#e8e9e9',
                                                                    fontWeight: '500',
                                                                    padding: '3px 8px',
                                                                    color: '#5e5e5e',
                                                                    fontSize: 12,
                                                                    borderRadius: '0.25em',
                                                                    lineHeight: '16px',
                                                                    display: 'initial',
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>
                                                    <List component="div" disablePadding>
                                                        <ListItemButton sx={{ pl: 4 }}>
                                                            <ListItemText primary="Starred" />
                                                        </ListItemButton>
                                                    </List>
                                                </>
                                            )
                                        })
                                    }
                                </List>
                            </Box>
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
                                <Button variant="contained" themecolor="rentalThemeSubmit" size="large" onClick={handleSubmit(handleSubmitTemplate)}>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </BoxStyled>

                </Grid>
            </Grid>
        </Container >

    );
}

export { EditPrintTemplatePage }