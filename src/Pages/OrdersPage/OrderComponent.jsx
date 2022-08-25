import React, { useEffect, useState, Fragment } from 'react';
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import MUIRichTextEditor from 'mui-rte';
import { convertToRaw } from 'draft-js'
import { styled } from '@mui/system';

import moment, { months } from 'moment';


import {
    Container,
    Box,
    Paper,
    Grid,
    Typography,
    Avatar,
    Icon,
    IconButton,
    InputAdornment,
    Button,
    Link,
    Skeleton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Autocomplete,
    Tabs,
    Tab,
    CircularProgress
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { categoryActions, bundlesActions, supportActions, inventoryActions, customerActions } from '../../_actions';

import { FormInputText } from "../../_components/FormComponents/FormInputText";
import { FormInputDate } from "../../_components/FormComponents/FormInputDate";
import { FormInputDateTime } from "../../_components/FormComponents/FormInputDateTime";
import { FormInputTime } from "../../_components/FormComponents/FormInputTime";
import { FormInputSelect } from "../../_components/FormComponents/FormInputSelect";
import { DialogSelectCategory } from "../../_components/FormComponents/DialogSelectCategory";

import { FormInputNumber } from "../../_components/FormComponents/FormInputNumber";

import { AutocompleteSearchCustomer } from '../../_components/FormComponents/AutocompleteSearch/AutocompleteSearchCustomer';
import { AutocompleteSearchInventory } from '../../_components/FormComponents/AutocompleteSearch/AutocompleteSearchInventory';
import { AutocompleteSearchServices } from '../../_components/FormComponents/AutocompleteSearch/AutocompleteSearchServices';
import { AutocompleteSearchConsumables } from '../../_components/FormComponents/AutocompleteSearch/AutocompleteSearchConsumables';
import { AutocompleteSearchItem } from '../../_components/FormComponents/AutocompleteSearch/AutocompleteSearchItem';

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

const arrTime = [
    { title: '00:00', value: '00:00' }, { title: '00:15', value: '00:15' }, { title: '00:30', value: '00:30' }, { title: '00:45', value: '00:45' },
    { title: '01:00', value: '01:00' }, { title: '01:15', value: '01:15' }, { title: '01:30', value: '01:30' }, { title: '01:45', value: '01:45' },
    { title: '02:00', value: '02:00' }, { title: '02:15', value: '02:15' }, { title: '02:30', value: '02:30' }, { title: '02:45', value: '02:45' },
    { title: '03:00', value: '03:00' }, { title: '03:15', value: '03:15' }, { title: '03:30', value: '03:30' }, { title: '03:45', value: '03:45' },
    { title: '04:00', value: '04:00' }, { title: '04:15', value: '04:15' }, { title: '04:30', value: '04:30' }, { title: '04:45', value: '04:45' },
    { title: '05:00', value: '05:00' }, { title: '05:15', value: '05:15' }, { title: '05:30', value: '05:30' }, { title: '05:45', value: '05:45' },
    { title: '06:00', value: '06:00' }, { title: '06:15', value: '06:15' }, { title: '06:30', value: '06:30' }, { title: '06:45', value: '06:45' },
    { title: '07:00', value: '07:00' }, { title: '07:15', value: '07:15' }, { title: '07:30', value: '07:30' }, { title: '07:45', value: '07:45' },
    { title: '08:00', value: '08:00' }, { title: '08:15', value: '08:15' }, { title: '08:30', value: '08:30' }, { title: '08:45', value: '08:45' },
    { title: '09:00', value: '09:00' }, { title: '09:15', value: '09:15' }, { title: '09:30', value: '09:30' }, { title: '09:45', value: '09:45' },
    { title: '10:00', value: '10:00' }, { title: '10:15', value: '10:15' }, { title: '10:30', value: '10:30' }, { title: '10:45', value: '10:45' },
    { title: '11:00', value: '11:00' }, { title: '11:15', value: '11:15' }, { title: '11:30', value: '11:30' }, { title: '11:45', value: '11:45' },
    { title: '12:00', value: '12:00' }, { title: '12:15', value: '12:15' }, { title: '12:30', value: '12:30' }, { title: '12:45', value: '12:45' },
    { title: '13:00', value: '13:00' }, { title: '13:15', value: '13:15' }, { title: '13:30', value: '13:30' }, { title: '13:45', value: '13:45' },
    { title: '14:00', value: '14:00' }, { title: '14:15', value: '14:15' }, { title: '14:30', value: '14:30' }, { title: '14:45', value: '14:45' },
    { title: '15:00', value: '15:00' }, { title: '15:15', value: '15:15' }, { title: '15:30', value: '15:30' }, { title: '15:45', value: '15:45' },
    { title: '16:00', value: '16:00' }, { title: '16:15', value: '16:15' }, { title: '16:30', value: '16:30' }, { title: '16:45', value: '16:45' },
    { title: '17:00', value: '17:00' }, { title: '17:15', value: '17:15' }, { title: '17:30', value: '17:30' }, { title: '17:45', value: '17:45' },
    { title: '18:00', value: '18:00' }, { title: '18:15', value: '18:15' }, { title: '18:30', value: '18:30' }, { title: '18:45', value: '18:45' },
    { title: '19:00', value: '19:00' }, { title: '19:15', value: '19:15' }, { title: '19:30', value: '19:30' }, { title: '19:45', value: '19:45' },
    { title: '20:00', value: '20:00' }, { title: '20:15', value: '20:15' }, { title: '20:30', value: '20:30' }, { title: '20:45', value: '20:45' },
    { title: '21:00', value: '21:00' }, { title: '21:15', value: '21:15' }, { title: '21:30', value: '21:30' }, { title: '21:45', value: '21:45' },
    { title: '22:00', value: '22:00' }, { title: '22:15', value: '22:15' }, { title: '22:30', value: '22:30' }, { title: '22:45', value: '22:45' },
    { title: '23:00', value: '23:00' }, { title: '23:15', value: '23:15' }, { title: '23:30', value: '23:30' }, { title: '23:45', value: '23:45' },

]

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            fontSize: '1.00rem',
        },
        children: `${name.replace(/ +(?= )/g, '').split(' ')[0][0]}${name.replace(/ +(?= )/g, '').split(' ')[1][0]}`,
    };
}

