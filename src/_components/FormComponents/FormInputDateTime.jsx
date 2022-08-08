import React, { useState } from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import ruLocale from 'date-fns/locale/ru';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



export const FormInputDateTime = ({ name, control, label, InputProps, fullWidth = true, rules = {} }) => {

    const [open, setOpen] = useState(false);

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
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        mask='__.__.____'
                        renderInput={(params) =>
                            <TextField
                                fullWidth={fullWidth}
                                onClick={(e) => setOpen(true)}
                                {...params}
                            />
                        }
                        disableOpenPicker
                        helperText={error ? error.message : null}
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        inputProps={{
                            readOnly: true,
                        }}
                        label={label}
                        componentsProps={{
                            actionBar: { actions: ["clear", "today", "cancel", "accept"] },
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    );
};

{/* <DateTimePicker
                        mask='__.__.____ __:__'
                        renderInput={(params) => <TextField fullWidth={fullWidth} onBlur={() => { console.log("onBlur") }} {...params} />}
                        helperText={error ? error.message : null}
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        onClose={() => { console.log("onClose") }}
                        onAccept={() => { console.log("onAccept") }}
                        onError={() => { console.log("onError") }}
                        maxDate={new Date('2035-01-01')}
                        label={label}
                    /> */}