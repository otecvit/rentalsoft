import React, { useEffect, useState, Fragment } from 'react';
import { useFieldArray, useForm } from "react-hook-form";
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
    InputAdornment,
    Button,
    Link,
    Skeleton,
    Radio,
    RadioGroup,
    FormControlLabel,
    AccordionDetails,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { categoryActions, tariffsActions, supportActions, consumablesActions, customerActions } from '../../_actions';

import { FormInputText } from "../../_components/FormComponents/FormInputText";
import { FormInputDate } from "../../_components/FormComponents/FormInputDate";
import { FormInputSelect } from "../../_components/FormComponents/FormInputSelect";

import { FormInputNumber } from "../../_components/FormComponents/FormInputNumber";
import BoxClear from '../../_components/StyledComponent/BoxClear';
import BoxStyled from '../../_components/StyledComponent/BoxStyled';
import BoxStyledTextEditor from '../../_components/StyledComponent/BoxStyledTextEditor';
import BoxStyledTitle from '../../_components/StyledComponent/BoxStyledTitle';
import HeaderComponent from '../../_components/InterfaceComponent/HeaderComponent';
import AddImages from '../../_components/AddImages/AddImages';

const ConsumableComponent = ({ chTokenConsumable = "", actions }) => {
    const {
        handleSubmit,
        control,
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
            chSalesTax: "",
            chProductTracking: "0",
            chCountItem: "0",
        }
    });

    const [onSkeleton, setSceleton] = useState(false);
    const [arrCurrentFiles, setFiles] = useState(null); // state в котором хранятся текущие файлы, которые отображаются
    const [removeFiles, setRemoveFiles] = useState([]);
    const [trackMethod, setTrackMethod] = useState("0");

    const user = useSelector(state => state.authentication.user);
    const support = useSelector(state => state.support);
    const consumables = useSelector(state => state.consumables);
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
        if (actions === "edit")
            dispatch(consumablesActions.loadDataConsumable({ chTokenCompany: user.chTokenCompany, chTokenConsumable: chTokenConsumable }));
        else
            dispatch(consumablesActions.clear());
    }, []);

    useEffect(() => {
        // статус загрузки
        if (actions === "edit")
            if (consumables !== undefined && consumables.length != 0) {
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

        setValue("chName", consumables[0].chName);
        setValue("txtDescription", consumables[0].txtDescription);
        setValue("files", consumables[0].arrFilePath.length ? consumables[0].arrFilePath : []);
        setFiles(consumables[0].arrFilePath.length ? consumables[0].arrFilePath.map((item) => { return { preview: item.file } }) : []);
        setValue("chProductTracking", consumables[0].chProductTracking);
        setValue("chCountItem", consumables[0].chCountItem);
        setValue("chSellPrice", consumables[0].chSellPrice);
        setValue("chSalesTax", consumables[0].chSalesTax);

        // setValue("chLastName", customers[0].chLastName);
        // setValue("chPatronymic", customers[0].chPatronymic);

        // setValue("arrAddress", customers[0].arrAddress);

        // setValue("iIdType", customers[0].iIdType);
        // setValue("chNumber", customers[0].chNumber);
        // setValue("chIdentificationNo", customers[0].chIdentificationNo);
        // setValue("chIDepartment", customers[0].chIDepartment);
        // setValue("dIssuedOn", customers[0].dIssuedOn !== "0000-00-00" ? new Date(customers[0].dIssuedOn) : null);
        // setValue("dValidUntil", customers[0].dValidUntil !== "0000-00-00" ? new Date(customers[0].dValidUntil) : null);


        // setValue("chCompanyName", customers[0].chCompanyName);
        // setValue("chBankName", customers[0].chBankName);
        // setValue("chBankNumber", customers[0].chBankNumber);
        // setValue("chBankCode", customers[0].chBankCode);
        // setValue("chIban", customers[0].chIban);
        // setValue("chBic", customers[0].chBic);

        // setValue("arrPhones", customers[0].arrPhones);
        // setValue("iStatus", customers[0].iStatus);
        // setValue("iCategory", customers[0].iCategory);
        // setValue("iDiscount", customers[0].iDiscount);
        // setValue("dDateBirth", customers[0].dDateBirth !== "0000-00-00" ? new Date(customers[0].dDateBirth) : null);
        // setValue("chEmail", customers[0].chEmail);
        // setValue("chWebsite", customers[0].chWebsite);

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

    const handleChangeTrackMethod = (event) => {
        setTrackMethod(event.target.value);
        setValue("chProductTracking", event.target.value);
    }

    const handleSubmitConsumable = (data) => {

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
            //     chTokenConsumable: chTokenConsumable,
            //     chCountItem: data.chProductTracking === "0" ? "0" : data.chCountItem,
            //     filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
            //     filesToRemove: filesToRemove ? filesToRemove : null,
            //     filesToLeave: null,
            //     chTokenCompany: user.chTokenCompany,
            // });

            dispatch(consumablesActions.edit({
                ...data,
                chTokenConsumable: chTokenConsumable,
                chCountItem: data.chProductTracking === "0" ? "0" : data.chCountItem,
                filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
                filesToRemove: filesToRemove ? filesToRemove : null,
                filesToLeave: filesToLeave ? filesToLeave.map(item => ({ file: item })) : null,
                chTokenCompany: user.chTokenCompany,
            }));
        }
        else {

            // console.log({
            //     ...data,
            //     chCountItem: data.chProductTracking === "0" ? "0" : data.chCountItem,
            //     filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
            //     filesToRemove: filesToRemove ? filesToRemove : null,
            //     filesToLeave: null,
            //     chTokenCompany: user.chTokenCompany,
            // });

            dispatch(consumablesActions.add({
                ...data,
                chCountItem: data.chProductTracking === "0" ? "0" : data.chCountItem,
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
                    <HeaderComponent title={actions === "edit" ? `${getValues("chName")}` : "Create a new consumable"} breadcrumbs={breadcrumbs} />
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
                                    label="Consumable name"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Consumable is required."
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
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
                        <Typography variant="body2">
                            Consumable Tracking
                        </Typography>
                        <RadioGroup
                            defaultValue="individual"
                            name="radio-buttons-group"
                            value={trackMethod}
                            onChange={handleChangeTrackMethod}
                            row
                        >
                            <FormControlLabel value="0" control={<Radio />} {...register("chProductTracking")} label="Not tracked" />
                            <FormControlLabel value="1" control={<Radio />} {...register("chProductTracking")} label="Track" />
                        </RadioGroup>
                        <BoxStyled>
                            {
                                trackMethod === "1" &&
                                <FormInputNumber name="chCountItem" control={control} label="Count item" InputProps={{ inputProps: { min: 0, max: 100 } }} />
                            }
                        </BoxStyled>
                        <BoxStyled>
                            <FormInputNumber
                                name="chSellPrice"
                                control={control}
                                label="Price"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    inputProps: { min: 0 },
                                }}
                            />
                        </BoxStyled>
                        <BoxStyled>
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
                                <Button variant="contained" themecolor="rentalThemeSubmit" size="large" onClick={handleSubmit(handleSubmitConsumable)}>
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

export { ConsumableComponent };