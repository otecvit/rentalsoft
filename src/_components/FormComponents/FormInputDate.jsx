import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import ruLocale from 'date-fns/locale/ru';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



export const FormInputDate = ({ name, control, label, InputProps, fullWidth = true, rules = {} }) => {
    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ruLocale}
        >
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,

                }) => (
                    <DatePicker
                        mask='__.__.____'
                        renderInput={(params) => <TextField fullWidth={fullWidth} {...params} />}
                        helperText={error ? error.message : null}
                        error={!!error}
                        onChange={onChange}
                        value={value}

                        label={label}
                    />
                )}
            />
        </LocalizationProvider>
    );
};