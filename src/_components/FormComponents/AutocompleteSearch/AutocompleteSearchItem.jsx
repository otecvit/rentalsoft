import React, { useEffect, useState } from 'react';
import {
    TextField,
    Autocomplete,
    CircularProgress,
    Box,
    Button,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { useDispatch, useSelector } from 'react-redux';

import { inventoryActions } from '../../../_actions';
import { tariffsActions } from '../../../_actions';
import { servicesActions } from '../../../_actions';
import { consumablesActions } from '../../../_actions';
import { bundlesActions } from '../../../_actions';

export const AutocompleteSearchItem = ({ labelTitle = "Search to add", fnAddToOrder }) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [searchText, setSearchText] = React.useState('');
    const [onSkeleton, setSceleton] = React.useState(false);

    const [isLoadingInventory, setIsLoadingInventory] = useState(false);
    const [isLoadingService, setIsLoadingService] = useState(false);
    const [isLoadingConsumable, setIsLoadingConsumable] = useState(false);
    const [isLoadingBundles, setIsLoadingBundles] = useState(false);

    const dispatch = useDispatch();

    const inventory = useSelector(state => state.inventory);
    const services = useSelector(state => state.services);
    const consumables = useSelector(state => state.consumables);
    const bundles = useSelector(state => state.bundles);
    const tariffs = useSelector(state => state.tariffs);

    const support = useSelector(state => state.support);
    const user = useSelector(state => state.authentication.user);

    //const loading = open && options.length === 0;

    useEffect(() => {
        if (!open) {
            setOptions([]);
            dispatch(tariffsActions.clear());

            setIsLoadingInventory(false);
            setIsLoadingService(false);
            setIsLoadingConsumable(false);
            setIsLoadingBundles(false);

            dispatch(inventoryActions.clearInventoryState());
            dispatch(servicesActions.clear());
            dispatch(consumablesActions.clear());
            dispatch(bundlesActions.clear());

        } else {
            dispatch(tariffsActions.load({ chTokenCompany: user.chTokenCompany }));

            dispatch(inventoryActions.load({ chTokenCompany: user.chTokenCompany }));
            dispatch(servicesActions.load({ chTokenCompany: user.chTokenCompany }));
            dispatch(consumablesActions.load({ chTokenCompany: user.chTokenCompany }));

        }
    }, [open])

    // 
    useEffect(() => {
        if (support.isLoadingInventory)
            setIsLoadingInventory(true);

        setOptions(
            (prevState) => (
                [
                    ...prevState,
                    ...inventory.map(item => ({ ...item, chToken: item.chTokenInventory, chTariff: tariffs.find(x => x.id === item.chTariff), iType: "1" })),
                ]));
    }, [support.isLoadingInventory]);

    useEffect(() => {
        if (support.isLoadingConsumable)
            setIsLoadingConsumable(true);

        setOptions(
            (prevState) => (
                [
                    ...prevState,
                    ...consumables.map(item => ({ ...item, chToken: item.chTokenConsumable, iType: "2" })),
                ]));
    }, [support.isLoadingConsumable]);

    useEffect(() => {
        if (support.isLoadingService) setIsLoadingService(true);

        setOptions(
            (prevState) => (
                [
                    ...prevState,
                    ...services.map(item => ({ ...item, chToken: item.chTokenService, iType: "4" })),
                ]));
    }, [support.isLoadingService]);


    useEffect(() => {

        if (isLoadingInventory &&
            isLoadingService &&
            isLoadingConsumable &&
            !support.isLoadingInventory &&
            !support.isLoadingConsumable &&
            !support.isLoadingService) {

            setIsLoadingBundles(true);
            dispatch(bundlesActions.load({ chTokenCompany: user.chTokenCompany }));
        }

    }, [isLoadingInventory, isLoadingService, isLoadingConsumable, support.isLoadingInventory, support.isLoadingConsumable, support.isLoadingService])

    useEffect(() => {
        if (isLoadingBundles && !support.isLoadingBundles)
            setOptions(
                (prevState) => (
                    [
                        ...prevState,
                        ...bundles.map(item => ({
                            ...item,
                            chToken: item.chTokenBundle,
                            iType: "3",
                            arrBundleList: [
                                ...item.arrInventory.map(a => {
                                    // находим инвентарь
                                    const currInventory = inventory.filter(el => el.chTokenInventory === a.chTokenInventory);
                                    if (currInventory.length > 0)
                                        return {
                                            ...currInventory[0],
                                            ...a,
                                            // находим тариф
                                            chTariff: tariffs.find(x => x.id === currInventory[0].chTariff),
                                            iType: "1"
                                        }
                                }),
                                ...item.arrConsumables.map(a => {
                                    const currConsumable = consumables.filter(el => el.chTokenConsumable === a.chTokenConsumable);
                                    if (currConsumable.length > 0)
                                        return {
                                            ...currConsumable[0],
                                            ...a,
                                            chToken: a.chTokenConsumable,
                                            iType: "2"
                                        }
                                }),
                                ...item.arrServices.map(a => {
                                    const currService = services.filter(el => el.chTokenService === a.chTokenService);
                                    if (currService.length > 0)
                                        return {
                                            ...currService[0],
                                            ...a,
                                            chToken: a.chTokenService,
                                            iType: "4"
                                        }
                                })
                            ]
                        })),
                    ]));

    }, [support.isLoadingBundles]);





    // useEffect(() => {


    //     setOptions([
    //         ...inventory.map(item => ({ ...item, chToken: item.chTokenInventory, chTariff: tariffs.find(x => x.id === item.chTariff), iType: "1" })),
    //         ...consumables.map(item => ({ ...item, chToken: item.chTokenConsumable, iType: "2" })),
    //         // генерируем bundle
    //         ...bundles.map(item => ({
    //             ...item,
    //             chToken: item.chTokenBundle,
    //             iType: "3",
    //             arrBundleList: [
    //                 ...item.arrInventory.map(a => {
    //                     // находим инвентарь
    //                     const currInventory = inventory.filter(el => el.chTokenInventory === a.chTokenInventory);
    //                     if (currInventory.length > 0)
    //                         return {
    //                             ...currInventory[0],
    //                             ...a,
    //                             // находим тариф
    //                             chTariff: tariffs.find(x => x.id === currInventory[0].chTariff),
    //                             iType: "1"
    //                         }
    //                 }),
    //                 ...item.arrConsumables.map(a => {
    //                     const currConsumable = consumables.filter(el => el.chTokenConsumable === a.chTokenConsumable);
    //                     if (currConsumable.length > 0)
    //                         return {
    //                             ...currConsumable[0],
    //                             ...a,
    //                             chToken: a.chTokenConsumable,
    //                             iType: "2"
    //                         }
    //                 }),
    //                 ...item.arrServices.map(a => {
    //                     const currService = services.filter(el => el.chTokenService === a.chTokenService);
    //                     if (currService.length > 0)
    //                         return {
    //                             ...currService[0],
    //                             ...a,
    //                             chToken: a.chTokenService,
    //                             iType: "4"
    //                         }
    //                 })
    //             ]
    //         })),
    //         ...services.map(item => ({ ...item, chToken: item.chTokenService, iType: "4" })),
    //     ]);
    // }, [support.isLoading]);

    const handleClickAddToOrder = (option) => {
        fnAddToOrder(option);
    }

    return (
        <Autocomplete
            fullWidth
            open={open}
            disableCloseOnSelect
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
                setSearchText('');
            }}
            isOptionEqualToValue={(option, value) => {
                return option.chName === value.chName
            }}
            getOptionLabel={(option) => {
                return option.chName
            }}
            options={options}
            inputValue={searchText}
            loading={support.isLoading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={
                        <>
                            <SearchIcon sx={{ marginRight: 1 }} />
                            {labelTitle}
                        </>
                    }
                    onChange={(event) => setSearchText(event.currentTarget.value)}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {support.isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            '& span': {
                                color: '#586069',
                            },
                        }}
                    >
                        {option.chName}
                    </Box>
                    <Box>
                        <Button variant="contained" themecolor="rentalBtnAutocomplete" size="small" onClick={() => handleClickAddToOrder(option)}>
                            + Add to order
                        </Button>
                    </Box>
                </li>
            )}
        />
    );
}