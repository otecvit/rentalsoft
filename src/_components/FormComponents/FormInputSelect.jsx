import React from "react";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

export const FormInputSelect = ({
  name,
  control,
  defaultValue,
  children,
}) => {
  return (
    <Controller
        render={({ field }) => (
            <Select {...field}>
                {children}
            </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
    />
  );
};

