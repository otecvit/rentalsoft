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
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { categoryActions, tariffsActions, supportActions, inventoryActions, customerActions } from '../../_actions';

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

const CustomerComponent = ({ chTokenCustomer = "", actions }) => {
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
            chFirstName: "",
            chLastName: "",
            chPatronymic: "",
            arrAddress: [{
                chName: "Main address",
                chAddressLine1: "",
                chAddressLine2: "",
                chCity: "",
                chState: "",
                chZipcode: "",
                chCountry: "",
            }],
            iIdType: "1",
            chNumber: "",
            chIdentificationNo: "",
            chIDepartment: "",
            dIssuedOn: null,
            dValidUntil: null,
            txtDescription: "",
            chCompanyName: "",
            chBankName: "",
            chBankNumber: "",
            chBankCode: "",
            chIban: "",
            chBic: "",
            arrPhones: [{ chPhone: "" }],
            iStatus: "1",
            iCategory: '2',
            iDiscount: "0",
            dDateBirth: null,
            chEmail: "",
            chWebsite: "",
        }
    });

    const {
        fields: arrAddressFields,
        append: arrAddressAppend,
        remove: arrAddressRemove,
    } = useFieldArray({
        control,
        name: "arrAddress",
    });

    const {
        fields: arrPhonesFields,
        append: arrPhonesAppend,
        remove: arrPhonesRemove,
    } = useFieldArray({
        control,
        name: "arrPhones",
    });

    const [onSkeleton, setSceleton] = useState(false);
    const [arrCurrentFiles, setFiles] = useState(null); // state в котором хранятся текущие файлы, которые отображаются
    const [removeFiles, setRemoveFiles] = useState([])
    const [expanded, setExpanded] = useState('panel0');

    const user = useSelector(state => state.authentication.user);
    const support = useSelector(state => state.support);
    const customers = useSelector(state => state.customers);
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
            dispatch(customerActions.loadDataCustomer({ chTokenCompany: user.chTokenCompany, chTokenCustomer: chTokenCustomer }));

        else
            dispatch(customerActions.clearCustomerState());
    }, []);

    useEffect(() => {
        // статус загрузки
        if (actions === "edit")
            if (customers !== undefined && customers.length != 0) {
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

        setValue("chFirstName", customers[0].chFirstName);
        setValue("chLastName", customers[0].chLastName);
        setValue("chPatronymic", customers[0].chPatronymic);

        setValue("arrAddress", customers[0].arrAddress);

        setValue("iIdType", customers[0].iIdType);
        setValue("chNumber", customers[0].chNumber);
        setValue("chIdentificationNo", customers[0].chIdentificationNo);
        setValue("chIDepartment", customers[0].chIDepartment);
        setValue("dIssuedOn", customers[0].dIssuedOn !== "0000-00-00" ? new Date(customers[0].dIssuedOn) : null);
        setValue("dValidUntil", customers[0].dValidUntil !== "0000-00-00" ? new Date(customers[0].dValidUntil) : null);

        setValue("txtDescription", customers[0].txtDescription);
        setValue("files", customers[0].arrFilePath.length ? customers[0].arrFilePath : []);
        setFiles(customers[0].arrFilePath.length ? customers[0].arrFilePath.map((item) => { return { preview: item.file } }) : []);

        setValue("chCompanyName", customers[0].chCompanyName);
        setValue("chBankName", customers[0].chBankName);
        setValue("chBankNumber", customers[0].chBankNumber);
        setValue("chBankCode", customers[0].chBankCode);
        setValue("chIban", customers[0].chIban);
        setValue("chBic", customers[0].chBic);

        setValue("arrPhones", customers[0].arrPhones);
        setValue("iStatus", customers[0].iStatus);
        setValue("iCategory", customers[0].iCategory);
        setValue("iDiscount", customers[0].iDiscount);
        setValue("dDateBirth", customers[0].dDateBirth !== "0000-00-00" ? new Date(customers[0].dDateBirth) : null);
        setValue("chEmail", customers[0].chEmail);
        setValue("chWebsite", customers[0].chWebsite);

    }

    const initialValueAdd = () => {
        setFiles([]);
    }

    const handleAddAdress = () => {
        arrAddressAppend({
            chName: "Name address",
            chAddressLine1: "",
            chAddressLine2: "",
            chCity: "",
            chState: "",
            chZipcode: "",
            chCountry: "",
        });
    }

    const handleAddPhone = () => {
        arrPhonesAppend({
            chPhone: ""
        });
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

    const handleChangeAccordion = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const convertDate = (str) => {
        const mnths = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12"
        },
            date = str.split(" ");

        return [date[3], mnths[date[1]], date[2]].join("-");
    }


    const handleSubmitCustomer = (data) => {

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
            //     chTokenCustomer: chTokenCustomer,
            //     dIssuedOn: data.dIssuedOn ? convertDate(data.dIssuedOn.toString()) : null,
            //     dValidUntil: data.dValidUntil ? convertDate(data.dValidUntil.toString()) : null,
            //     dDateBirth: data.dDateBirth ? convertDate(data.dDateBirth.toString()) : null,
            //     filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
            //     filesToRemove: filesToRemove ? filesToRemove : null,
            //     filesToLeave: filesToLeave ? filesToLeave.map(item => ({ file: item })) : null,
            //     chTokenCompany: user.chTokenCompany,
            // });

            dispatch(customerActions.edit({
                ...data,
                chTokenCustomer: chTokenCustomer,
                dIssuedOn: data.dIssuedOn ? convertDate(data.dIssuedOn.toString()) : null,
                dValidUntil: data.dValidUntil ? convertDate(data.dValidUntil.toString()) : null,
                dDateBirth: data.dDateBirth ? convertDate(data.dDateBirth.toString()) : null,
                filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
                filesToRemove: filesToRemove ? filesToRemove : null,
                filesToLeave: filesToLeave ? filesToLeave.map(item => ({ file: item })) : null,
                chTokenCompany: user.chTokenCompany,
            }));
        }
        else {

            // console.log({
            //     ...data,
            //     dIssuedOn: convertDate(data.dIssuedOn.toString()),
            //     dValidUntil: convertDate(data.dValidUntil.toString()),
            //     dDateBirth: convertDate(data.dDateBirth.toString()),
            //     filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
            //     filesToRemove: filesToRemove ? filesToRemove : null,
            //     filesToLeave: null,
            //     chTokenCompany: user.chTokenCompany,
            // });

            dispatch(customerActions.add({
                ...data,
                dIssuedOn: data.dIssuedOn ? convertDate(data.dIssuedOn.toString()) : null,
                dValidUntil: data.dValidUntil ? convertDate(data.dValidUntil.toString()) : null,
                dDateBirth: data.dDateBirth ? convertDate(data.dDateBirth.toString()) : null,
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
                    <HeaderComponent title={actions === "edit" ? `${getValues("chFirstName")} ${getValues("chLastName")}` : "Create a new customer"} breadcrumbs={breadcrumbs} />
                    : <Skeleton width="50%" />
                }
            </BoxStyledTitle>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={0} variant="main">
                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                            <Grid item xs={12} sm={4} md={4}>
                                <FormInputText
                                    name="chFirstName"
                                    control={control}
                                    label="First name"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "First name is required."
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <FormInputText
                                    name="chLastName"
                                    control={control}
                                    label="Last name"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Last name is required."
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <FormInputText name="chPatronymic" control={control} label="Patronymic" />
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={0} variant="mainMargin">
                        <BoxClear>
                            {
                                arrAddressFields.map((item, index) => (
                                    <Accordion key={item.id} expanded={expanded === `panel${index}`} onChange={handleChangeAccordion(`panel${index}`)}>
                                        <AccordionSummary

                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3bh-content"
                                            id="panel3bh-header"
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                {getValues(`arrAddress[${index}].chName`)}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {
                                                index > 0 &&
                                                <BoxStyled>
                                                    <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                                        <Grid item xs={12} sm={12} md={12}>
                                                            <FormInputText name={`arrAddress[${index}].chName`} control={control} label="Address name" defaultValue={item.name} />
                                                        </Grid>
                                                    </Grid>
                                                </BoxStyled>
                                            }
                                            <BoxStyled sx={index === 0 && { marginTop: '13px' }}>
                                                <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 3 }}>
                                                    <Grid item xs={12} sm={6} md={1}>
                                                        <FormInputText name={`arrAddress[${index}].chAddressLine1`} control={control} label="Address Line 1" defaultValue={item.name} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={1}>
                                                        <FormInputText name={`arrAddress[${index}].chAddressLine2`} control={control} label="Address Line 2" defaultValue={item.name} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={1}>
                                                        <FormInputText name={`arrAddress[${index}].chCity`} control={control} label="City" defaultValue={item.name} />
                                                    </Grid>
                                                </Grid>
                                            </BoxStyled>
                                            <BoxStyled>
                                                <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 3 }}>
                                                    <Grid item xs={12} sm={6} md={1}>
                                                        <FormInputText name={`arrAddress[${index}].chState`} control={control} label="State" defaultValue={item.name} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={1}>
                                                        <FormInputText name={`arrAddress[${index}].chZipcode`} control={control} label="Zipcode" defaultValue={item.name} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={1}>
                                                        <FormInputText name={`arrAddress[${index}].chCountry`} control={control} label="Country" defaultValue={item.name} />
                                                    </Grid>
                                                </Grid>
                                            </BoxStyled>
                                            {
                                                index > 0 &&
                                                <BoxStyled>
                                                    <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 4 }}>
                                                        <Grid item xs={12} sm={1} md={1}>
                                                            <Button variant="contained" themecolor="rentalTheme" size="large" onClick={() => arrAddressRemove(index)}>
                                                                Delete address
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </BoxStyled>}
                                        </AccordionDetails>
                                    </Accordion>
                                ))
                            }
                        </BoxClear>
                        <BoxStyled>
                            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                <Grid item xs={12} sm={4} md={4} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                    <Button variant="contained" themecolor="rentalTheme" size="large" onClick={handleAddAdress}>
                                        Add address
                                    </Button>
                                </Grid>
                            </Grid>
                        </BoxStyled>
                    </Paper>
                    <Paper elevation={0} variant="mainMargin">
                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 3 }}>
                            <Grid item xs={12} sm={3} md={1}>
                                <FormInputSelect
                                    id="iIdType"
                                    name="iIdType"
                                    control={control}
                                    defaultValue=""
                                    variant="outlined"
                                    margin="normal"
                                    label="ID Type"
                                    labelId="id-type-label-id"
                                >
                                    <MenuItem value="1">ID Card</MenuItem>
                                    <MenuItem value="2">Passport</MenuItem>
                                    <MenuItem value="3">Driver License</MenuItem>
                                    <MenuItem value="4">Other</MenuItem>
                                </FormInputSelect>
                            </Grid>
                            <Grid item xs={12} sm={3} md={1}>
                                <FormInputText
                                    name="chNumber"
                                    control={control}
                                    label="Number"
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={1}>
                                <FormInputText
                                    name="chIdentificationNo"
                                    control={control}
                                    label="Identification No."
                                />
                            </Grid>
                        </Grid>
                        <BoxStyled>
                            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 3 }}>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputText
                                        name="chIDepartment"
                                        control={control}
                                        label="Department"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputDate
                                        name="dIssuedOn"
                                        control={control}
                                        label="Issued on"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputDate
                                        name="dValidUntil"
                                        control={control}
                                        label="Valid until"
                                    />
                                </Grid>
                            </Grid>
                        </BoxStyled>
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
                    <Paper elevation={0} variant="mainMargin">
                        <BoxStyled>
                            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 3 }}>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputText
                                        name="chCompanyName"
                                        control={control}
                                        label="Company name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputText
                                        name="chBankName"
                                        control={control}
                                        label="Bank Account Name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputText
                                        name="chBankNumber"
                                        control={control}
                                        label="Bank Account Number"
                                    />
                                </Grid>
                            </Grid>
                        </BoxStyled>
                        <BoxStyled>
                            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 3 }}>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputText
                                        name="chBankCode"
                                        control={control}
                                        label="Bank code"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputText
                                        name="chIban"
                                        control={control}
                                        label="Iban"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputText
                                        name="chBic"
                                        control={control}
                                        label="Bic"
                                    />
                                </Grid>
                            </Grid>
                        </BoxStyled>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={0} variant="main">
                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                            {
                                arrPhonesFields.map((item, index) => (
                                    <Fragment key={item.id}>
                                        <Grid item xs={12} sm={6} md={11}>
                                            <FormInputText name={`arrPhones[${index}].chPhone`} control={control} label="Phone" defaultValue={item.chPhone} />
                                        </Grid>
                                        <Grid item xs={12} sm={1} md={1} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                            {
                                                index < arrPhonesFields.length - 1 ?
                                                    <IconButton aria-label="del" onClick={() => arrPhonesRemove(index)}>
                                                        <DeleteIcon />
                                                    </IconButton> :
                                                    <IconButton aria-label="add" onClick={handleAddPhone}>
                                                        <AddIcon />
                                                    </IconButton>
                                            }
                                        </Grid>
                                    </Fragment>
                                ))
                            }
                        </Grid>
                    </Paper>
                    <Paper elevation={0} variant="mainMargin">
                        <FormInputSelect
                            id="iStatus"
                            name="iStatus"
                            control={control}
                            defaultValue=""
                            variant="outlined"
                            margin="normal"
                            label="Status"
                            labelId="status-label-id"
                        >
                            <MenuItem value="1">Active</MenuItem>
                            <MenuItem value="2">Inactive</MenuItem>
                        </FormInputSelect>
                        <BoxStyled>
                            <FormInputSelect
                                id="iCategory"
                                name="iCategory"
                                control={control}
                                variant="outlined"
                                defaultValue=""
                                margin="normal"
                                label="Category"
                                labelId="category-label-id"
                            >
                                <MenuItem value="1">Good</MenuItem>
                                <MenuItem value="2">Neutral</MenuItem>
                                <MenuItem value="3">Bad</MenuItem>
                            </FormInputSelect>
                        </BoxStyled>
                        <BoxStyled>
                            <FormInputNumber
                                name="iDiscount"
                                control={control}
                                label="Discount"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    inputProps: { min: 0 },
                                }}
                            />
                        </BoxStyled>
                    </Paper>
                    <Paper elevation={0} variant="mainMargin">
                        <FormInputDate
                            name="dDateBirth"
                            control={control}
                            label="Date of birth"
                        />
                        <BoxStyled>
                            <FormInputText
                                name="chEmail"
                                control={control}
                                label="E-mail"
                            />
                        </BoxStyled>
                        <BoxStyled>
                            <FormInputText
                                name="chWebsite"
                                control={control}
                                label="Website"
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
                                <Button variant="contained" themecolor="rentalThemeSubmit" size="large" onClick={handleSubmit(handleSubmitCustomer)}>
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

export { CustomerComponent };