function getDateTime(dDateTime, type, addMin) {

    var start = moment();
    if (dDateTime) start = moment(dDateTime);

    const remainder = 15 - start.minute() % 15 + addMin;
    const dateReturn = moment(start).add(remainder, "minutes").format("YYYY-MM-DD");
    const timeReturn = moment(start).add(remainder, "minutes").format("HH:mm");

    if (type === 1) return dateReturn + 'T' + timeReturn;
    else return timeReturn


    // var now = new Date();
    // if (dDateTime) now = new Date(dDateTime);

    // var year = now.getFullYear();
    // var month = now.getMonth() + 1;
    // var day = now.getDate();
    // var hour = now.getHours();
    // var minute = now.getMinutes();
    // if (month.toString().length == 1) {
    //     month = '0' + month;
    // }
    // if (day.toString().length == 1) {
    //     day = '0' + day;
    // }
    // if (hour.toString().length == 1) {
    //     hour = '0' + hour;
    // }
    // if (minute.toString().length == 1) {
    //     minute = '0' + minute;
    // }

    // var dateTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
    // return dateTime;
}


function getTimeForSelect(dDateTime) {

    const start = moment();
    const remainder = 15 - start.minute() % 15;
    const dateReturn = moment(start).add("minutes", remainder).format("YYYY-MM-DD");
    const timeReturn = moment(start).add("minutes", remainder).format("HH:mm a");


    //console.log("---", dateReturn + 'T' + timeReturn);

    return "";
}


function addHours(numOfHours, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
}

function addDays(numOfDays, date = new Date()) {
    date.setDate(date.getDate() + numOfDays);
    return date;
}

function addMonths(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() + numOfMonths);
    return date;
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

