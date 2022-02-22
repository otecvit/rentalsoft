import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { customerActions } from '../../_actions';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
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
    status: "normal",

    phones: [
      {
        number: "",
        type: "Mobile",
      },
    ],

    addresses: [
      {
        nameAddress: "Main",
        firstName: "1",
        lastName: "Mobile",
        addressLineOne: "",
        addressLineTwo: "",
        zipcode: "",
        city: "",
        region: "",
        country: ""
      },
      {
        nameAddress: "Saler",
        firstName: "Anton",
        lastName: "Barinov",
        addressLineOne: "",
        addressLineTwo: "",
        zipcode: "",
        city: "",
        region: "",
        country: ""
      },
      {
        nameAddress: "MainNet",
        firstName: "1",
        lastName: "Mobile",
        addressLineOne: "addressLineOne",
        addressLineTwo: "addressLineTwo",
        zipcode: "zipcode",
        city: "city",
        region: "region",
        country: "country"
      },

    ],

  };

function EditCustomerPage() {

    const [formValues, setFormValues] = useState(defaultValues);
    const [selectedBtn, setSelectedBtn] = useState(1);
    const [phonesArr, setPhone] = useState(defaultValues.phones);
    const [expanded, setExpanded] = React.useState('panel0');
    const dispatch = useDispatch();
    
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

    const handleAddAddress = () => {
      const tmpArr = {
        addresses: 
        [
          ...formValues.addresses, 
          {
            nameAddress: "Type address",
            firstName: "",
            lastName: "",
            addressLineOne: "",
            addressLineTwo: "",
            zipcode: "",
            city: "",
            region: "",
            country: ""
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

    const handleDelAddress = (index) => {
      setFormValues({
        ...formValues,
        addresses: [...formValues.addresses.filter((address, indexArr) => index !== indexArr )]
      });
    }

    const handleInputChangeAddress = (e) => {
      const { name, value } = e.target;
      const tmpArr = formValues.addresses.map((address, index) => {
        if (index === parseInt(name.split('[')[1].split(']')[0])) { // проверяем поле в котором вносятся изменения, дробим имя для поиска индекса
          return {
            ...address,
            [name.split('[')[0]]: value,
          }
        }
        return address;
      })
      setFormValues({
        ...formValues,
        addresses: [...tmpArr]
      });
    }
    
    const handleSubmit = (event) => {
      event.preventDefault();
      //console.log(formValues);
      dispatch(customerActions.insert(formValues));

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
                    
                    </Grid>
                    <Button variant="text" onClick={handleAddPhone} size="small">+ Add phone</Button>
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
                    <FormControl>
                      <Select
                        name="status"
                        label="Status"
                        value={formValues.status}
                        onChange={handleInputChange}
                      >
                        <MenuItem key="normal" value="normal">
                          Normal
                        </MenuItem>
                        <MenuItem key="active" value="active">
                          Active
                        </MenuItem>
                        <MenuItem key="negative " value="negative">
                          Negative
                        </MenuItem>
                      </Select>
                    </FormControl>
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
                                {address.nameAddress} { index > 0 && <IconButton onClick={() => handleDelAddress(index)}><RemoveIcon/></IconButton> }
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container spacing={2}>
                                {
                                  index > 0 &&
                                  <Grid item xs={12}>
                                    <TextField
                                      id={`nameAddress${index}`}
                                      name={`nameAddress[${index}]`}
                                      label="Type of address"
                                      type="text"
                                      size="small"
                                      variant="outlined"
                                      value={address.nameAddress}
                                      onChange={handleInputChangeAddress}
                                    />
                                  </Grid>
                                }
                                <Grid item xs={12}>
                                  <TextField
                                    id={`firstName${index}`}
                                    name={`firstName[${index}]`}
                                    label="First Name"
                                    type="text"
                                    size="small"
                                    variant="outlined"
                                    value={address.firstName}
                                    onChange={handleInputChangeAddress}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id={`lastName${index}`}
                                    name={`lastName[${index}]`}
                                    label="Last Name"
                                    type="text"
                                    size="small"
                                    variant="outlined"
                                    value={address.lastName}
                                    onChange={handleInputChangeAddress}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id={`addressLineOne${index}`}
                                    name={`addressLineOne[${index}]`}
                                    label="Address"
                                    type="text"
                                    size="small"
                                    variant="outlined"
                                    value={address.addressLineOne}
                                    onChange={handleInputChangeAddress}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id={`addressLineTwo${index}`}
                                    name={`addressLineTwo[${index}]`}
                                    label="Address"
                                    type="text"
                                    size="small"
                                    variant="outlined"
                                    value={address.addressLineTwo}
                                    onChange={handleInputChangeAddress}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id={`zipcode${index}`}
                                    name={`zipcode[${index}]`}
                                    label="Zipcode"
                                    type="text"
                                    size="small"
                                    variant="outlined"
                                    value={address.zipcode}
                                    onChange={handleInputChangeAddress}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id={`city${index}`}
                                    name={`city[${index}]`}
                                    label="City"
                                    type="text"
                                    size="small"
                                    variant="outlined"
                                    value={address.city}
                                    onChange={handleInputChangeAddress}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id={`region${index}`}
                                    name={`region[${index}]`}
                                    label="Region"
                                    type="text"
                                    size="small"
                                    variant="outlined"
                                    value={address.region}
                                    onChange={handleInputChangeAddress}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    id={`country${index}`}
                                    name={`country[${index}]`}
                                    label="Country"
                                    type="text"
                                    size="small"
                                    variant="outlined"
                                    value={address.country}
                                    onChange={handleInputChangeAddress}
                                  />
                                </Grid>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        );
                      })
                    }
                    <Button variant="text" onClick={handleAddAddress} size="small">+ Add address</Button>
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

/**
 zipcode: "zipcode",
        city: "city",
        region: "region",
        country: "country"
 
 */

export { EditCustomerPage };