import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import MUIRichTextEditor from 'mui-rte';

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

import { categoryActions } from '../../_actions';

import { FormInputText } from "../../_components/FormComponents/FormInputText";
import { DialogSelectCategory } from "../../_components/FormComponents/DialogSelectCategory";
import { FormInputSelect } from "../../_components/FormComponents/FormInputSelect";
import { FormInputNumber } from "../../_components/FormComponents/FormInputNumber";
//import { Previews } from '../../_components/FormComponents/DropZone';
import { CustomLayout } from '../../_components/FormComponents/DropZoneUploader';
import BoxStyled from '../../_components/StyledComponent/BoxStyled';
import BoxStyledTextEditor from '../../_components/StyledComponent/BoxStyledTextEditor';

import useSelection from "antd/lib/table/hooks/useSelection";

function NewInventoryPage() {

    const { handleSubmit, control, reset, setValue } = useForm({
        defaultValues: {
            name: "",
            article: "",
            identifier: "",
            category: "Select Category",
            countItem: "0",
        }
    });
    const [open, setOpen] = useState(false);
    const [selectedCategory, setCategory] = useState("");
    const [trackMethod, setTrackMethod] = React.useState("0");
    const user = useSelector(state => state.authentication.user);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        // загружаем категории
        dispatch(categoryActions.load({ companyToken: user.companyToken }));
    }, []);

    const SelectCategoryBtn = () => {
        return (
            <IconButton onClick={handleClickOpen} sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>);
    }



    /// ищем значение категории по id
    const findById = (array, id) => {
        var result;
        array.some(item => result = item.id === id ? item : findById(item.children || [], id));
        return result;
    };

    const handleOk = (currentCategory) => {
        // Записываем в форму
        setValue("category", findById(category, currentCategory).name);
        // сохраняем в state категоррию
        setCategory(currentCategory);
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
                            <BoxStyled>
                                <Typography variant="body2">
                                    Description
                                </Typography>
                                <BoxStyledTextEditor>
                                    <MUIRichTextEditor label="Start typing..." />
                                </BoxStyledTextEditor>
                            </BoxStyled>
                            <BoxStyled>
                                <Typography variant="body2">
                                    Images
                                </Typography>
                                <CustomLayout />
                            </BoxStyled>
                        </Paper>
                        <Paper elevation={0} variant="mainMargin">
                            <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 3, md: 3 }}>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputText name="identifier" control={control} label="Sell Price" />
                                </Grid>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputText name="identifier" control={control} label="Deposit Amount" />
                                </Grid>
                                <Grid item xs={12} sm={3} md={1}>
                                    <FormInputText name="identifier" control={control} label="Sales Tax" />
                                </Grid>
                            </Grid>
                            <BoxStyled>
                                <FormInputText name="identifier" control={control} label="Rental Price" />
                            </BoxStyled>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={0} variant="main">
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
                            <BoxStyled>
                                {
                                    trackMethod === "0" ?
                                        <FormInputNumber name="countItem" control={control} label="Count item" InputProps={{ inputProps: { min: 0, max: 100 } }} onChange={handleChangeCount} /> :
                                        <FormInputText name="identifier" control={control} label="Identifier" />
                                }
                            </BoxStyled>
                            <BoxStyled>
                                <FormInputText name="category" control={control} label="Category" InputProps={{ readOnly: true, endAdornment: <SelectCategoryBtn /> }} />
                                {open && <DialogSelectCategory data={category} handleOk={handleOk} handleClose={handleClose} />}
                            </BoxStyled>
                            <BoxStyled>
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
                            </BoxStyled>
                        </Paper>
                        <Paper elevation={0} variant="mainMargin">
                            <Typography variant="body2">
                                Shipping Params
                            </Typography>
                            <FormInputText name="identifier" control={control} label="Weight" />
                            <BoxStyled>
                                <FormInputText name="identifier" control={control} label="Height" />
                            </BoxStyled>
                            <BoxStyled>
                                <FormInputText name="identifier" control={control} label="Width" />
                            </BoxStyled>
                            <BoxStyled>
                                <FormInputText name="identifier" control={control} label="Length" />
                            </BoxStyled>
                        </Paper>
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