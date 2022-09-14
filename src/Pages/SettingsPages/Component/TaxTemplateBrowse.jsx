import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

export const TaxTemplateBrowse = () => {


    const user = useSelector(state => state.authentication.user);
    const taxes = useSelector(state => state.taxes);


    return (
        <>
            Пипирка
        </>
    )

}