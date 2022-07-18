import React, { useEffect } from 'react';
import {
    TextField,
    Autocomplete,
    CircularProgress,
    Box,
    Button,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { useDispatch, useSelector } from 'react-redux';

import { servicesActions } from '../../../_actions';

export const AutocompleteSearchServices = ({ labelTitle = "Search to add", fnAddToBundle, data }) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [searchText, setSearchText] = React.useState('');
    const [onSkeleton, setSceleton] = React.useState(false);

    const dispatch = useDispatch();
    const services = useSelector(state => state.services);
    const support = useSelector(state => state.support);
    const user = useSelector(state => state.authentication.user);

    const loading = open && options.length === 0;

    useEffect(() => {

        if (!open) {
            setOptions([]);
            dispatch(servicesActions.clear());
        }
        else {
            dispatch(servicesActions.load({ chTokenCompany: user.chTokenCompany }));
        }

    }, [open])


    useEffect(() => {
        // статус загрузки
        if (services !== undefined && services.length != 0) {
            setSceleton(true);
            setOptions([...services]);
        }
        else
            setSceleton(false);
    }, [support.isLoading]);

    const handleClickAddToBundle = (option) => {
        fnAddToBundle(option);
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
                        <Button variant="contained" themecolor="rentalBtnAutocomplete" size="small" onClick={() => handleClickAddToBundle(option)}>
                            + Add to bundle
                        </Button>
                    </Box>
                </li>
            )}
        />
    );
}