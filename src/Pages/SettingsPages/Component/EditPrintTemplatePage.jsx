import React, { useEffect, useState, Fragment } from 'react';
import { FormProvider, useFieldArray, useForm, useWatch, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
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
import { templatesActions } from '../../../_actions';

import { update } from "react-spring";
import { templates } from '../../../_reducers/templates.reducer';


function EditPrintTemplatePage() {


    let { chTokenPrintTemplate } = useParams();

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
            blActive: true,
        }
    });

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

    const [editor, setEditor] = useState(null);
    const [chSearchTag, setSearchTag] = useState("");
    const [onSkeleton, setSceleton] = useState(false);

    const user = useSelector(state => state.authentication.user);
    const support = useSelector(state => state.support);
    const templates = useSelector(state => state.templates);
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
        dispatch(templatesActions.clear());
        if (chTokenPrintTemplate !== 'new')
            dispatch(templatesActions.loadData({ chTokenCompany: user.chTokenCompany, chTokenPrintTemplate: chTokenPrintTemplate }));

    }, []);

    useEffect(() => {
        if (chTokenPrintTemplate !== "new") {
            if (templates !== undefined && templates.length != 0) {
                setSceleton(true);
                initialValueEdit(); // инициализация значений
            }
            else
                setSceleton(false);
        }
        if (chTokenPrintTemplate === "new") {
            setSceleton(true);
            //initialValueAdd(); // инициализация значений
        }
    }, [support.isLoadingTemplates]);

    const AddTag = (tag) => {
        editor.model.change(writer => {
            writer.insert(tag, editor.model.document.selection.getFirstPosition());
        });
    }

    const handleSearchTag = (event) => {
        setSearchTag(event.target.value);
    };

    const handleChangeActive = (event) => {
        setValue("blActive", !getValues("blActive"));
    };

    // редактирование, заполняем поля
    const initialValueEdit = () => {
        setValue("chName", templates[0].chName); // Template Name
        setValue("blActive", templates[0].blActive === "1" ? true : false);
        if (editor !== null) {
            // заполняем редактор
            var viewFragment = editor.data.processor.toView(templates[0].chPrintTemplate);
            var modelFragment = editor.data.toModel(viewFragment);
            var insertPosition = editor.model.document.selection.getFirstPosition();
            editor.model.insertContent(modelFragment, insertPosition);
        }
    }

    const handleSubmitTemplate = (data) => {
        if (chTokenPrintTemplate === 'new')
            // добавляем в бд
            dispatch(templatesActions.add({
                ...data,
                chPrintTemplate: editor.getData(),
                chTokenCompany: user.chTokenCompany,
                blActive: data.blActive ? '1' : '0',
            }));
        else {
            console.log("dasda");
            dispatch(templatesActions.edit({
                ...data,
                chTokenPrintTemplate: chTokenPrintTemplate,
                chPrintTemplate: editor.getData(),
                chTokenCompany: user.chTokenCompany,
                blActive: data.blActive ? '1' : '0',
            }));
        }
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
                    <HeaderComponent title={chTokenPrintTemplate === "new" ? "Create a new template" : templates !== undefined && templates.length != 0 && templates[0].chName} breadcrumbs={breadcrumbs} />
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
                                    height: 532,
                                    overflow: "hidden",
                                    overflowY: "scroll",
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
                    <Paper elevation={0} variant="mainMargin">
                        <Typography variant="body2">
                            Active print template
                        </Typography>
                        <BoxStyled>
                            <Controller
                                name="blActive"
                                control={control}
                                render={(props) => {
                                    return (
                                        <>
                                            <Switch
                                                name="blActive"
                                                onChange={handleChangeActive}
                                                value={getValues("blActive")}
                                                checked={getValues("blActive")}
                                            />
                                            Active
                                        </>
                                    );
                                }}
                            />
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