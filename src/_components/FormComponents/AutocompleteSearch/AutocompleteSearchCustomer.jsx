import React, { useEffect } from 'react';
import {
    TextField,
    Autocomplete,
    CircularProgress,
    Box,
    Button,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import SearchIcon from '@mui/icons-material/Search';

import { useDispatch, useSelector } from 'react-redux';

import { customerActions } from '../../../_actions';

export const AutocompleteSearchCustomer = ({ labelTitle = "Search to add", fnAddToOrder }) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [searchText, setSearchText] = React.useState('');
    const [onSkeleton, setSceleton] = React.useState(false);

    const dispatch = useDispatch();
    const customers = useSelector(state => state.customers);
    const support = useSelector(state => state.support);
    const user = useSelector(state => state.authentication.user);

    const loading = open && options.length === 0;

    useEffect(() => {
        if (!open) {
            setOptions([]);
            dispatch(customerActions.clearCustomerState());
        }
        else {
            dispatch(customerActions.load({ chTokenCompany: user.chTokenCompany }));
        }
    }, [open])


    useEffect(() => {
        // статус загрузки
        if (customers !== undefined && customers.length != 0) {
            setSceleton(true);
            setOptions([...customers]);
        }
        else
            setSceleton(false);
    }, [support.isLoading]);

    const handleClickAddToOrder = (option) => {
        fnAddToOrder(option);
    }

    return (
        <Autocomplete
            fullWidth
            autoHighlight
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
                setSearchText('');
            }}
            onChange={(event, newValue) => {
                handleClickAddToOrder(newValue);
            }}
            isOptionEqualToValue={(option, value) => {
                return option.chFirstName + option.chLastName === value.chFirstName + value.chLastName
            }}
            getOptionLabel={(option) => {
                return option.chFirstName + option.chLastName
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
                    // onKeyDown={e => {
                    //     //console.log(e.code);
                    //     if (e.code === 'Enter' && e.target.value) {
                    //         //setAutoCompleteValue(autoCompleteValue.concat(e.target.value));
                    //         console.log(e.target.value);
                    //     }
                    // }}
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
                <li {...props} >
                    <Box
                        // onClick={() => handleClickAddToOrder(option)}
                        sx={{
                            flexGrow: 1,
                            '& span': {
                                color: '#586069',
                            },
                        }}

                    >
                        {option.chFirstName} {option.chLastName}
                    </Box>
                </li>
            )}
        />
    );
}