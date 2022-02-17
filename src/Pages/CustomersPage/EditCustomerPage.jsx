import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';

const defaultValues = {
    name: "",
    age: 0,
    gender: "",
    os: "",
    favoriteNumber: 0,
    phones: [
      {
        number: "+375295188290",
        type: "Mobile",
      },
      {
        number: "+375297096096",
        type: "Mobile",
      },
    ],
  };

function EditCustomerPage() {

    const [formValues, setFormValues] = useState(defaultValues);
    const [selectedBtn, setSelectedBtn] = useState(1);
    const [phonesArr, setPhone] = useState(defaultValues.phones);
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    const handleAddPhone = () => {

      const tmpArr = {
        phones: 
        [
          ...formValues.phones, 
          {
            number: "",
            type: "Mobile",
          }
        ]
      };

      setFormValues({
        ...formValues,
        ...tmpArr
      });


    };

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formValues);
    };

    console.log(formValues);

    return (
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ButtonGroup disableElevation variant="contained" color="primary">
                      <Button color={selectedBtn === 1 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(1)}>Individual</Button>
                      <Button color={selectedBtn === 2 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(2)}>Company</Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="name-input"
                        name="name"
                        label="Customer name"
                        type="text"
                        variant="outlined"
                        size="small"
                        value={formValues.name}
                        onChange={handleInputChange}
                        fullWidth 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                    {
                      formValues.phones.map((phone, index) => {
                        return (
                          <Grid item xs={12} key={`phone${index}`}>
                            <TextField
                              id={`phone${index}`}
                              name={`phone${index}`}
                              label="Phone"
                              type="text"
                              size="small"
                              variant="outlined"
                              value={phone.number}
                            />
                            <IconButton>
                                      <RemoveIcon/>
                            </IconButton>
                          </Grid>
                        )                        
                      })
                    }
                    <Button variant="text" onClick={handleAddPhone} size="small">+ Add phone</Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="age-input"
                        name="age"
                        label="Age"
                        type="number"
                        value={formValues.age}
                        onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
            </form>
    );
}

export { EditCustomerPage };