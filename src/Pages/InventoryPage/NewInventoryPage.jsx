import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
    Container,
    Box,
    Paper,
    Grid,
    Typography,
    MenuItem,
    IconButton,
    RadioGroup,
    Radio,
    FormControlLabel
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { styled } from '@mui/system';

import { FormInputText } from "../../_components/FormComponents/FormInputText";
import { DialogSelectCategory } from "../../_components/FormComponents/DialogSelectCategory";
import { FormInputSelect } from "../../_components/FormComponents/FormInputSelect";
import { FormInputNumber } from "../../_components/FormComponents/FormInputNumber";


const data = {
    id: 'root',
    name: 'Parent',
    children: [
        {
            id: '1',
            name: 'Child - 1',
        },
        {
            id: '3',
            name: 'Child - 3',
            children: [
                {
                    id: '4',
                    name: 'Child - 4',
                },
            ],
        },
    ],
};

const RadioGroupComponent = styled('div')({
    margin: '24px 0px 0px',
});

function NewInventoryPage() {

    const { handleSubmit, control, reset, setValue } = useForm({
        defaultValues: {
            name: "",
            article: "",
            identifier: "",
            category: "Select category",
            countItem: "0",
        }
    });
    const [open, setOpen] = useState(false);
    const [trackMethod, setTrackMethod] = React.useState("0");

    const SelectCategoryBtn = () => {
        return (
            <IconButton onClick={handleClickOpen} sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>);
    }

    const handleOk = (currentCategory) => {
        setValue("category", currentCategory);
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChangeTrackMethod = (event) => {
        setTrackMethod(event.target.value)
    }

    const handleChangeCount = () => {

    }




    return (
        <Box>
            <Container maxWidth="lg">
                <Box>
                    Create a new product
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={0} variant="main">
                            <FormInputText name="name" control={control} label="Product name" />
                            <RadioGroupComponent>
                                <Typography variant="body2">
                                    Product Tracking
                                </Typography>
                                <RadioGroup
                                    defaultValue="individual"
                                    name="radio-buttons-group"
                                    value={trackMethod}
                                    onChange={handleChangeTrackMethod}
                                    row
                                >
                                    <FormControlLabel value="0" control={<Radio />} label="Group items" />
                                    <FormControlLabel value="1" control={<Radio />} label="Individual item" />
                                </RadioGroup>
                            </RadioGroupComponent>
                            {
                                trackMethod === "0" ?
                                    <FormInputNumber name="countItem" control={control} label="Count item" InputProps={{ inputProps: { min: 0, max: 100 } }} onChange={handleChangeCount} /> :
                                    <FormInputText name="identifier" control={control} label="Identifier" />
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        xs=6 md=8
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );

    /*

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 10 }}>
                <Paper elevation={1} sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <Typography variant="h6" gutterBottom component="div">Basic details</Typography>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <Box
                                style={{
                                    display: "grid",
                                    gridRowGap: "20px",
                                }}
                            >
                                <FormInputText name="name" control={control} label="Product name" />
                                <FormInputText name="category" control={control} label="Category" InputProps={{ readOnly: true, endAdornment: <SelectCategoryBtn /> }} />
                                {open && <DialogSelectCategory data={data} handleOk={handleOk} handleClose={handleClose} />}
                                <FormInputSelect
                                    id="profissao"
                                    name="profissao"
                                    control={control}
                                    defaultValue=""
                                    variant="outlined"
                                    margin="normal"
                                    label="Rental Location"
                                    labelId="rental-location-label-id"
                                >
                                    <MenuItem value="">Select rental location</MenuItem>
                                    <MenuItem value="servidor">1</MenuItem>
                                    <MenuItem value="clt">2</MenuItem>
                                    <MenuItem value="autonomo">3</MenuItem>
                                    <MenuItem value="desempregado">4</MenuItem>
                                    <MenuItem value="empresario">5</MenuItem>
                                </FormInputSelect>
                                <FormInputText name="sku" control={control} label="SKU" />

                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    )
    */
}

export { NewInventoryPage }