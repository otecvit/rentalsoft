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


//import Editor from 'ckeditor5-custom-build/build/ckeditor';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';
//import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
//import DecoupledEditor from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';
//import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
//import LineHeight from 'ckeditor5-line-height-plugin/src/lineheight';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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

    const [text, setText] = useState("");

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



    const handleSubmitInventory = (data) => {

        // // возвращаем массив только Файлов
        // const filesToUpload = arrCurrentFiles.filter((item) => {
        //     if (Blob && item instanceof Blob)
        //         return item;
        // });



        // // массив файлов, которые надо удалить filesToRemove
        // // проверяем на blob при удалении еще не закачанной картинки
        // const filesToRemove = removeFiles.filter(e => e.search('blob:') == -1);



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
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                {
                    model: 'headingFancy',
                    view: {
                        name: 'p',
                        classes: 'ccc'
                    },
                    title: 'Heading 2 (fancy)',
                    class: 'ck-heading_heading2_fancy',
                    style: {
                        lineHeight: '1px',
                    },
                    // It needs to be converted before the standard 'heading2'.
                    converterPriority: 'high'
                }
            ]
        },
        // fontSize: {
        //     options: [
        //         9,
        //         11,
        //         13,
        //         'default',
        //         17,
        //         19,
        //         21
        //     ]
        // },
        // fontFamily: {
        //     options: [
        //         'default',
        //         'Arial, Helvetica, sans-serif',
        //         'Courier New, Courier, monospace',
        //         'Georgia, serif',
        //         'Lucida Sans Unicode, Lucida Grande, sans-serif',
        //         'Tahoma, Geneva, sans-serif',
        //         'Times New Roman, Times, serif',
        //         'Trebuchet MS, Helvetica, sans-serif',
        //         'Verdana, Geneva, sans-serif'
        //     ]
        // },
        // lineHeight: { // specify your otions in the lineHeight config object. Default values are [ 0, 0.5, 1, 1.5, 2 ]
        //     options: [0.5, 1, 1.5, 2, 2.5]
        // },
        //toolbar: ['bold'],
        toolbarLocation: "top",
        toolbar: [
            'heading', '|', 'fontSize', 'fontFamily', 'fontColor', 'lineHeight', 'fontBackgroundColor', 'bulletedList', 'numberedList', 'undo', 'redo'
        ]
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
                    <div className="document-editor">
                        <div className="document-editor__toolbar"></div>
                        <div className="document-editor__editable-container">
                            <CKEditor
                                editor={DecoupledEditor}
                                config={config}
                                data="<p>Hello from CKEditor 5!</p>"
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                    // editor.ui
                                    //     .getEditableElement()
                                    //     .parentElement.insertBefore(
                                    //         editor.ui.view.toolbar.element,
                                    //         editor.ui.getEditableElement()
                                    //     );
                                    // Add these two lines to properly position the toolbar
                                    const toolbarContainer = document.querySelector('.document-editor__toolbar');
                                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);

                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    2
                </Grid>
            </Grid>
        </Container >

    );
}

export { EditPrintTemplatePage }