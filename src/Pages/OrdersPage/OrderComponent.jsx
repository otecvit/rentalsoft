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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { categoryActions, bundlesActions, supportActions, inventoryActions, customerActions, taxesActions } from '../../_actions';

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
import BoxStyledBorderTopDashed from '../../_components/StyledComponent/BoxStyledBorderTopDashed';
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


}


const OrderComponent = ({ chTokenBundle = "", actions }) => {
    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        watch,
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
            chAllDiscount: "0",
            chTotalBeforeTax: "0",
            chTotalAfterTax: "0",
            chCategoryName: "",
            txtDescription: "",
            chYourSKU: ""
        }
    });

    const {
        fields: arrItemFields,
        append: arrItemAppend,
        remove: arrItemRemove,
        update: arrItemUpdate,
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
    const [arrTax, setTaxArr] = useState([]);

    const [currentTab, setTab] = useState(0);
    const [currentDuration, setDuration] = useState([]);

    const user = useSelector(state => state.authentication.user);
    const support = useSelector(state => state.support);
    const category = useSelector(state => state.category);
    const bundles = useSelector(state => state.bundles);
    const taxes = useSelector(state => state.taxes);

    const dispatch = useDispatch();

    const toCurrency = new Intl.NumberFormat("be", {
        style: "currency",
        currency: "BYN",

    });

    const arrItem = useWatch({
        control,
        name: "arrItem"
    });

    const chAllDiscount = watch('chAllDiscount');


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

    const TableTextNormal = styled('div')({
        fontSize: '0.80rem',
        color: 'rgb(39, 44, 52)',
        fontWeight: '400',
        textAlign: 'center',
    });

    const TableText = styled('div')({
        fontSize: '0.60rem',
        color: 'rgb(39, 44, 52)',
        fontWeight: '400',
        textAlign: 'center',
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
        dispatch(taxesActions.load({ chTokenCompany: user.chTokenCompany })); // загружаем налоги


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
        ]);

        fnCalculatePrice();

    }, [dPickup, dReturn]);

    useEffect(() => {
        setValue("dPickup", moment(dPickup).format("YYYY-MM-DD") + "T" + tPickup);
    }, [tPickup]);

    useEffect(() => {
        setValue("dReturn", moment(dReturn).format("YYYY-MM-DD") + "T" + tReturn);
    }, [tReturn]);


    /// отслеживаем изменения в таблице продуктов и всё пересчитываем
    useEffect(() => {
        // пересчитываем стоимость
        fnCalculatePrice();
        // пересчитываем налоги
        fnCalculateTax();
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


    const fnCalculateMultiplier = (item) => {
        switch (item.iTypeDuration) {
            case 'hours': {
                // находим в тарифе идентичный или ближайший минимальный период
                const currPrice = fnCalculateOptimalTariff("hours", item.chAppliedRate.arrTariffDetail, currentDuration[3].hours);
                const extraPrice = fnCalculateExtraTariff("h", currPrice, item.chAppliedRate.arrExtraTariff);
                return {
                    ...currPrice,
                    ...extraPrice,
                };
            }
            case 'days': {
                // находим в тарифе идентичный или ближайший минимальный период
                const currentDurationDays = moment(dReturn).diff(moment(dPickup), 'd', true);
                const currPrice = fnCalculateOptimalTariff("days", item.chAppliedRate.arrTariffDetail, currentDurationDays);
                const extraPrice = fnCalculateExtraTariff("d", currPrice, item.chAppliedRate.arrExtraTariff);
                return {
                    ...currPrice,
                    ...extraPrice,
                };
            }
            case 'weeks': {
                // находим в тарифе идентичный или ближайший минимальный период
                const currentDurationWeeks = moment(dReturn).diff(moment(dPickup), 'w', true);
                const currPrice = fnCalculateOptimalTariff("w", item.chAppliedRate.arrTariffDetail, currentDurationWeeks);
                const extraPrice = fnCalculateExtraTariff("w", currPrice, item.chAppliedRate.arrExtraTariff);
                return {
                    ...currPrice,
                    ...extraPrice,
                };
            }
            case 'months': {
                // находим в тарифе идентичный или ближайший минимальный период
                const currentDurationMonths = moment(dReturn).diff(moment(dPickup), 'M', true);
                const currPrice = fnCalculateOptimalTariff("M", item.chAppliedRate.arrTariffDetail, currentDurationMonths);
                const extraPrice = fnCalculateExtraTariff("M", currPrice, item.chAppliedRate.arrExtraTariff).dPrice;
                return {
                    ...currPrice,
                    ...extraPrice,
                };
            }
            default:
                return 1;
        }
    }

    // находим в тарифе идентичный или ближайший минимальный период
    const fnCalculateOptimalTariff = (typePeriod, arrTariffDetail, currentDurationCount) => {
        return arrTariffDetail
            .filter(a => a.period === typePeriod)
            .reduce((prev, curr) => {
                if (currentDurationCount > prev.duration) {
                    if (currentDurationCount > curr.duration) {
                        if (prev.duration < curr.duration) {
                            return curr;
                        }
                        else {
                            return prev;
                        }
                    }
                    else {
                        return curr;
                    }
                }
                else {
                    if (currentDurationCount > curr.duration) {
                        return prev
                    }
                    else {
                        if (prev.duration < curr.duration) {
                            return prev;
                        }
                        else {
                            return curr;
                        }
                    }
                }
            }
            );

    }

    // считаем тариф сверх
    const fnCalculateExtraTariff = (typePeriod, currPrice, arrExtraTariff) => {

        // получаем исходные данные
        var a = moment(dPickup);
        var b = moment(dReturn);

        // прибавляем к начальной дате полученый период
        a = a.add(Number(currPrice.duration), typePeriod);

        const arrDiff = {
            "hour": Math.ceil(b.diff(a, 'h', true)),
            "day": Math.ceil(b.diff(a, 'd', true)),
            "week": Math.ceil(b.diff(a, 'w', true)),
            "month": Math.ceil(b.diff(a, 'M', true)),
        };

        // считаем стоимость для каждого типа тарифа, и будем находить минимальный для выгоды клиента 
        const iExtraTariff = {
            ...(Number(arrExtraTariff[0].hour) > 0) && arrDiff["hour"] > 0 && { "hour": arrDiff["hour"] * Number(arrExtraTariff[0].hour) }, // в часах
            ...(Number(arrExtraTariff[0].day) > 0) && arrDiff["day"] > 0 && { "day": arrDiff["day"] * Number(arrExtraTariff[0].day) }, // в днях
            ...(Number(arrExtraTariff[0].week) > 0) && arrDiff["week"] > 0 && { "week": arrDiff["week"] * Number(arrExtraTariff[0].week) }, // в неделях
            ...(Number(arrExtraTariff[0].month) > 0) && arrDiff["month"] > 0 && { "month": arrDiff["month"] * Number(arrExtraTariff[0].month) }, // в месяцах
        }

        let iExtraFactor = {
            typeExtra: "",
            iCountPeriod: "",
            priceExtra: ""
        };

        if (iExtraTariff
            && Object.keys(iExtraTariff).length === 0
            && Object.getPrototypeOf(iExtraTariff) === Object.prototype) {
            iExtraFactor =
            {
                typeExtra: "",
                iCountPeriod: 0,
                priceExtra: 0,
            }
        }
        else {
            // находим минимум
            const chNamePeriod = Object.keys(iExtraTariff).reduce((a, b) =>
                iExtraTariff[a] < iExtraTariff[b] ? a : b
            )
            iExtraFactor =
            {
                typeExtra: chNamePeriod,
                iCountPeriod: arrDiff[chNamePeriod],
                priceExtra: iExtraTariff[chNamePeriod],
            }

        };

        return iExtraFactor;
    }

    const fnCalculatePrice = () => {

        arrItem.map((item, index) => {
            switch (item.iType) {
                case "1": { // inventory
                    const arrMultiplier = fnCalculateMultiplier(item);
                    const value = (Number(arrMultiplier.price) + Number(arrMultiplier.priceExtra)) * Number(item.chQuantity) * Number(item.chDiscount === "0" ? 1 : (100 - item.chDiscount) / 100);
                    // пересчитываем цены
                    setPrice(state => {
                        return state.map(x => {
                            return x.chToken === item.chToken ? {
                                ...x,
                                chPrice: value,
                                printAppliedRate: {
                                    mainTariff: `${arrMultiplier.label} - ${toCurrency.format(arrMultiplier.price)}`,
                                    extraTariff: arrMultiplier.iCountPeriod > 0 ? `${arrMultiplier.iCountPeriod} ${arrMultiplier.typeExtra} - ${toCurrency.format(arrMultiplier.priceExtra)}` : ``,
                                }
                            } :
                                x
                        })
                    });
                } break;
                case "2": { // consumables
                    const value = Number(item.chQuantity) * Number(item.chAppliedRate) * Number(item.chDiscount === "0" ? 1 : (100 - item.chDiscount) / 100);
                    // пересчитываем цены
                    setPrice(state => {
                        return state.map(x => {
                            return x.chToken === item.chToken ? { ...x, chPrice: value } : x
                        })
                    });
                } break;
                case "3": { // bundles
                    let value = 0;
                    // пересчитываем цены
                    const arrBundlePrice = item.bundles.map(a => {
                        switch (a.iType) {
                            case "1": {
                                const arrMultiplier = fnCalculateMultiplier(a);
                                const dInventoryPrice = (Number(arrMultiplier.price) + Number(arrMultiplier.priceExtra)) * Number(a.chQuantity) * Number(a.chDiscount === "0" ? 1 : (100 - a.chDiscount) / 100);
                                value += dInventoryPrice;
                                return {
                                    ...a,
                                    chPrice: dInventoryPrice,
                                    printAppliedRate: {
                                        mainTariff: `${arrMultiplier.label} - ${toCurrency.format(arrMultiplier.price)}`,
                                        extraTariff: arrMultiplier.iCountPeriod > 0 ? `${arrMultiplier.iCountPeriod} ${arrMultiplier.typeExtra} - ${toCurrency.format(arrMultiplier.priceExtra)}` : ``,
                                    }
                                };
                            }
                            case "2": {
                                const dConsumablePrice = Number(a.chQuantity) * Number(a.chAppliedRate) * Number(a.chDiscount === "0" ? 1 : (100 - a.chDiscount) / 100);
                                value += dConsumablePrice;
                                return {
                                    ...a,
                                    chPrice: dConsumablePrice,
                                };
                            }
                            case "4": {
                                const dServicePrice = Number(a.chQuantity) * Number(a.chAppliedRate) * Number(a.chDiscount === "0" ? 1 : (100 - a.chDiscount) / 100);
                                value += dServicePrice;
                                return {
                                    ...a,
                                    chPrice: dServicePrice,
                                };
                            }

                        }
                    });

                    value = Number(item.chQuantity) * Number(value) * Number(item.chDiscount === "0" ? 1 : (100 - item.chDiscount) / 100);

                    setPrice(state => {
                        return state.map(x => {
                            return x.chToken === item.chToken ? { ...x, chPrice: value, arrBundlePrice: arrBundlePrice } : x
                        })
                    });
                } break;

                case "4": { // services
                    const value = Number(item.chQuantity) * Number(item.chAppliedRate) * Number(item.chDiscount === "0" ? 1 : (100 - item.chDiscount) / 100);
                    // пересчитываем цены
                    setPrice(state => {
                        return state.map(x => {
                            return x.chToken === item.chToken ? { ...x, chPrice: value } : x
                        })
                    });
                } break;

            }
        })
    }

    const fnCalculateTax = () => {

        setTaxArr([]);

        arrItem.map(item => {
            if (item.chTaxToken !== "")
                if (typeof arrTax.find(element => element.chTaxToken === item.chTaxToken) === 'undefined') {// такого налога еще нет в списке
                    // добавляем строку
                    setTaxArr(oldTaxArr => [
                        ...oldTaxArr,
                        {
                            chTaxToken: item.chTaxToken,
                            chTaxName: taxes.find(element => element.chTaxToken === item.chTaxToken).chName,
                            chTaxAmount: "100",
                        }
                    ])
                }
                else {
                    // иначе находим и пересчитываем
                    setTaxArr(
                        arrTax.map(x => {
                            if (x.chTaxToken === item.chTaxToken) {
                                return {
                                    chTaxToken: item.chTaxToken,
                                    chTaxName: taxes.find(element => element.chTaxToken === item.chTaxToken).chName,
                                    chTaxAmount: Number(x.chTaxAmount) + 100,
                                }
                            } else
                                return x
                        })
                    )
                }
        })
    }

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
        if (typeof item.arrTariffDetail.find(elem => elem.period === 'months') === 'undefined') {
            if (typeof item.arrTariffDetail.find(elem => elem.period === 'weeks') === 'undefined') {
                if (typeof item.arrTariffDetail.find(elem => elem.period === 'days') === 'undefined') {
                    return 'hours';
                } else {
                    // days
                    return 'days';
                }
            } else {
                // weeks
                return 'weeks';
            }
        } else {
            // months
            return 'months';
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
                    chTaxToken: itemSelected.chSalesTax,
                    iTypeDuration: fnCalculateDurationItem(itemSelected.chTariff),
                });

                setPrice(oldPrice => [
                    ...oldPrice,
                    {
                        chToken: itemSelected.chToken,
                        chPrice: "0"
                    }
                ]);
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
                    chTaxToken: itemSelected.chSalesTax,
                    iTypeDuration: "once",
                });

                setPrice(oldPrice => [
                    ...oldPrice,
                    {
                        chToken: itemSelected.chToken,
                        chPrice: itemSelected.chSellPrice
                    }
                ]);

            } break;
            // bundles
            case "3": {

                arrItemAppend({
                    chToken: itemSelected.chToken,
                    iType: itemSelected.iType,
                    chName: itemSelected.chName,
                    chQuantity: "1",
                    chDiscount: "0",
                    chAppliedRate: "0",
                    iTypeDuration: "once",
                    bundles: [
                        ...itemSelected.arrBundleList.map(x => {
                            switch (x.iType) {
                                case "1": return {
                                    chToken: x.chTokenInventory,
                                    iType: x.iType,
                                    chName: x.chName,
                                    chQuantity: x.chQuantity,
                                    chDiscount: x.chDiscount,
                                    chAppliedRate: x.chTariff,
                                    chTaxToken: x.chSalesTax,
                                    iTypeDuration: fnCalculateDurationItem(x.chTariff),
                                };
                                case "2": return {
                                    chToken: x.chTokenConsumable,
                                    iType: x.iType,
                                    chName: x.chName,
                                    chQuantity: x.chQuantity,
                                    chDiscount: x.chDiscount,
                                    chAppliedRate: x.chSellPrice,
                                    chTaxToken: x.chSalesTax,
                                    iTypeDuration: "once",
                                };
                                case "4": return {
                                    chToken: x.chTokenService,
                                    iType: x.iType,
                                    chName: x.chName,
                                    chQuantity: x.chQuantity,
                                    chDiscount: x.chDiscount,
                                    chAppliedRate: x.chSellPrice,
                                    chTaxToken: x.chSalesTax,
                                    iTypeDuration: "once",
                                }
                            }

                        }),
                    ]
                });

                setPrice(oldPrice => [
                    ...oldPrice,
                    {
                        chToken: itemSelected.chToken,
                        chPrice: "0",
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
                    chTaxToken: itemSelected.chSalesTax,
                    iTypeDuration: "once",
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
                    chTaxToken: itemSelected.chSalesTax,
                    iTypeDuration: fnCalculateDurationItem(itemSelected.chTariff),
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

    const fnPrintDuration = (type) => {
        switch (type) {
            case 'months': {
                return `${currentDuration[0].months > 0 ? `${currentDuration[0].months} months ` : ``}${currentDuration[0].weeks > 0 ? `${currentDuration[0].weeks} weeks ` : ``}${currentDuration[0].days > 0 ? `${currentDuration[0].days} days ` : ``}${currentDuration[0].hours > 0 ? `${Math.ceil(currentDuration[0].hours)} hours` : ``}`
            } break;
            case 'weeks': {
                return `${currentDuration[1].weeks > 0 ? `${currentDuration[1].weeks} weeks ` : ``}${currentDuration[1].days > 0 ? `${currentDuration[1].days} days ` : ``}${currentDuration[1].hours > 0 ? `${Math.ceil(currentDuration[1].hours)} hours` : ``}`
            } break;
            case 'days': {
                return `${currentDuration[2].days > 0 ? `${currentDuration[2].days} days ` : ``}${Math.ceil(currentDuration[2].hours)} hours`;
            } break;
            case 'hours': {
                return `${currentDuration[3].hours} hours`
            } break;
            default:
                return ""
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
                                                <TableLabel style={{ textAlign: "center" }}>{fnPrintDuration(item.iTypeDuration)}</TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>
                                                    {
                                                        typeof item.chAppliedRate.arrTariffDetail !== 'undefined' &&
                                                            typeof arrPrice.find(o => o.chToken === item.chToken).printAppliedRate !== 'undefined' ?
                                                            <>
                                                                <TableText>{arrPrice.find(o => o.chToken === item.chToken).printAppliedRate.mainTariff}</TableText>
                                                                <TableText>{arrPrice.find(o => o.chToken === item.chToken).printAppliedRate.extraTariff}</TableText>
                                                            </>
                                                            :
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
                                        {
                                            item.iType === "3" && item.bundles.length > 0 &&
                                            item.bundles.map((x, index) =>
                                                <BoxStyledBorderTopDashed key={index}>
                                                    <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 24, md: 24 }}>
                                                        <Grid item xs={12} sm={7} md={7} style={{ justifyContent: "left", alignItems: "center", display: "flex", }}>
                                                            <TableTextNormal>{x.chName}</TableTextNormal>
                                                        </Grid>
                                                        <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                            <TableTextNormal style={{ textAlign: "center" }}>{fnPrintDuration(x.iTypeDuration)}</TableTextNormal>
                                                        </Grid>
                                                        <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                            <TableTextNormal>

                                                                {
                                                                    typeof x.chAppliedRate.arrTariffDetail !== 'undefined' &&
                                                                        typeof arrPrice.find(o => o.chToken === item.chToken).arrBundlePrice !== 'undefined' ?
                                                                        <>
                                                                            <TableText>{arrPrice.find(o => o.chToken === item.chToken).arrBundlePrice.find(a => a.chToken === x.chToken).printAppliedRate.mainTariff}</TableText>
                                                                            <TableText>{arrPrice.find(o => o.chToken === item.chToken).arrBundlePrice.find(a => a.chToken === x.chToken).printAppliedRate.extraTariff}</TableText>
                                                                        </>
                                                                        :
                                                                        <TableText>{toCurrency.format(x.chAppliedRate)}</TableText>
                                                                }
                                                            </TableTextNormal>
                                                        </Grid>
                                                        <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                            <TableTextNormal>{x.chQuantity}</TableTextNormal>
                                                        </Grid>
                                                        <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                            <TableTextNormal>{x.chDiscount}%</TableTextNormal>
                                                        </Grid>

                                                        <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                            <TableTextNormal>
                                                                {
                                                                    typeof arrPrice.find(o => o.chToken === item.chToken).arrBundlePrice !== 'undefined' ?
                                                                        toCurrency.format(arrPrice.find(o => o.chToken === item.chToken).arrBundlePrice.find(a => a.chToken === x.chToken).chPrice) :
                                                                        ""
                                                                }
                                                            </TableTextNormal>
                                                        </Grid>
                                                        <Grid item xs={12} sm={2} md={2}></Grid>
                                                    </Grid>
                                                </BoxStyledBorderTopDashed>
                                            )
                                        }
                                    </BoxStyledBorderTop>
                                ))
                            }
                            {
                                arrItemFields.length &&
                                <>
                                    <BoxStyledBorderTop>
                                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 24, md: 24 }}>
                                            <Grid item xs={12} sm={19} md={19} style={{ justifyContent: "right", alignItems: "right", display: "flex", }}>
                                                <TableTextNormal>Subtotal</TableTextNormal>
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableTextNormal>
                                                    {
                                                        toCurrency.format(arrPrice.reduce((accumulator, object) => {
                                                            return accumulator + Number(object.chPrice);
                                                        }, 0))
                                                    }
                                                </TableTextNormal>
                                            </Grid>
                                            <Grid item xs={12} sm={2} md={2}></Grid>
                                        </Grid>
                                    </BoxStyledBorderTop>
                                    <BoxStyledBorderTop>
                                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 24, md: 24 }}>
                                            <Grid item xs={12} sm={16} md={16} style={{ justifyContent: "right", alignItems: "right", display: "flex", }}>

                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "right", alignItems: "right", display: "flex", }}>
                                                <FormInputNumber
                                                    name="chAllDiscount"
                                                    control={control}
                                                    label="Discount"
                                                    size="small"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                                        inputProps: { min: 0, max: 100 },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableTextNormal>
                                                    {
                                                        toCurrency.format(arrPrice.reduce((accumulator, object) => {
                                                            return accumulator + Number(object.chPrice);
                                                        }, 0) * Number(watch('chAllDiscount')) / 100)

                                                    }
                                                </TableTextNormal>
                                            </Grid>
                                            <Grid item xs={12} sm={2} md={2}></Grid>
                                        </Grid>
                                    </BoxStyledBorderTop>
                                    <BoxStyledBorderTop>
                                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 24, md: 24 }}>
                                            <Grid item xs={12} sm={19} md={19} style={{ justifyContent: "right", alignItems: "right", display: "flex", }}>
                                                <TableLabel>
                                                    Total (before tax)
                                                </TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>
                                                    {
                                                        toCurrency.format(arrPrice.reduce((accumulator, object) => {
                                                            return accumulator + Number(object.chPrice);
                                                        }, 0) - arrPrice.reduce((accumulator, object) => {
                                                            return accumulator + Number(object.chPrice);
                                                        }, 0) * Number(watch('chAllDiscount')) / 100)

                                                    }
                                                </TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={2} md={2}></Grid>
                                        </Grid>
                                    </BoxStyledBorderTop>
                                    {
                                        arrTax.map((a, index) => (

                                            <BoxStyledBorderTop key={index}>
                                                <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 24, md: 24 }}>
                                                    <Grid item xs={12} sm={19} md={19} style={{ justifyContent: "right", alignItems: "right", display: "flex", }}>
                                                        <TableLabel>
                                                            {a.chTaxToken}
                                                        </TableLabel>
                                                    </Grid>
                                                    <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                        <TableLabel>
                                                            {a.chTaxAmount}
                                                        </TableLabel>
                                                    </Grid>
                                                    <Grid item xs={12} sm={2} md={2}></Grid>
                                                </Grid>
                                            </BoxStyledBorderTop>
                                        ))

                                    }
                                    <BoxStyledBorderTop>
                                        <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 24, md: 24 }}>
                                            <Grid item xs={12} sm={19} md={19} style={{ justifyContent: "right", alignItems: "right", display: "flex", }}>
                                                <TableLabel>
                                                    Total (after tax)
                                                </TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                <TableLabel>
                                                    {
                                                        toCurrency.format(arrPrice.reduce((accumulator, object) => {
                                                            return accumulator + Number(object.chPrice);
                                                        }, 0) - arrPrice.reduce((accumulator, object) => {
                                                            return accumulator + Number(object.chPrice);
                                                        }, 0) * Number(watch('chAllDiscount')) / 100)

                                                    }
                                                </TableLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={2} md={2}></Grid>
                                        </Grid>
                                    </BoxStyledBorderTop>
                                </>
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