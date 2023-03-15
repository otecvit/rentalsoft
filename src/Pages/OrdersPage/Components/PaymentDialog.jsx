import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';

import BoxStyled from '../../../_components/StyledComponent/BoxStyled';
import BoxStyledTop from '../../../_components/StyledComponent/BoxStyledTop';
import BoxStyledBorderTop from '../../../_components/StyledComponent/BoxStyledBorderTop';
import { FormInputText } from "../../../_components/FormComponents/FormInputText";
import { FormInputDateTime } from "../../../_components/FormComponents/FormInputDateTime";
import { FormInputSelect } from "../../../_components/FormComponents/FormInputSelect";

import {
    Button,
    Dialog,
    InputAdornment,
    Typography,
    MenuItem,
    Grid,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';

function getDateTime(dDateTime, type, addMin) {
    var start = moment();
    if (dDateTime) start = moment(dDateTime);
    const remainder = 15 - start.minute() % 15 + addMin;
    const dateReturn = moment(start).add(remainder, "minutes").format("YYYY-MM-DD");
    const timeReturn = moment(start).add(remainder, "minutes").format("HH:mm");
    if (type === 1) return dateReturn + 'T' + timeReturn;
    else return timeReturn
}

export const PaymentDialog = ({ open, close, submit, data }) => {

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues
    } = useForm({
        defaultValues: {
            chAmount: "",
            chSecurityDeposit: "",
            chDatePayment: getDateTime("", 1, 0),
            chTokenMethod: "cash",
            chComment: "",
        }
    });

    useEffect(() => {
        setValue("chAmount", data.chAmount);
        setValue("chSecurityDeposit", data.chSecurityDeposit);
    }, [])

    const handleCloseDialog = () => {
        close();
    }

    const handleSubmitPay = (data) => {
        submit(data)
    }

    const toCurrency = new Intl.NumberFormat("be", {
        style: "currency",
        currency: "BYN",

    });

    return (
        <>
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                fullWidth={true}
                maxWidth={'md'}
            >
                <DialogTitle>Payment</DialogTitle>
                <DialogContent>
                    <Grid container spacing={{ xs: 3, md: 4 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                        <Grid item xs={12} md={4}>
                            <BoxStyledTop>
                                <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                    <Grid item xs={12} md={6}>
                                        Amount
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography align="right">{toCurrency.format(data.chAmount)}</Typography>
                                    </Grid>
                                </Grid>
                            </BoxStyledTop>
                            <BoxStyled>
                                <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                    <Grid item xs={12} md={6}>
                                        Security deposit
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography align="right">{toCurrency.format(data.chSecurityDeposit)}</Typography>
                                    </Grid>
                                </Grid>
                            </BoxStyled>
                            <BoxStyledBorderTop>
                                <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                    <Grid item xs={12} md={6}>
                                        Total
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography align="right">16.00 BYN</Typography>
                                    </Grid>
                                </Grid>
                            </BoxStyledBorderTop>
                            <BoxStyled>
                                <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                    <Grid item xs={12} md={6}>
                                        Paid
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography align="right">0.00 BYN</Typography>
                                    </Grid>
                                </Grid>
                            </BoxStyled>
                            <BoxStyledBorderTop>
                                <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                    <Grid item xs={12} md={6}>
                                        Outstanding
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography align="right">16.00 BYN</Typography>
                                    </Grid>
                                </Grid>
                            </BoxStyledBorderTop>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <BoxStyledTop>
                                <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                    <Grid item xs={12} md={6}>
                                        <FormInputText name="chAmount" control={control} label="Amount" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormInputText name="chSecurityDeposit" control={control} label="Security deposit" />
                                    </Grid>
                                </Grid>
                            </BoxStyledTop>
                            <BoxStyled>
                                <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }}>
                                    <Grid item xs={12} md={6}>
                                        <FormInputDateTime
                                            label="Date payment"
                                            name="chDatePayment"
                                            type="datetime-local"
                                            control={control}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormInputSelect
                                            label="Payment method"
                                            name="chTokenMethod"
                                            control={control}
                                            defaultValue=""
                                            variant="outlined"
                                            margin="normal"
                                            labelId="rental-return-time"
                                        >
                                            <MenuItem value="cash">Cash</MenuItem>
                                            <MenuItem value="check">Check</MenuItem>
                                            <MenuItem value="other">Other</MenuItem>
                                        </FormInputSelect>
                                    </Grid>
                                </Grid>
                            </BoxStyled>
                            <BoxStyled>
                                <FormInputText name="chComment" control={control} label="Comments" multiline={true} />
                            </BoxStyled>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 1, sm: 12, md: 12 }} justifyContent="flex-end">
                        <Grid item xs={12} md={3}>
                            <BoxStyledTop>
                                <Button variant="contained" themecolor="rentalThemeCancel" size="large" onClick={handleCloseDialog}>
                                    Cancel
                                </Button>
                            </BoxStyledTop>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <BoxStyledTop>
                                <Button variant="contained" themecolor="rentalThemeSubmit" size="large" onClick={handleSubmit(handleSubmitPay)}>
                                    Register payment
                                </Button>
                            </BoxStyledTop>
                        </Grid>
                    </Grid>

                </DialogActions>
            </Dialog>
        </>
    );

}
