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

const defaultValues = {
    name: "",
    age: 0,
    gender: "",
    os: "",
    favoriteNumber: 0,
  };

function EditCustomerPage() {

    const [formValues, setFormValues] = useState(defaultValues);
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
    const handleSliderChange = (name) => (e, value) => {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formValues);
    };
    return (
            <form onSubmit={handleSubmit}>
                
                <TextField
                    id="name-input"
                    name="name"
                    label="Name"
                    type="text"
                    value={formValues.name}
                    onChange={handleInputChange}
                />
                <TextField
                    id="age-input"
                    name="age"
                    label="Age"
                    type="number"
                    value={formValues.age}
                    onChange={handleInputChange}
                />
                <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
                    

                
            </form>
    );
}

export { EditCustomerPage };