import React, { useEffect, useState, Fragment } from 'react';
import { useForm } from "react-hook-form";
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

import { servicesActions, taxesActions } from '../../_actions';

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

const ServiceComponent = ({ chTokenService = "", actions }) => {
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
        }
    });

    const [onSkeleton, setSceleton] = useState(false);
    const [arrCurrentFiles, setFiles] = useState(null); // state в котором хранятся текущие файлы, которые отображаются
    const [removeFiles, setRemoveFiles] = useState([]);
    const [trackMethod, setTrackMethod] = useState("0");

    const user = useSelector(state => state.authentication.user);
    const support = useSelector(state => state.support);
    const services = useSelector(state => state.services);
    const taxes = useSelector(state => state.taxes);
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

        dispatch(taxesActions.load({ chTokenCompany: user.chTokenCompany })); // загружаем налоги

        if (actions === "edit")
            dispatch(servicesActions.loadData({ chTokenCompany: user.chTokenCompany, chTokenService: chTokenService }));
        else
            dispatch(servicesActions.clear());
    }, []);

    useEffect(() => {
        // статус загрузки
        if (actions === "edit")
            if (services !== undefined && services.length != 0) {
                setSceleton(true);
                initialValueEdit(); // инициализация значений
            }
            else
                setSceleton(false);
        if (actions === "add") {
            setSceleton(true);
            initialValueAdd(); // инициализация значений
        }
    }, [support.isLoadingService]);

    const initialValueEdit = () => {

        setValue("chName", services[0].chName);
        setValue("txtDescription", services[0].txtDescription);
        setValue("files", services[0].arrFilePath.length ? services[0].arrFilePath : []);
        setFiles(services[0].arrFilePath.length ? services[0].arrFilePath.map((item) => { return { preview: item.file } }) : []);
        setValue("chSellPrice", services[0].chSellPrice);
        setValue("chSalesTax", services[0].chSalesTax);

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

    const handleSubmitService = (data) => {

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

            dispatch(servicesActions.edit({
                ...data,
                chTokenService: chTokenService,
                filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
                filesToRemove: filesToRemove ? filesToRemove : null,
                filesToLeave: filesToLeave ? filesToLeave.map(item => ({ file: item })) : null,
                chTokenCompany: user.chTokenCompany,
            }));
        }
        else {

            // console.log({
            //     ...data,
            //     filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
            //     filesToRemove: filesToRemove ? filesToRemove : null,
            //     filesToLeave: null,
            //     chTokenCompany: user.chTokenCompany,
            // });

            dispatch(servicesActions.add({
                ...data,
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
                    <HeaderComponent title={actions === "edit" ? `${getValues("chName")}` : "Create a new service"} breadcrumbs={breadcrumbs} />
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
                                    label="Service name"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Service name is required."
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
                        <FormInputNumber
                            name="chSellPrice"
                            control={control}
                            label="Price"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                inputProps: { min: 0 },
                            }}
                        />
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
                                <MenuItem value="">Free Tax</MenuItem>
                                {
                                    taxes.map((item, index) => (
                                        <MenuItem key={index} value={item.chTokenTax}>{item.chName} ({item.chTaxRate}%)</MenuItem>
                                    ))
                                }
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
                                <Button variant="contained" themecolor="rentalThemeSubmit" size="large" onClick={handleSubmit(handleSubmitService)}>
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

export { ServiceComponent };