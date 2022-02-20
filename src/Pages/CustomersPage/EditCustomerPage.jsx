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
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const defaultValues = {
    name: "",
    discount: 0,
    email: "",
    website: "",
    identificationNum: "",
    iSsuedOn: "",
    description: "",

    phones: [
      {
        number: "",
        type: "Mobile",
      },
    ],

    addresses: [
      {
        name: "1",
        type: "Mobile",
      },
      {
        name: "2",
        type: "Mobile",
      },
      {
        name: "3",
        type: "Mobile",
      },
    ],

  };

function EditCustomerPage() {

    const [formValues, setFormValues] = useState(defaultValues);
    const [selectedBtn, setSelectedBtn] = useState(1);
    const [phonesArr, setPhone] = useState(defaultValues.phones);
    const [expanded, setExpanded] = React.useState('panel0');
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    const handleInputChangePhone = (e) => { // меняем значение телефона
      const { name, value } = e.target;
      const tmpArr = formValues.phones.map((phone, index) => {
        if (index === parseInt(name)) { // проверяем поле в котором вносятся изменения
          return {
            number: value,
            type: "Mobile",
          }
        }
        return phone;
      })
      setFormValues({
        ...formValues,
        phones: [...tmpArr]
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

    const handleDelPhone = (index) => { // удаление номера телефона
      setFormValues({
        ...formValues,
        phones: [...formValues.phones.filter((phone, indexArr) => index !== indexArr )]
      });
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formValues);
    };

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };



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
                              name={`${index}`}
                              label="Phone"
                              type="text"
                              size="small"
                              variant="outlined"
                              value={phone.number}
                              onChange={handleInputChangePhone}
                            />
                            <IconButton onClick={() => handleDelPhone(index)}><RemoveIcon/></IconButton>
                          </Grid>
                        )                        
                      })
                    }
                    <Button variant="text" onClick={handleAddPhone} size="small">+ Add phone</Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="discount-input"
                        name="discount"
                        label="Discount Persent"
                        type="number"
                        value={formValues.discount}
                        onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="email-input"
                        name="email"
                        label="Email"
                        type="text"
                        variant="outlined"
                        size="small"
                        value={formValues.email}
                        onChange={handleInputChange}
                        fullWidth 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="website-input"
                        name="website"
                        label="Website"
                        type="text"
                        variant="outlined"
                        size="small"
                        value={formValues.website}
                        onChange={handleInputChange}
                        fullWidth 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="identificationNum-input"
                        name="identificationNum"
                        label="Identification No"
                        type="text"
                        variant="outlined"
                        size="small"
                        value={formValues.identificationNum}
                        onChange={handleInputChange}
                        fullWidth 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="iSsuedOn-input"
                        name="iSsuedOn"
                        label="Issued On"
                        type="text"
                        variant="outlined"
                        size="small"
                        value={formValues.iSsuedOn}
                        onChange={handleInputChange}
                        fullWidth 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="description-input"
                        name="description"
                        label="Description"
                        type="text"
                        variant="outlined"
                        size="small"
                        value={formValues.description}
                        onChange={handleInputChange}
                        fullWidth 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {
                      formValues.addresses.map((address, index) => {
                        return (
                          <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} key={`panel${index}`}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`panel${index}-content`}
                              id={`panel${index}bh-header`}
                            >
                              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Main address
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                Aliquam eget maximus est, id dignissim quam.
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        );
                      })
                    }
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