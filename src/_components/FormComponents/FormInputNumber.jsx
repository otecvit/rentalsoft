import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const FormInputNumber = ({ name, control, label = "", size = "normal", InputProps, sx = {}, disabled = false }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          disabled={disabled}
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          InputProps={InputProps}
          size={size}
          sx={sx}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
};