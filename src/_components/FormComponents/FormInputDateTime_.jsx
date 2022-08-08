import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const FormInputDateTime = ({ name, control, label, InputProps, fullWidth = true, rules = {}, type = "datetime-local" }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,

            }) => (
                <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    type={type}
                    value={value}
                    fullWidth={fullWidth}
                    label={label}
                    inputProps={InputProps}
                    InputLabelProps={{
                        shrink: true,
                    }}

                />

            )}
        />
    );
};

// <TextField
//                     helperText={error ? error.message : null}
//                     error={!!error}
//                     onChange={onChange}
//                     defaultValue={defaultValue}
//                     value={value}
//                     fullWidth={fullWidth}
//                     label={label}
//                     InputProps={InputProps}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                 />