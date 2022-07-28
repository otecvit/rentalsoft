import React from "react";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import FormControl from "@mui/material/FormControl";

export const FormInputSelectControlValue = ({
    name,
    control,
    defaultValue = "",
    children,
    label,
    size,
    labelId,
    onChange = () => { },
    value = ""
}) => {

    return (
        <Controller
            render={({ field }) => (
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel
                        shrink={true}
                        id={labelId}
                    >
                        {label}
                    </InputLabel>
                    <Select
                        {...field}
                        labelId={labelId}
                        label={label}
                        displayEmpty
                        notched={true}
                        size={size}
                        onChange={onChange}
                        value={value}
                    >
                        {children}
                    </Select>
                </FormControl>
            )}
            name={name}
            control={control}
            defaultValue={defaultValue}
        />
    );
};