const OrderComponent = ({ chTokenBundle = "", actions }) => {
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
            dPickup: getDateTime("", 1, 0),
            tPickup: getDateTime("", 2, 0),
            dReturn: getDateTime("", 1, 60),
            tReturn: getDateTime("", 2, 60),
            arrInventory: [],
            arrItem: [],
            arrServices: [],
            arrConsumables: [],
            chCategoryName: "",
            txtDescription: "",
            chYourSKU: ""
        }
    });

    const {
        fields: arrItemFields,
        append: arrItemAppend,
        remove: arrItemRemove,
    } = useFieldArray({
        control,
        name: "arrItem",
    });

    const [onSkeleton, setSceleton] = useState(false);
    const [arrCurrentFiles, setFiles] = useState(null); // state в котором хранятся текущие файлы, которые отображаются
    const [removeFiles, setRemoveFiles] = useState([])
    const [selectedCategory, setCategory] = useState("");
    const [selectedCustomer, setCustomer] = useState("");
    const [open, setOpen] = React.useState(false);
    const [tagsInventory, setTag] = useState([]);
    const [arrPrice, setPrice] = useState([]);

    const [currentTab, setTab] = useState(0);
    const [currentDuration, setDuration] = useState([]);

    const user = useSelector(state => state.authentication.user);
    const support = useSelector(state => state.support);
    const category = useSelector(state => state.category);
    const bundles = useSelector(state => state.bundles);

    const dispatch = useDispatch();

    const toCurrency = new Intl.NumberFormat("be", {
        style: "currency",
        currency: "BYN",

    });

    const arrItem = useWatch({
        control,
        name: "arrItem"
    });


    /// отслеживаем изменение даты и времени
    const dReturn = useWatch({
        control,
        name: "dReturn",
    });

    const dPickup = useWatch({
        control,
        name: "dPickup",
    });

    const tPickup = useWatch({
        control,
        name: "tPickup",
    });

    const tReturn = useWatch({
        control,
        name: "tReturn",
    });
    //


    const [anchorEl, setAnchorEl] = React.useState(null);
    const openDuration = Boolean(anchorEl);
    const handleClickDuration = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseDuration = () => {
        setAnchorEl(null);
    };

    const TableLabel = styled('div')({
        fontSize: '0.80rem',
        color: 'rgb(39, 44, 52)',
        fontWeight: '700',
    });

    const TableText = styled('div')({
        fontSize: '0.60rem',
        color: 'rgb(39, 44, 52)',
        fontWeight: '400',
    });


    const LabelCustomer = styled('div')({
        fontSize: '1.20rem',
        color: 'rgb(39, 44, 52)',
        fontWeight: '700',
    });

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

    // меняем переиод при изменении даты или времени
    useEffect(() => {
        setDuration([
            { ...fnCalculatePeriod("months") },
            { ...fnCalculatePeriod("weeks") },
            { ...fnCalculatePeriod("days") },
            { ...fnCalculatePeriod("hours") },
        ])
    }, [dPickup, dReturn]);

    useEffect(() => {
        setValue("dPickup", moment(dPickup).format("YYYY-MM-DD") + "T" + tPickup)
    }, [tPickup]);

    useEffect(() => {
        setValue("dReturn", moment(dReturn).format("YYYY-MM-DD") + "T" + tReturn)
    }, [tReturn]);


    /// отслеживаем изменения в таблице продуктов и всё пересчитываем
    useEffect(() => {
        //console.log(arrItem);
        arrItem.map((item, index) => {
            if (item.iType === "1") {

            }
            else {
                const value = Number(item.chQuantity) * Number(item.chAppliedRate) * Number(item.chDuration !== "" ? item.chDuration : 1) * Number(item.chDiscount === "0" ? 1 : (100 - item.chDiscount) / 100);
                // пересчитываем цены
                setPrice(state => {
                    return state.map(x => {
                        return x.chToken === item.chToken ? { ...x, chPrice: value } : x
                    })
                });
            }
        })

    }, [arrItem])

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

    const fnCalculatePeriod = (type) => {

        var a = moment(dPickup);
        var b = moment(dReturn);

        var iMonth = 0;
        if (type === "months" && type !== "weeks" && type !== "days" && type !== "hours") {
            iMonth = b.diff(a, 'months');
            if (iMonth > 0) { // между датами больше месяца
                // прибавляем к начальной дате месяцы
                a = moment(a).add(iMonth, "M");
            }
        }

        var iWeeks = 0;
        if ((type === "weeks" && type !== "days" && type !== "hours") || type === "months") {
            iWeeks = b.diff(a, 'weeks');
            if (iWeeks > 0) { // между датами больше недели
                a = moment(a).add(iWeeks, "w");
            }
        }

        var iDays = 0;
        if ((type === "days" && type !== "hours") || type === "months" || type === "weeks") {
            iDays = b.diff(a, 'days');
            if (iDays > 0) { // между датами больше одного дня
                a = moment(a).add(iDays, "d");
            }
        }

        var iHours = b.diff(a, 'hours', true);

        return {
            months: iMonth,
            weeks: iWeeks,
            days: iDays,
            hours: iHours
        }
    }

    const fnCalculateDurationItem = (item) => {
        console.log(item.chTariff.arrTariffDetail);

        let rentalType = 0; // тип аренды (помесячная, еженедельная, ежедневная, почасовая)
        const periodMonths = "4";
        const periodWeeks = "3";
        const periodDays = "2";


        if (typeof item.chTariff.arrTariffDetail.find(elem => elem.period === periodMonths) === 'undefined') {
            if (typeof item.chTariff.arrTariffDetail.find(elem => elem.period === periodWeeks) === 'undefined') {
                if (typeof item.chTariff.arrTariffDetail.find(elem => elem.period === periodDays) === 'undefined') {
                    rentalType = "hours"
                    return `${currentDuration[3].hours} hours`
                } else {
                    // days
                    return `${currentDuration[2].days} days ${currentDuration[2].hours} hours`
                }
            } else {
                // weeks
                return `${currentDuration[1].weeks} weeks ${currentDuration[1].days} days ${currentDuration[1].hours} hours`
            }
        } else {
            // months
            return `${currentDuration[0].months} months ${currentDuration[0].weeks} weeks ${currentDuration[0].days} days ${currentDuration[0].hours} hours`
        }
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

    const handleAddItem = (itemSelected) => {
        console.log(itemSelected);

        switch (itemSelected.iType) {
            // inventory
            case "1": {



                arrItemAppend({
                    chToken: itemSelected.chToken,
                    iType: itemSelected.iType,
                    chName: itemSelected.chName,
                    chQuantity: "1",
                    chDiscount: "0",
                    chAppliedRate: itemSelected.chTariff,
                    chDuration: fnCalculateDurationItem(itemSelected),
                });

                setPrice(oldPrice => [
                    ...oldPrice,
                    {
                        chToken: itemSelected.chToken,
                        chPrice: "0"
                    }
                ]);

                // setPrice(oldPrice => [
                //     ...oldPrice,
                //     {
                //         chToken: itemSelected.chToken,
                //         chPrice: itemSelected.chSellPrice
                //     }
                // ]);

            } break;


            // consumables
            case "2": {
                arrItemAppend({
                    chToken: itemSelected.chToken,
                    iType: itemSelected.iType,
                    chName: itemSelected.chName,
                    chQuantity: "1",
                    chDiscount: "0",
                    chAppliedRate: itemSelected.chSellPrice,
                    chDuration: "",
                });

                setPrice(oldPrice => [
                    ...oldPrice,
                    {
                        chToken: itemSelected.chToken,
                        chPrice: itemSelected.chSellPrice
                    }
                ]);

            } break;
            // services
            case "4": {
                arrItemAppend({
                    chToken: itemSelected.chToken,
                    iType: itemSelected.iType,
                    chName: itemSelected.chName,
                    chQuantity: "1",
                    chDiscount: "0",
                    chAppliedRate: itemSelected.chSellPrice,
                    chDuration: "",

                });

                setPrice(oldPrice => [
                    ...oldPrice,
                    {
                        chToken: itemSelected.chToken,
                        chPrice: itemSelected.chSellPrice
                    }
                ]);

            } break;

            default: {
                arrItemAppend({
                    chToken: itemSelected.chToken,
                    iType: itemSelected.iType,
                    chName: itemSelected.chName,
                    chQuantity: "1",
                    chDiscount: "0",
                    chAppliedRate: "0",
                    chDuration: "0",

                });

                setPrice(oldPrice => [
                    ...oldPrice,
                    {
                        chToken: itemSelected.chToken,
                        chPrice: "0"
                    }
                ]);
            }

        }

    }

    const handleAddCustomer = (customerSelected) => {
        setCustomer(customerSelected);
    }

    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    }

    const handleAddDuration = (duration) => {
        switch (duration) {
            case "1 hour": {
                setValue("tReturn", moment(getValues("dReturn")).add(1, "h").format("HH:mm"));
                setValue("dReturn", moment(getValues("dReturn")).add(1, "h"))
            } break;
            case "1 day": {
                setValue("dReturn", moment(getValues("dReturn")).add(1, "d"))
            } break;
            case "1 week": {
                setValue("dReturn", moment(getValues("dReturn")).add(1, "w"))
            } break;
            case "2 weeks": {
                setValue("dReturn", moment(getValues("dReturn")).add(2, "w"))
            } break;
            case "1 month": {
                setValue("dReturn", moment(getValues("dReturn")).add(1, "M"))
            } break;
            case "2 months": {
                setValue("dReturn", moment(getValues("dReturn")).add(2, "M"))
            } break;
        }
        setAnchorEl(null);
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
                    <HeaderComponent title={actions === "edit" ? `${getValues("chName")}` : "Create a new order"} breadcrumbs={breadcrumbs} />
                    : <Skeleton width="50%" />
                }
            </BoxStyledTitle>

            <Paper variant="titleTabDatagridWhite">
                <div style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0px',
                }}>
                    <Tabs value={currentTab} onChange={handleChangeTab}>
                        <Tab disableTouchRipple label={`Details`} />
                        <Tab disableTouchRipple label={`Payments`} />
                        <Tab disableTouchRipple label={`Documents`} />
                        <Tab disableTouchRipple label={`History`} />
                    </Tabs>
                    <Stack direction="row" justifyContent="end">
                        <IconButton aria-label="delete">
                            <Icon baseClassName="fas" className="fa-file-excel" fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <Icon baseClassName="fas" className="fa-file-pdf" fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="add an alarm">
                            <Icon baseClassName="fas" className="fa-file-csv" fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="add an alarm">
                            <Icon baseClassName="fas" className="fa-file-import" fontSize="small" />
                        </IconButton>
                    </Stack>
                </div>
            </Paper>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={0} variant="mainMargin">
                        <BoxClear>
                            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                <Grid item xs={12} sm={12} md={12}>
                                    {
                                        selectedCustomer ?
                                            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                                <Grid item xs={12} sm={1} md={1} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                    <Avatar {...stringAvatar(`${selectedCustomer.chFirstName} ${selectedCustomer.chLastName}`)} />
                                                </Grid>
                                                <Grid item xs={12} sm={5} md={10} style={{ justifyContent: "left", alignItems: "center", display: "flex", }}>
                                                    <LabelCustomer>
                                                        {`${selectedCustomer.chFirstName} ${selectedCustomer.chLastName}`}
                                                    </LabelCustomer>
                                                </Grid>
                                                <Grid item xs={12} sm={1} md={1} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                    <IconButton aria-label="del" onClick={() => { setCustomer('') }}>
                                                        <CloseIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid> :
                                            <AutocompleteSearchCustomer
                                                id="inv"
                                                key="inv5566"
                                                fnAddToOrder={handleAddCustomer}
                                                labelTitle="Search customer"
                                            />
                                    }
                                </Grid>
                            </Grid>
                        </BoxClear>
                    </Paper>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={0} variant="mainMargin">
                                <Typography variant="body2">
                                    Pickup
                                </Typography>
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
                                                label="Locations"
                                            />
                                        )}
                                    />
                                </BoxStyled>
                                <BoxStyled>
                                    <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <FormInputDateTime
                                                label="Rent Out Date"
                                                name="dPickup"
                                                type="datetime-local"
                                                control={control}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <FormInputSelect
                                                label="Rent Out Time"
                                                name="tPickup"
                                                control={control}
                                                id="rentalLocation"
                                                defaultValue=""
                                                variant="outlined"
                                                margin="normal"
                                                labelId="rental-pickup-time"
                                            >
                                                <MenuItem value="">Select</MenuItem>
                                                {
                                                    arrTime.map((item) => (
                                                        <MenuItem key={item.value} value={item.value}>{item.title}</MenuItem>
                                                    ))
                                                }
                                            </FormInputSelect>

                                        </Grid>
                                    </Grid>
                                </BoxStyled>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={0} variant="mainMargin">
                                <Typography variant="body2">
                                    Return
                                </Typography>
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
                                                label="Locations"
                                            />
                                        )}
                                    />
                                </BoxStyled>
                                <BoxStyled>
                                    <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                        <Grid item xs={12} sm={5} md={5}>
                                            <FormInputDateTime
                                                label="Expected Return Date"
                                                name="dReturn"
                                                type="datetime-local"
                                                control={control}
                                                InputProps={{
                                                    min: "2011-02-20T20:20",
                                                    max: "2031-02-20T20:20"
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={5} md={5}>
                                            <FormInputSelect
                                                label="Expected Return Time"
                                                name="tReturn"
                                                control={control}
                                                id="rentalLocation"
                                                defaultValue=""
                                                variant="outlined"
                                                margin="normal"
                                                labelId="rental-return-time"
                                            >
                                                <MenuItem value="">Select</MenuItem>
                                                {
                                                    arrTime.map((item) => (
                                                        <MenuItem key={item.value} value={item.value}>{item.title}</MenuItem>
                                                    ))
                                                }
                                            </FormInputSelect>
                                        </Grid>
                                        <Grid item xs={12} sm={2} md={2} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                            <Button
                                                id="basic-button"
                                                aria-controls={openDuration ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openDuration ? 'true' : undefined}
                                                onClick={handleClickDuration}
                                                variant="contained"
                                                themecolor="rentalTheme"
                                                size="large"
                                            >
                                                <AddIcon />
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={openDuration}
                                                onClose={handleCloseDuration}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={() => handleAddDuration("1 hour")}>1 hour</MenuItem>
                                                <MenuItem onClick={() => handleAddDuration("1 day")}>1 day</MenuItem>
                                                <MenuItem onClick={() => handleAddDuration("1 week")}>1 week</MenuItem>
                                                <MenuItem onClick={() => handleAddDuration("2 weeks")}>2 weeks</MenuItem>
                                                <MenuItem onClick={() => handleAddDuration("1 month")}>1 month</MenuItem>
                                                <MenuItem onClick={() => handleAddDuration("2 months")}>2 months</MenuItem>
                                            </Menu>
                                        </Grid>
                                    </Grid>
                                </BoxStyled>
                            </Paper>

                        </Grid>
                    </Grid>
                    <Paper elevation={0} variant="mainMargin">
                        <BoxClear>
                            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <AutocompleteSearchItem
                                        id="inv"
                                        key="inv5566"
                                        fnAddToOrder={handleAddItem}
                                        labelTitle="Search to add products"
                                    />
                                </Grid>
                            </Grid>
                            {
                                arrItemFields.length ?
                                    <BoxStyled>
                                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 24, md: 24 }}>
                                            <Grid item xs={12} sm={7} md={7}>
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>Duration</TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>Applied rate</TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>Quantity</TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>Discount</TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>Price</TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={2} md={2}>
                                            </Grid>
                                        </Grid>
                                    </BoxStyled> :
                                    <EmptyData title="This order is empty." subtitle="Please add some products." size="200px" />
                            }

                            {
                                arrItemFields.map((item, index) => (
                                    <BoxStyledBorderTop key={item.id}>
                                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 24, md: 24 }}>
                                            <Grid item xs={12} sm={7} md={7} style={{ justifyContent: "left", alignItems: "center", display: "flex", }}>
                                                <TableLabel>{item.chName}</TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>{item.chDuration}</TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>
                                                    {
                                                        typeof item.chAppliedRate.arrTariffDetail !== 'undefined' ?
                                                            item.chAppliedRate.arrTariffDetail.map((item, index) => (
                                                                <TableText key={index}>
                                                                    {item.label} - {toCurrency.format(item.price)}
                                                                </TableText>
                                                            )) :
                                                            <TableText>{toCurrency.format(item.chAppliedRate)}</TableText>
                                                    }
                                                </TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3}>
                                                <FormInputNumber
                                                    name={`arrItem[${index}].chQuantity`}
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
                                            <Grid item xs={12} sm={3} md={3}>
                                                <FormInputNumber
                                                    name={`arrItem[${index}].chDiscount`}
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

                                            <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>{toCurrency.format(arrPrice.find(o => o.chToken === item.chToken).chPrice)}</TableLabel>
                                            </Grid>

                                            <Grid item xs={12} sm={2} md={2} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <IconButton aria-label="del" onClick={() => arrItemRemove(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </BoxStyledBorderTop>
                                ))
                            }
                            {
                                arrItemFields.length &&
                                <BoxStyledBorderTop>
                                    <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                        <Grid item xs={12} sm={7} md={7}>
                                        </Grid>
                                        <Grid item xs={12} sm={2} md={2} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                            <TableLabel>SubTotal</TableLabel>
                                        </Grid>
                                        <Grid item xs={11} sm={2} md={2} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                            <TableLabel>Discount</TableLabel>
                                        </Grid>
                                        <Grid item xs={12} sm={1} md={1}>
                                        </Grid>
                                    </Grid>
                                </BoxStyledBorderTop>
                            }

                        </BoxClear>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={0} variant="mainMargin">
                        <FormInputText
                            name="chYourSKU"
                            control={control}
                            label="Identification Number"
                        />
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
                    </Paper>
                    <Paper elevation={0} variant="mainMargin">
                        <Typography variant="body2">
                            Notes
                        </Typography>
                        <BoxStyled>
                            <FormInputText
                                name="chYourSKU"
                                control={control}
                                label="Add a new note..."
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
                                <Button variant="contained" themecolor="rentalThemeSubmit" size="large" onClick={handleSubmit(handleSubmitBundle)}>
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

export { OrderComponent };