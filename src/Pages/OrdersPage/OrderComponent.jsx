import React, { useEffect, useState, Fragment } from 'react';
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import MUIRichTextEditor from 'mui-rte';
import { convertToRaw } from 'draft-js'
//import { styled, alpha } from '@mui/system';
import { styled, alpha } from '@mui/material/styles';

import { loadCSS } from 'fg-loadcss';

import moment, { duration, months } from 'moment';


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
    Divider,
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

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { categoryActions, bundlesActions, supportActions, inventoryActions, customerActions, taxesActions, ordersActions } from '../../_actions';

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

import { PaymentDialog } from './Components/PaymentDialog';
import { PaymentsTab } from './PaymentsTab';


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
            dPickup: getDateTime("", 1, 0),
            tPickup: getDateTime("", 2, 0),
            dReturn: getDateTime("", 1, 60),
            tReturn: getDateTime("", 2, 60),
            chTokenPickupLocation: "",
            chTokenReturnLocation: "",
            arrItem: [],
            chSubTotal: "0",
            chAllDiscount: "0",
            chAllDiscountValue: "0",
            chTotalBeforeTax: "0",
            arrTax: [],
            chTotalAfterTax: "0",
            chIdNumber: "",
            chSecurityDeposit: "",
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


    const {
        fields: arrTaxFields,
        append: arrTaxAppend,
        remove: arrTaxRemove,
        update: arrTaxUpdate,
    } = useFieldArray({
        control,
        name: "arrTax",
    });

    const [onSkeleton, setSceleton] = useState(false);
    const [arrCurrentFiles, setFiles] = useState(null); // state в котором хранятся текущие файлы, которые отображаются
    const [removeFiles, setRemoveFiles] = useState([])
    const [selectedCategory, setCategory] = useState("");
    const [selectedCustomer, setCustomer] = useState("");
    const [open, setOpen] = React.useState(false);
    const [tagsInventory, setTag] = useState([]);
    const [arrPrice, setPrice] = useState([]);
    const [openPayment, setOpenAddPayment] = useState(false);

    const [anchorSub, setAnchorSub] = useState(null);
    const openSubMenu = Boolean(anchorSub);
    const handleClickSub = (event) => {
        setAnchorSub(event.currentTarget);
    };
    const handleCloseSub = () => {
        setAnchorSub(null);
    };



    //const [arrTax, setTaxArr] = useState([]);

    const [currentTab, setTab] = useState("2");
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

    const arrTax = useWatch({
        control,
        name: "arrTax"
    });

    const chAllDiscount = watch('chAllDiscount');
    const chTotalAfterTax = watch('chTotalAfterTax');


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

        // загружаем иконки fontawesome
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v6.1.1/css/all.css',
            // Inject before JSS
            document.querySelector('#font-awesome-css') || document.head.firstChild,
        );

        dispatch(categoryActions.load({ chTokenCompany: user.chTokenCompany }));
        dispatch(taxesActions.load({ chTokenCompany: user.chTokenCompany })); // загружаем налоги


        // if (actions === "edit")
        //     dispatch(bundlesActions.loadData({ chTokenCompany: user.chTokenCompany, chTokenBundle: chTokenBundle }));

        // else
        //     dispatch(bundlesActions.clear());
    }, []);

    // меняем переиод при изменении даты или времени
    useEffect(() => {
        setDuration([
            { ...fnCalculatePeriod("months") },
            { ...fnCalculatePeriod("weeks") },
            { ...fnCalculatePeriod("days") },
            { ...fnCalculatePeriod("hours") },
        ]);
    }, [dPickup, dReturn]);

    // пересчитываем все позиции при изменении периода
    useEffect(() => {
        fnReCalculateAllItem();
    }, [currentDuration]);

    useEffect(() => {
        setValue("dPickup", moment(dPickup).format("YYYY-MM-DD") + "T" + tPickup);
    }, [tPickup]);

    useEffect(() => {
        setValue("dReturn", moment(dReturn).format("YYYY-MM-DD") + "T" + tReturn);
    }, [tReturn]);


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
                chTypeExtra: "",
                iDurationExtra: "0",
                iPriceExtra: "0",
            }
        }
        else {
            // находим минимум
            const chNamePeriod = Object.keys(iExtraTariff).reduce((a, b) =>
                iExtraTariff[a] < iExtraTariff[b] ? a : b
            )
            iExtraFactor =
            {
                chTypeExtra: chNamePeriod,
                iDurationExtra: arrDiff[chNamePeriod].toString(),
                iPriceExtra: iExtraTariff[chNamePeriod].toString(),
            }

        };

        return iExtraFactor;
    }

    // пересчитываем все позиции при изменении сроков
    const fnReCalculateAllItem = () => {
        // получаем arrItem
        const currArrItem = getValues("arrItem");

        currArrItem.map((item, index) => {
            switch (item.iType) {
                // inventory
                case "1": {

                    const priceDetail = fnCalculatePriceForItem({
                        iType: item.iType,
                        chQuantity: item.chQuantity,
                        chDiscount: item.chDiscount,
                        chAppliedRate: item.chAppliedRate,
                        chTokenTax: item.chTokenTax,
                    })

                    setValue(`arrItem[${index}].priceDetail.chPrice`, priceDetail.chPrice);
                    setValue(`arrItem[${index}].priceDetail.taxDetail`, priceDetail.taxDetail);
                    setValue(`arrItem[${index}].priceDetail.printAppliedRate`, priceDetail.printAppliedRate);
                    setValue(`arrItem[${index}].priceDetail.dataForCalculate`, priceDetail.dataForCalculate);

                } break;

                // bundles
                case "3": {

                    item.bundles.map((x, ind) => {
                        switch (x.iType) {
                            case "1": {

                                const priceDetail = fnCalculatePriceForItem({
                                    iType: x.iType,
                                    chQuantity: x.chQuantity,
                                    chDiscount: x.chDiscount,
                                    chAppliedRate: x.chAppliedRate,
                                    chTokenTax: x.chTokenTax,
                                })

                                setValue(`arrItem[${index}].bundles[${ind}].priceDetail.chPrice`, priceDetail.chPrice);
                                setValue(`arrItem[${index}].bundles[${ind}].priceDetail.taxDetail`, priceDetail.taxDetail);
                                setValue(`arrItem[${index}].bundles[${ind}].priceDetail.printAppliedRate`, priceDetail.printAppliedRate);
                                setValue(`arrItem[${index}].bundles[${ind}].priceDetail.dataForCalculate`, priceDetail.dataForCalculate);

                            }
                        }
                    });
                    /// пересчитываем общую сумму по набору
                    setValue(
                        `arrItem[${index}].priceDetail.chPrice`,
                        getValues(`arrItem[${index}].bundles`).reduce((accumulator, object) => {
                            return accumulator + Number(object.priceDetail.chPrice);
                        }, 0)
                    );
                } break;
            }
        })

        fnReCalculateTax(); // пересчет налогов 
        fnCalculateSubTotal();

    }

    // рассчитываем цены
    const fnCalculatePriceForItem = (item) => {
        switch (item.iType) {
            case "1": { // inventory
                // ищем подходящий тариф и считаем стоимость
                // получаем оптимальный для клиента тариф:
                //  period - тип выбранного тарифного плана (months, weeks, days, hours)
                //  label - название тарифа из описания
                //  price - рассчитаная стоимость по тарифу
                //  duration - период числовой значение
                //  chTypeExtra - тип выбранной цены "свыше" (months, weeks, days, hours)
                //  iDurationExtra - период "свыше"
                //  iPriceExtra - рассчитаная стоимость "свыше"
                const arrPriceDetail = fnCalculateDurationItem(item.chAppliedRate);

                // расчитываем стоимость для отображения
                const value = Math.round((Number(arrPriceDetail.price) + Number(arrPriceDetail.iPriceExtra)) * Number(item.chQuantity) * Number(item.chDiscount === "0" ? 1 : (100 - item.chDiscount) / 100) * 100) / 100;
                // рассчитываем налоги
                // получаем: chTaxName, chTaxAmount
                const taxDetail = fnCalculateTaxForItem(value, item);
                return {
                    chPrice: value.toString(),
                    printAppliedRate: {
                        mainTariff: `${arrPriceDetail.label} - ${toCurrency.format(arrPriceDetail.price)}`,
                        extraTariff: arrPriceDetail.iDurationExtra > 0 ? `${arrPriceDetail.iDurationExtra} ${arrPriceDetail.chTypeExtra} - ${toCurrency.format(arrPriceDetail.iPriceExtra)}` : ``,
                    },
                    taxDetail: taxDetail,
                    iTypeDuration: arrPriceDetail.period,
                    dataForCalculate: {
                        ...arrPriceDetail
                    }
                }

            }
            case "2": { // consumables (расходные материалы)

                // расчитываем стоимость для отображения
                const value = Math.round((Number(item.chAppliedRate.arrTariffDetail[0].price) * Number(item.chQuantity) * Number(item.chDiscount === "0" ? 1 : (100 - item.chDiscount) / 100)) * 100) / 100;
                // рассчитываем налоги
                // получаем: chTaxName, chTaxAmount
                const taxDetail = fnCalculateTaxForItem(value, item);

                return {
                    chPrice: value.toString(),
                    printAppliedRate: {
                        mainTariff: `${toCurrency.format(item.chAppliedRate.arrTariffDetail[0].price)}`,
                        extraTariff: ``,
                    },
                    taxDetail: taxDetail,
                    iTypeDuration: 'once',
                    dataForCalculate: {
                        period: '',
                        label: '',
                        price: '',
                        duration: '',
                        chTypeExtra: '',
                        iDurationExtra: '',
                        iPriceExtra: '',
                    }
                }

            }

            case "4": { // services

                // расчитываем стоимость для отображения
                const value = Math.round((Number(item.chAppliedRate.arrTariffDetail[0].price) * Number(item.chQuantity) * Number(item.chDiscount === "0" ? 1 : (100 - item.chDiscount) / 100)) * 100) / 100;
                // рассчитываем налоги
                // получаем: chTaxName, chTaxAmount
                const taxDetail = fnCalculateTaxForItem(value, item);

                return {
                    chPrice: value.toString(),
                    printAppliedRate: {
                        mainTariff: `${toCurrency.format(item.chAppliedRate.arrTariffDetail[0].price)}`,
                        extraTariff: ``,
                    },
                    taxDetail: taxDetail,
                    iTypeDuration: 'once',
                    dataForCalculate: {
                        period: '',
                        label: '',
                        price: '',
                        duration: '',
                        chTypeExtra: '',
                        iDurationExtra: '',
                        iPriceExtra: '',
                    }
                }
            } break;

        }
    }

    // перессчитываем налоги при изменении количества, скидки и т.п.
    const fnReCalculateTax = () => {
        // обнуляем налоги
        const arrNewTax = arrItem.filter(elem => elem.chTokenTax !== '' || elem.iType === "3").map(item => {
            return item.iType === "3"
                ? item.bundles.filter(x => x.chTokenTax !== '').map(a => { return { chTokenTax: a.chTokenTax, ...a.priceDetail.taxDetail } })
                : { chTokenTax: item.chTokenTax, ...item.priceDetail.taxDetail };
        }).flat();


        // обнуляем предыдущий массив налогов и и содаем новый группируя по типу налогов
        fnCalculateTax(arrNewTax, []);

    }

    // рассчитываем налоги, у каждой строки может быть свой налог
    const fnCalculateTax = (taxDetail, arrTaxModify = arrTax) => {
        const arrTaxForModify = arrTaxModify.length > 0 ? [...arrTaxModify, ...taxDetail] : [...taxDetail]
        var result = [];
        arrTaxForModify.reduce(function (res, value) {
            if (!res[value.chTokenTax]) {
                res[value.chTokenTax] = { chTokenTax: value.chTokenTax, chTaxName: value.chTaxName, chTaxAmount: 0, chTaxStartAmount: 0 };
                result.push(res[value.chTokenTax])
            }
            res[value.chTokenTax].chTaxAmount += Number(value.chTaxAmount);
            res[value.chTokenTax].chTaxStartAmount = res[value.chTokenTax].chTaxAmount; // chTaxStartAmount требуется для вычисления скидки
            return res;
        }, {});

        console.log(result);

        setValue(`arrTax`, result);
    }

    // рассчитываем налоги, у каждой строки может быть свой налог
    const fnCalculateTaxForItem = (value, item) => {

        const currTax = taxes.find(element => element.chTokenTax === item.chTokenTax);
        if (typeof currTax !== 'undefined') {

            return {
                chTaxName: `${currTax.chName} (${currTax.chTaxRate}%)`,
                chTaxAmount: (Number(value) * Number(currTax.chTaxRate) / 100).toString(),
            }
        }
        else
            return {
                chTaxName: "",
                chTaxAmount: "",
            }
    }

    // пересчитываем стоимость при изменении количества
    const fnChangeItemQuantity = (value, index) => {
        // получаем тип продукта
        const iType = getValues(`arrItem[${index}].iType`);
        if (iType === '3') { // если это комплект
            const arrBundles = getValues(`arrItem[${index}].bundles`); // получаем комплект
            // пересчитываем все продукты в
            arrBundles.map((item, ind) => {
                const chQuantityOld = getValues(`arrItem[${index}].chQuantity`);
                const priceDetail = fnCalculatePriceForItem({
                    iType: item.iType,
                    chQuantity: Number(item.chQuantity) / Number(chQuantityOld) * Number(value),
                    chDiscount: item.chDiscount,
                    chAppliedRate: item.chAppliedRate,
                    chTokenTax: item.chTokenTax,
                })
                setValue(`arrItem[${index}].bundles[${ind}].chQuantity`, (Number(item.chQuantity) / Number(chQuantityOld) * Number(value)).toString())
                setValue(`arrItem[${index}].bundles[${ind}].priceDetail.chPrice`, priceDetail.chPrice);
                setValue(`arrItem[${index}].bundles[${ind}].priceDetail.taxDetail`, priceDetail.taxDetail);
                setValue(`arrItem[${index}].bundles[${ind}].priceDetail.printAppliedRate`, priceDetail.printAppliedRate);
                setValue(`arrItem[${index}].bundles[${ind}].priceDetail.dataForCalculate`, priceDetail.dataForCalculate);
            })

            /// пересчитываем общую сумму по набору
            setValue(
                `arrItem[${index}].priceDetail.chPrice`,
                (Math.round((getValues(`arrItem[${index}].bundles`).reduce((accumulator, object) => {
                    return accumulator + Number(object.priceDetail.chPrice);
                }, 0)) * 100) / 100).toString()
            );

        } else {

            const priceDetail = fnCalculatePriceForItem({
                iType: iType,
                chQuantity: value,
                chDiscount: getValues(`arrItem[${index}].chDiscount`),
                iTypeDuration: getValues(`arrItem[${index}].iTypeDuration`),
                chAppliedRate: getValues(`arrItem[${index}].chAppliedRate`),
                chTokenTax: getValues(`arrItem[${index}].chTokenTax`),
            })
            setValue(`arrItem[${index}].priceDetail.chPrice`, priceDetail.chPrice);
            setValue(`arrItem[${index}].priceDetail.taxDetail`, priceDetail.taxDetail);

        }

        fnReCalculateTax(); // пересчет налогов
        fnCalculateSubTotal();
    }


    // пересчитываем стоимость при изменении скидки
    const fnChangeItemDiscount = (value, index) => {
        // получаем тип продукта
        const iType = getValues(`arrItem[${index}].iType`);
        if (iType === '3') { // если это комплект
            const arrBundles = getValues(`arrItem[${index}].bundles`); // получаем комплект
            const chDiscountAllOld = getValues(`arrItem[${index}].chDiscount`);
            // пересчитываем все продукты в
            arrBundles.map((item, ind) => {
                // сохраняем предыдущее количество для расчета
                const chDiscountStart = getValues(`arrItem[${index}].bundles[${ind}].chDiscountStart`);
                const priceDetail = fnCalculatePriceForItem({
                    iType: item.iType,
                    chQuantity: item.chQuantity,
                    chDiscount: Math.round((100 - (100 - Number(chDiscountStart)) * (100 - Number(value)) / 100) * 100) / 100,
                    chAppliedRate: item.chAppliedRate,
                    chTokenTax: item.chTokenTax,
                })
                setValue(`arrItem[${index}].bundles[${ind}].chDiscount`, (Math.round((100 - (100 - Number(chDiscountStart)) * (100 - Number(value)) / 100) * 100) / 100).toString())
                setValue(`arrItem[${index}].bundles[${ind}].priceDetail.chPrice`, priceDetail.chPrice);
                setValue(`arrItem[${index}].bundles[${ind}].priceDetail.taxDetail`, priceDetail.taxDetail);
                setValue(`arrItem[${index}].bundles[${ind}].priceDetail.printAppliedRate`, priceDetail.printAppliedRate);
                setValue(`arrItem[${index}].bundles[${ind}].priceDetail.dataForCalculate`, priceDetail.dataForCalculate);

            })

            /// пересчитываем общую сумму по набору
            setValue(
                `arrItem[${index}].priceDetail.chPrice`,
                (Math.round((getValues(`arrItem[${index}].bundles`).reduce((accumulator, object) => {
                    return accumulator + Number(object.priceDetail.chPrice);
                }, 0)) * 100) / 100).toString()
            );

        } else {

            const priceDetail = fnCalculatePriceForItem({
                iType: getValues(`arrItem[${index}].iType`),
                chQuantity: getValues(`arrItem[${index}].chQuantity`),
                chDiscount: value,
                iTypeDuration: getValues(`arrItem[${index}].iTypeDuration`),
                chAppliedRate: getValues(`arrItem[${index}].chAppliedRate`),
                chTokenTax: getValues(`arrItem[${index}].chTokenTax`),
            })
            setValue(`arrItem[${index}].priceDetail.chPrice`, priceDetail.chPrice.toString());
            setValue(`arrItem[${index}].priceDetail.taxDetail`, priceDetail.taxDetail);

        }

        fnReCalculateTax(); // пересчет налогов
        fnCalculateSubTotal();// считаем итоги
    }

    // пересчитываем цены при изменении скидки
    const fnChangeAllDiscount = (value) => {
        const chSubTotal = getValues(`chSubTotal`);
        const chAllDiscountValue = chSubTotal * value / 100;
        setValue(`chAllDiscountValue`, chAllDiscountValue);
        setValue(`chTotalBeforeTax`, chSubTotal - chAllDiscountValue);
        // считаем скидку для налогов
        arrTax.map((item, index) => {
            setValue(`arrTax[${index}].chTaxAmount`, (Math.round((item.chTaxStartAmount * (100 - value) / 100) * 100) / 100).toString());
        })
        setValue(
            `chTotalAfterTax`,
            (chSubTotal - chAllDiscountValue) + Math.round((getValues(`arrTax`).reduce((accumulator, object) => {
                return accumulator + Number(object.chTaxAmount);
            }, 0)) * 100) / 100
        )
    }


    // пересчитываем результаты
    const fnCalculateSubTotal = () => {
        const arrItemForCalculate = getValues(`arrItem`);
        const chAllDiscount = getValues(`chAllDiscount`);
        const chSubTotal = arrItemForCalculate.reduce((a, b) => a + Number(b.priceDetail.chPrice), 0);
        const chAllDiscountValue = chSubTotal * chAllDiscount / 100;
        setValue(`chSubTotal`, chSubTotal);
        setValue(`chAllDiscountValue`, chAllDiscountValue);
        setValue(`chTotalBeforeTax`, chSubTotal - chAllDiscountValue);
        setValue(
            `chTotalAfterTax`,
            (chSubTotal - chAllDiscountValue) + Math.round((getValues(`arrTax`).reduce((accumulator, object) => {
                return accumulator + Number(object.chTaxAmount);
            }, 0)) * 100) / 100
        )
        // fnCalculateTax();
    }

    // удаление позиции
    const fnItemRemove = (index) => {
        // получаем токен позиции
        const chTokenForRemove = getValues(`arrItem[${index}].chToken`);
        // фильтруем налоги
        const arrNewTax = arrItem.filter(a => a.chToken !== chTokenForRemove).filter(elem => elem.chTokenTax !== '' || elem.iType === "3").map(item => {
            return item.iType === "3"
                ? item.bundles.filter(x => x.chTokenTax !== '').map(a => { return { chTokenTax: a.chTokenTax, ...a.priceDetail.taxDetail } })
                : { chTokenTax: item.chTokenTax, ...item.priceDetail.taxDetail };
        }).flat();
        // пересчитываем налоги
        fnCalculateTax(arrNewTax, []);
        arrItemRemove(index); // удаляем 
        if (getValues(`arrItem`).length === 0) {
            setValue(`chAllDiscount`, "0");
            setValue(`chAllDiscountValue`, "0");
        }
        fnCalculateSubTotal();// считаем итоги
    }


    const initialValueEdit = () => {
        // setValue("chName", bundles[0].chName);
        // setValue("txtDescription", bundles[0].txtDescription);
        // setValue("arrInventory", bundles[0].arrInventory);
        // setValue("arrServices", bundles[0].arrServices);
        // setValue("arrConsumables", bundles[0].arrConsumables);
        // setValue("files", bundles[0].arrFilePath.length ? bundles[0].arrFilePath : []);
        // setFiles(bundles[0].arrFilePath.length ? bundles[0].arrFilePath.map((item) => { return { preview: item.file } }) : []);
        // handleSelectCategory(bundles[0].chCategoryID);
        // if (!!bundles[0].arrTags) setTag(tags.filter(x => bundles[0].arrTags.includes(x.idTag)));
        // setValue("chYourSKU", bundles[0].chYourSKU);
    }

    const initialValueAdd = () => {
        //setFiles([]);
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
        // рассчитываем все варианты стоимости аренды для поиска минимального
        const arrPriceAllPeriod = currentDuration.map((elem, index) => {
            return fnCheckPeriod(item, elem, index);
        });
        ///const iTypeDuration = arrPriceAllPeriod.indexOf(Math.min.apply(null, arrPriceAllPeriod.filter(Boolean)));

        let min;
        let index;
        for (let i = 0; i < arrPriceAllPeriod.length; i++) {
            if (!min && arrPriceAllPeriod[i] !== 0) {
                min = Number(arrPriceAllPeriod[i].price) + Number(arrPriceAllPeriod[i].iPriceExtra);
                index = i;
            }
            if ((Number(arrPriceAllPeriod[i].price) + Number(arrPriceAllPeriod[i].iPriceExtra)) < min && (Number(arrPriceAllPeriod[i].price) + Number(arrPriceAllPeriod[i].iPriceExtra)) !== 0) {
                min = Number(arrPriceAllPeriod[i].price) + Number(arrPriceAllPeriod[i].iPriceExtra)
                index = i;
            }
        }

        return arrPriceAllPeriod[index];
    }

    // рассчитываем стоимость для каждого вида аренды, для поиска минимального варианта
    const fnCheckPeriod = (item, elem, index) => {
        switch (index) {
            case 0: {
                // ищем месячный тариф
                if (typeof item.arrTariffDetail.find(a => a.period === 'months') !== 'undefined') {
                    // месячный тариф найден
                    // считаем всю сумму по месячному тарифу
                    const currPrice = fnCalculateOptimalTariff("months", item.arrTariffDetail, Number(elem.months));
                    const extraPrice = fnCalculateExtraTariff("m", currPrice, item.arrExtraTariff);
                    // return Number(currPrice.price) + Number(extraPrice.priceExtra);
                    return { ...currPrice, ...extraPrice };

                } else {
                    return false;
                }
            }
            case 1: {
                // ищем недельный тариф
                if (typeof item.arrTariffDetail.find(a => a.period === 'weeks') !== 'undefined') {
                    // недельный тариф найден
                    // считаем всю сумму по недельному тарифу
                    const currPrice = fnCalculateOptimalTariff("weeks", item.arrTariffDetail, Number(elem.weeks));
                    const extraPrice = fnCalculateExtraTariff("w", currPrice, item.arrExtraTariff);
                    return { ...currPrice, ...extraPrice };
                    // return Number(currPrice.price) + Number(extraPrice.priceExtra);

                } else {
                    return false;
                }
            }
            case 2: {
                // ищем суточный тариф
                if (typeof item.arrTariffDetail.find(a => a.period === 'days') !== 'undefined') {
                    // суточный тариф найден
                    // считаем всю сумму по суточному тарифу
                    const currPrice = fnCalculateOptimalTariff("days", item.arrTariffDetail, Number(elem.days));
                    const extraPrice = fnCalculateExtraTariff("d", currPrice, item.arrExtraTariff);
                    return { ...currPrice, ...extraPrice };
                    //return Number(currPrice.price) + Number(extraPrice.priceExtra);

                } else {
                    return false;
                }
            }
            case 3: {
                // ищем часовой тариф
                if (typeof item.arrTariffDetail.find(a => a.period === 'hours') !== 'undefined') {
                    // часовой тариф найден
                    // считаем всю сумму по часовому тарифу
                    const currPrice = fnCalculateOptimalTariff("hours", item.arrTariffDetail, Number(elem.hours));
                    const extraPrice = fnCalculateExtraTariff("h", currPrice, item.arrExtraTariff);
                    return { ...currPrice, ...extraPrice };
                    // return Number(currPrice.price) + Number(extraPrice.priceExtra);

                } else {
                    return false;
                }
            }
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


    const handleAddItem = (itemSelected) => {

        switch (itemSelected.iType) {
            // inventory
            case "1": {

                const priceDetail = fnCalculatePriceForItem({
                    iType: itemSelected.iType,
                    chQuantity: "1",
                    chDiscount: "0",
                    chAppliedRate: itemSelected.chTariff,
                    chTokenTax: itemSelected.chSalesTax,
                })

                // добавляем продукт
                arrItemAppend({
                    chToken: itemSelected.chToken,
                    iType: itemSelected.iType,
                    chName: itemSelected.chName,
                    chQuantity: "1",
                    chDiscount: "0",
                    chAppliedRate: itemSelected.chTariff,
                    chTokenTax: itemSelected.chSalesTax,
                    priceDetail: priceDetail,
                });

                if (itemSelected.chSalesTax != '')
                    fnCalculateTax([{
                        chTokenTax: itemSelected.chSalesTax,
                        chTaxAmount: priceDetail.taxDetail.chTaxAmount,
                        chTaxName: priceDetail.taxDetail.chTaxName,
                    }]);

            } break;

            // consumables (расходные материалы)
            case "2": {

                const chAppliedRate = {
                    id: '',
                    name: '',
                    arrExtraTariff: [
                        { hour: '0', day: '0', week: '0', month: '0' }
                    ],
                    arrTariffDetail: [
                        { label: '', duration: '1', period: 'once', price: itemSelected.chSellPrice }
                    ],
                }
                // добавляем расходный материал
                arrItemAppend({
                    chToken: itemSelected.chToken,
                    iType: itemSelected.iType,
                    chName: itemSelected.chName,
                    chQuantity: "1",
                    chDiscount: "0",
                    chAppliedRate: chAppliedRate,
                    chTokenTax: itemSelected.chSalesTax,
                    priceDetail: fnCalculatePriceForItem({
                        iType: itemSelected.iType,
                        chQuantity: "1",
                        chDiscount: "0",
                        chAppliedRate: chAppliedRate,
                        chTokenTax: itemSelected.chSalesTax,
                    }),
                });

                if (itemSelected.chSalesTax != '')
                    fnCalculateTax([{
                        chTokenTax: itemSelected.chSalesTax,
                        chTaxAmount: priceDetail.taxDetail.chTaxAmount,
                        chTaxName: priceDetail.taxDetail.chTaxName,
                    }]);

            } break;
            // bundles
            case "3": {

                let arrBundleTax = [];

                const arrBundles = itemSelected.arrBundleList.map(x => {
                    switch (x.iType) {
                        case "1": {
                            const priceDetail = fnCalculatePriceForItem({
                                iType: x.iType,
                                chQuantity: x.chQuantity,
                                chDiscount: x.chDiscount,
                                chAppliedRate: x.chTariff,
                                chTokenTax: x.chSalesTax,
                            });

                            if (x.chSalesTax != '')
                                arrBundleTax = [
                                    ...arrBundleTax,
                                    {
                                        chTokenTax: x.chSalesTax,
                                        chTaxAmount: priceDetail.taxDetail.chTaxAmount,
                                        chTaxName: priceDetail.taxDetail.chTaxName,
                                    }
                                ];


                            return {
                                chToken: x.chTokenInventory,
                                iType: x.iType,
                                chName: x.chName,
                                chQuantity: x.chQuantity,
                                chDiscount: x.chDiscount,
                                chDiscountStart: x.chDiscount,
                                chAppliedRate: x.chTariff,
                                chTokenTax: x.chSalesTax,
                                priceDetail: priceDetail,
                            };
                        }
                        case "2": {

                            const chAppliedRate = {
                                id: '',
                                name: '',
                                arrExtraTariff: [
                                    { hour: '0', day: '0', week: '0', month: '0' }
                                ],
                                arrTariffDetail: [
                                    { label: '', duration: '1', period: 'once', price: x.chSellPrice }
                                ],

                            }

                            const priceDetail = fnCalculatePriceForItem({
                                iType: x.iType,
                                chQuantity: x.chQuantity,
                                chDiscount: x.chDiscount,
                                chAppliedRate: chAppliedRate,
                                chTokenTax: x.chSalesTax,
                            });

                            if (x.chSalesTax != '')
                                arrBundleTax = [
                                    ...arrBundleTax,
                                    {
                                        chTokenTax: x.chSalesTax,
                                        chTaxAmount: priceDetail.taxDetail.chTaxAmount,
                                        chTaxName: priceDetail.taxDetail.chTaxName,
                                    }
                                ];

                            return {
                                chToken: x.chTokenConsumable,
                                iType: x.iType,
                                chName: x.chName,
                                chQuantity: x.chQuantity,
                                chDiscount: x.chDiscount,
                                chDiscountStart: x.chDiscount,
                                chAppliedRate: chAppliedRate,
                                chTokenTax: x.chSalesTax,
                                priceDetail: priceDetail,
                            };
                        }
                        case "4": {

                            const chAppliedRate = {
                                id: '',
                                name: '',
                                arrExtraTariff: [
                                    { hour: '0', day: '0', week: '0', month: '0' }
                                ],
                                arrTariffDetail: [
                                    { label: '', duration: '1', period: 'once', price: x.chSellPrice }
                                ],
                            };

                            const priceDetail = fnCalculatePriceForItem({
                                iType: x.iType,
                                chQuantity: x.chQuantity,
                                chDiscount: x.chDiscount,
                                chAppliedRate: chAppliedRate,
                                chTokenTax: x.chSalesTax,
                            });

                            if (x.chSalesTax != '')
                                arrBundleTax = [
                                    ...arrBundleTax,
                                    {
                                        chTokenTax: x.chSalesTax,
                                        chTaxAmount: priceDetail.taxDetail.chTaxAmount,
                                        chTaxName: priceDetail.taxDetail.chTaxName,
                                    }
                                ];

                            return {
                                chToken: x.chTokenService,
                                iType: x.iType,
                                chName: x.chName,
                                chQuantity: x.chQuantity,
                                chDiscount: x.chDiscount,
                                chDiscountStart: x.chDiscount,
                                chAppliedRate: chAppliedRate,
                                chTokenTax: x.chSalesTax,
                                priceDetail: priceDetail,
                            };
                        }
                    }



                });

                arrItemAppend({
                    chToken: itemSelected.chToken,
                    iType: itemSelected.iType,
                    chName: itemSelected.chName,
                    chQuantity: "1",
                    chDiscount: "0",
                    chAppliedRate: [],
                    chTokenTax: itemSelected.chSalesTax,
                    priceDetail: {
                        chPrice: arrBundles.reduce((a, b) => a + Number(b.priceDetail.chPrice), 0),
                        iTypeDuration: 'once',
                        printAppliedRate: {
                            mainTariff: "",
                            extraTariff: "",
                        }
                    },
                    bundles: [...arrBundles]
                });

                // рассичтываем налоги
                fnCalculateTax(arrBundleTax);

            } break;

            // services
            case "4": {

                const chAppliedRate = {
                    id: '',
                    name: '',
                    arrExtraTariff: [
                        { hour: '0', day: '0', week: '0', month: '0' }
                    ],
                    arrTariffDetail: [
                        { label: '', duration: '1', period: 'once', price: itemSelected.chSellPrice }
                    ],
                }

                const priceDetail = fnCalculatePriceForItem({
                    iType: itemSelected.iType,
                    chQuantity: "1",
                    chDiscount: "0",
                    chAppliedRate: chAppliedRate,
                    chTokenTax: itemSelected.chSalesTax,
                });

                // добавляем услуги
                arrItemAppend({
                    chToken: itemSelected.chToken,
                    iType: itemSelected.iType,
                    chName: itemSelected.chName,
                    chQuantity: "1",
                    chDiscount: "0",
                    chAppliedRate: chAppliedRate,
                    chTokenTax: itemSelected.chSalesTax,
                    priceDetail: priceDetail,
                });

                if (itemSelected.chSalesTax != '')
                    fnCalculateTax([{
                        chTokenTax: itemSelected.chSalesTax,
                        chTaxAmount: priceDetail.taxDetail.chTaxAmount,
                        chTaxName: priceDetail.taxDetail.chTaxName,
                    }]);

            } break;
        }

        fnCalculateSubTotal();

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

    const handleSubmitOrder = (data) => {

        // массив файлов, которые надо удалить filesToRemove
        // проверяем на blob при удалении еще не закачанной картинки

        if (actions === "edit") {

            console.log({
                ...data,
                chTokenCompany: user.chTokenCompany,
            });

            // dispatch(bundlesActions.edit({
            //     ...data,
            //     chTokenBundle: chTokenBundle,
            //     chCategoryID: selectedCategory,
            //     arrTags: tagsInventory.map(item => item.idTag),
            //     filesToUpload: filesToUpload ? filesToUpload.map(item => ({ file: item })) : null,
            //     filesToRemove: filesToRemove ? filesToRemove : null,
            //     filesToLeave: filesToLeave ? filesToLeave.map(item => ({ file: item })) : null,
            //     chTokenCompany: user.chTokenCompany,
            // }));
        }
        else {

            console.log({
                ...data,
                chTokenCustomer: selectedCustomer.chTokenCustomer,
                chTokenCompany: user.chTokenCompany,
            });

            dispatch(ordersActions.add({
                ...data,
                chTokenCustomer: selectedCustomer.chTokenCustomer,
                chTokenCompany: user.chTokenCompany,
                filesToUpload: null,
                filesToRemove: null,
                filesToLeave: null,
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

    const handleOpenPayment = () => {
        setOpenAddPayment(true);
    }

    const handleOpenPaymentFromMenu = () => {
        setAnchorSub(null);
        setOpenAddPayment(true);
    }

    const handleClosePayment = () => {
        setOpenAddPayment(false);
    }

    const handleSubmitPayment = (data) => {
        setOpenAddPayment(false);
        dispatch(ordersActions.addPayment({
            ...data,
            chTokenCompany: user.chTokenCompany,
            chTokenOrder: "xxxxx",

        }));
        console.log(data);
    }




    return (
        <>
            <Container maxWidth="xl">
                <BoxStyledTitle>
                    {onSkeleton ?
                        <HeaderComponent title={actions === "edit" ? `${getValues("chName")}` : "Create a new order"} breadcrumbs={breadcrumbs} />
                        : <Skeleton width="50%" />
                    }
                </BoxStyledTitle>
                <TabContext value={currentTab}>
                    <Paper variant="titleTabDatagridWhite">
                        <div style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0px 20px',
                        }}>

                            <TabList onChange={handleChangeTab}>
                                <Tab label={`Details`} value="1" />
                                <Tab label={`Payments`} value="2" />
                                <Tab label={`Documents`} value="3" />
                                <Tab label={`History`} value="4" />
                            </TabList>
                            <Stack direction="row" spacing={2} justifyContent="end">
                                <Button
                                    id="demo-customized-button"
                                    aria-controls={openSubMenu ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openSubMenu ? 'true' : undefined}
                                    variant="contained"
                                    size="small"
                                    themecolor="rentalThemeHeader"
                                    disableElevation
                                    onClick={handleClickSub}
                                    endIcon={<KeyboardArrowDownIcon />}
                                >
                                    More
                                </Button>
                                <Menu
                                    id="demo-customized-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'demo-customized-button',
                                    }}
                                    anchorEl={anchorSub}
                                    open={openSubMenu}
                                    onClose={handleCloseSub}
                                >
                                    <MenuItem onClick={handleOpenPaymentFromMenu}>
                                        <Icon baseClassName="fas" className="fa-dollar" sx={{ fontSize: 15, marginRight: '8px' }} />Add payment
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseSub}>
                                        <Icon baseClassName="fas" className="fa-print" sx={{ fontSize: 15, marginRight: '8px' }} />Add document
                                    </MenuItem>
                                </Menu>
                                <Button variant="contained" themecolor="rentalThemeHeaderSubmit" size="small" onClick={() => { }}>
                                    <Icon baseClassName="fas" className="fa-shield" sx={{ fontSize: 15, marginRight: '8px' }} />Reserve
                                </Button>
                                <Button variant="contained" themecolor="rentalThemeHeaderSubmit" size="small" onClick={handleSubmit(handleSubmitOrder)}>
                                    <Icon baseClassName="fas" className="fa-share" sx={{ fontSize: 15, marginRight: '8px' }} />Start Rental
                                </Button>
                            </Stack>
                        </div>
                    </Paper>
                    <TabPanel value="1">
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
                                                            <TableLabel style={{ textAlign: "center" }}>{fnPrintDuration(item.priceDetail.iTypeDuration)}</TableLabel>
                                                        </Grid>
                                                        <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                            <TableLabel>
                                                                {
                                                                    <>
                                                                        <TableText>{item.priceDetail.printAppliedRate.mainTariff}</TableText>
                                                                        <TableText>{item.priceDetail.printAppliedRate.extraTariff}</TableText>
                                                                    </>
                                                                }
                                                            </TableLabel>
                                                        </Grid>
                                                        <Grid item xs={12} sm={3} md={3}>
                                                            <FormInputNumber
                                                                name={`arrItem[${index}].chQuantity`}
                                                                control={control}
                                                                size="small"
                                                                defaultValue={item.chQuantity}
                                                                onCalculate={(a) => fnChangeItemQuantity(a, index)}
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
                                                                onCalculate={(a) => fnChangeItemDiscount(a, index)}
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
                                                            <TableLabel>{toCurrency.format(item.priceDetail.chPrice)}</TableLabel>
                                                        </Grid>

                                                        <Grid item xs={12} sm={2} md={2} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                            <IconButton aria-label="del" onClick={() => fnItemRemove(index)}>
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
                                                                        <TableTextNormal style={{ textAlign: "center" }}>{fnPrintDuration(x.priceDetail.iTypeDuration)}</TableTextNormal>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                                        <TableTextNormal>
                                                                            <TableText>{x.priceDetail.printAppliedRate.mainTariff}</TableText>
                                                                            <TableText>{x.priceDetail.printAppliedRate.extraTariff}</TableText>
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
                                                                            {toCurrency.format(x.priceDetail.chPrice)}
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
                                                                {toCurrency.format(getValues("chSubTotal"))}
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
                                                                onCalculate={(a) => fnChangeAllDiscount(a)}
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
                                                                    toCurrency.format(getValues(`chAllDiscountValue`))

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
                                                                    toCurrency.format(getValues("chTotalBeforeTax"))
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
                                                                    <TableTextNormal>
                                                                        {a.chTaxName}
                                                                    </TableTextNormal>
                                                                </Grid>
                                                                <Grid item xs={12} sm={3} md={3} style={{ justifyContent: "center", alignItems: "center", display: "flex", }}>
                                                                    <TableTextNormal>
                                                                        {toCurrency.format(a.chTaxAmount)}
                                                                    </TableTextNormal>
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
                                                                {toCurrency.format(chTotalAfterTax)}
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
                                        name="chIdNumber"
                                        control={control}
                                        label="Identification Number"
                                    />

                                    <BoxStyled>
                                        <FormInputText
                                            name="chSecurityDeposit"
                                            control={control}
                                            label="Security Deposit"
                                        />
                                    </BoxStyled>
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
                                            name="chNotes"
                                            control={control}
                                            label="Add a new note..."
                                        />
                                    </BoxStyled>
                                </Paper>
                                {/* <BoxStyled>
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
                            </BoxStyled> */}
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2">
                        <Button variant="contained" themecolor="rentalThemeHeader" startIcon={<AddIcon />} size="small" onClick={handleOpenPayment}>
                            Add payment
                        </Button>
                        <PaymentsTab />
                    </TabPanel>
                    <TabPanel value="3">
                        document
                    </TabPanel>
                    <TabPanel value="4">
                        history
                    </TabPanel>
                </TabContext>
            </Container>
            {openPayment &&
                <PaymentDialog
                    open={openPayment}
                    close={handleClosePayment}
                    submit={handleSubmitPayment}
                    data={
                        {
                            chAmount: getValues("chTotalAfterTax"),
                            chSecurityDeposit: getValues("chSecurityDeposit")
                        }
                    }
                />}
        </>

    );
}

export { OrderComponent };