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
import { consumablesActions } from '../../../_actions';

export const AutocompleteSearchConsumables = ({ labelTitle = "Search to add", fnAddToBundle, data }) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [searchText, setSearchText] = React.useState('');
    const [onSkeleton, setSceleton] = React.useState(false);

    const dispatch = useDispatch();
    const consumables = useSelector(state => state.consumables);
    const support = useSelector(state => state.support);
    const user = useSelector(state => state.authentication.user);

    const loading = open && options.length === 0;

    useEffect(() => {

        if (!open) {
            setOptions([]);
            dispatch(consumablesActions.clear());
        }
        else {
            dispatch(consumablesActions.load({ chTokenCompany: user.chTokenCompany }));
        }
    }, [open])


    useEffect(() => {
        // статус загрузки
        if (consumables !== undefined && consumables.length != 0) {
            setSceleton(true);
            setOptions([...consumables]);
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