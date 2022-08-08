import React, { useState } from "react";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { styled } from "@mui/material/styles";

import moment from "moment";

export const FormInputTime = ({ name, control, label, InputProps, fullWidth = true, rules = {}, type = "datetime-local" }) => {

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
                <TimePickerComponent></TimePickerComponent>
                // <DatePicker
                //     showTimeOnly
                // helperText={error ? error.message : null}
                // error={!!error}
                // onChange={onChange}
                // type={type}
                // value={value}
                // fullWidth={fullWidth}
                // label={label}
                // inputProps={InputProps}
                // InputLabelProps={{
                //     shrink: true,
                // }}

                // />

            )}
        />
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

        //             <Controller
        //     render={({ field }) => (
        //         <FormControl sx={{ width: "100%" }}>
        //             <InputLabel
        //                 shrink={true}
        //                 id={labelId}
        //             >
        //                 {label}
        //             </InputLabel>
        //             <Select
        //                 {...field}
        //                 labelId={labelId}
        //                 label={label}
        //                 displayEmpty
        //                 notched={true}
        //                 size={size}
        //             >
        //                 {children}
        //             </Select>
        //         </FormControl>
        //     )}
        //     name={name}
        //     control={control}
        //     defaultValue={defaultValue}
        // />