import React, { Fragment, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TreeItem from '@mui/lab/TreeItem';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { InventoryComponent } from '../InventoryPage/InventoryComponent';
import { FormInputText } from "../../_components/FormComponents/FormInputText";
import { FormInputNumber } from "../../_components/FormComponents/FormInputNumber";
import { FormInputSelect } from "../../_components/FormComponents/FormInputSelect";
import { DialogSelectCategory } from "../../_components/FormComponents/DialogSelectCategory";




function EditInventoryPage() {
  let { chTokenInventory } = useParams();


  return (
    <Box>
      <InventoryComponent chTokenInventory={chTokenInventory} actions="edit" />
    </Box>
  );

}

export { EditInventoryPage }