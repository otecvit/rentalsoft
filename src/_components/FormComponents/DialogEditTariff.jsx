import React, { useState } from 'react';

import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';

import {
    Box,
    Stack,
    MenuItem,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { FormInputText } from '../FormComponents/FormInputText';
import { FormInputSelect } from '../FormComponents/FormInputSelect';

export const DialogEditTarif = ({ data, handleOk, handleClose }) => {

    const [open, setOpen] = useState(true);
    const { handleSubmit, control, reset, setValue } = useForm(
        {
            defaultValues: {
                id: "",
                name: "",
                tariffDetail: [{ label: "", duration: "", period: "1", price: "" }],
                periodExtra: "1",
                priceExtra: "",
            }
        }
    );

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "tariffDetail",
    });

    const handleAddTariffDetail = () => {
        append({
            label: "",
            duration: "",
            period: "1",
            price: ""
        })
    }

    const handleCloseChild = (event, reason) => {
        handleClose();
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleOkChild = (data) => {
        setOpen(false);
        handleOk(data); // функция callback родителя
    }

    return (
        <Dialog
            open={open}
            onClose={handleCloseChild}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title"> User </DialogTitle>
            <DialogContent>
                <Stack direction="row" spacing={2} sx={{ paddingTop: "10px" }}>
                    <FormInputText label="Template name" name="name" control={control} variant="outlined" />
                </Stack>
                {
                    fields.map((item, index) => {
                        return (
                            <Stack direction="row" spacing={2} key={index} sx={{ paddingTop: "20px" }}>
                                <FormInputText name={`tariffDetail[${index}].label`} control={control} label="Label" value={item.label} />
                                <FormInputText name={`tariffDetail[${index}].duration`} control={control} label="Duration" value={item.duration} />
                                <Box>
                                    <FormInputSelect
                                        id={`period${index}`}
                                        name={`tariffDetail[${index}].period`}
                                        control={control}
                                        defaultValue={item.period}
                                        variant="outlined"
                                        margin="normal"
                                        label="Period"
                                        labelId="rental-period-id"
                                        size="small"
                                    >
                                        <MenuItem value="1">Hours</MenuItem>
                                        <MenuItem value="2">Days</MenuItem>
                                        <MenuItem value="3">Weeks</MenuItem>
                                        <MenuItem value="4">Months</MenuItem>
                                    </FormInputSelect>
                                </Box>
                                <FormInputText name={`tariffDetail[${index}].price`} control={control} label="Price" value={item.price} />
                                <IconButton aria-label="delete" onClick={() => handleDelTariffDetail(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>)
                    })
                }
                <Button onClick={handleAddTariffDetail}>Add row</Button>
                <Box sx={{ minWidth: '90px' }}>
                    <Typography variant="p" component="div">Each extra</Typography>
                </Box>
                <Stack direction="row" spacing={2} sx={{ paddingTop: "20px" }}>
                    <Box>
                        <FormInputSelect
                            id={`periodEachExtra`}
                            name={`periodExtra`}
                            control={control}
                            variant="outlined"
                            margin="normal"
                            label="Period"
                            labelId="rental-each-extra"
                            size="small"
                        >
                            <MenuItem value="1">Hours</MenuItem>
                            <MenuItem value="2">Days</MenuItem>
                            <MenuItem value="3">Weeks</MenuItem>
                            <MenuItem value="4">Months</MenuItem>
                        </FormInputSelect>
                    </Box>
                    <FormInputText name="priceExtra" control={control} label="Price" />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseChild} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit(handleOkChild)} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}