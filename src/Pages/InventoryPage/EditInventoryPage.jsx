import React, { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import TreeItem from '@mui/lab/TreeItem';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { FormInputText } from "../../_components/FormComponents/FormInputText";
import { FormInputSelect } from "../../_components/FormComponents/FormInputSelect";
import { DialogSelectCategory } from "../../_components/FormComponents/DialogSelectCategory";


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

function EditInventoryPage() {

    const { handleSubmit, control, reset, setValue } = useForm({
        defaultValues: { 
            name: "",
            article: "",
            identifier: "",
            category: "Uncategorized",
        }
      });

      const [open, setOpen] = useState(false);
      
      const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleOk = (currentCategory) => {
        setValue("category", currentCategory);
        setOpen(false);
    }

    const onSubmit = data => console.log(data);

    const SelectCategoryBtn = () => {
        return (
        <IconButton onClick={handleClickOpen} sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>);
    }
    
    return (
        <Paper
            style={{
            display: "grid",
            gridRowGap: "20px",
            padding: "20px",
            margin: "10px 300px",         
            }}
        >
            <FormInputText name="name" control={control} label="Name" />
            <FormInputText name="article" control={control} label="Article" />
            <FormInputText name="identifier" control={control} label="Identifier" />
            <FormInputSelect
              id="profissao"
              name="profissao"
              control={control}
              defaultValue=""
              variant="outlined"
              margin="normal"
            >
                <MenuItem value="">Select category</MenuItem>
                <MenuItem value="servidor">Servidor Público</MenuItem>
                <MenuItem value="clt">CLT Empresa Privada</MenuItem>
                <MenuItem value="autonomo">Autônomo</MenuItem>
                <MenuItem value="desempregado">Desempregado</MenuItem>
                <MenuItem value="empresario">Empresário</MenuItem>
            </FormInputSelect>
            <FormInputText name="category" control={control} label="Category"  InputProps={{ readOnly: true, endAdornment: <SelectCategoryBtn /> }}/>
            { open && <DialogSelectCategory data={data} handleOk={handleOk} handleClose={handleClose} /> }
             <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
                Save
            </Button>
        </Paper>

    );

}

export { EditInventoryPage } 
