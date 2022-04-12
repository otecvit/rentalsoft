import React, { Fragment, useCallback, useState } from "react";
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

import { FormInputText } from "../../_components/FormComponents/FormInputText";
import { FormInputNumber } from "../../_components/FormComponents/FormInputNumber";
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function EditInventoryPage() {

  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      article: "",
      identifier: "",
      category: "Select category",
      countItem: "0",
    }
  });

  const [numTab, setChangeTab] = React.useState(2);
  const [trackMethod, setTrackMethod] = React.useState("0");


  const handleChangeTab = (event, newValue) => {
    setChangeTab(newValue);
  };

  const handleChangeTrackMethod = (event) => {
    setTrackMethod(event.target.value)
  }



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

  const handleChangeCount = () => {
    console.log("fsd");
  }

  const onSubmit = data => {
    console.log(trackMethod);
    console.log(data);
  }

  const SelectCategoryBtn = () => {
    return (
      <IconButton onClick={handleClickOpen} sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={numTab} onChange={handleChangeTab} aria-label="basic tabs example">
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Details" {...a11yProps(1)} />
          <Tab label="Status" {...a11yProps(2)} />
          <Tab label="Pricing" {...a11yProps(3)} />
          <Tab label="History" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={numTab} index={0}>
        <Container maxWidth="lg">
          <Paper
            style={{
              display: "grid",
              gridRowGap: "20px",
              padding: "20px",
              margin: "10px 10px",
            }}
          >
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
          <Paper
            style={{
              display: "grid",
              gridRowGap: "20px",
              padding: "20px",
              margin: "10px 10px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <Typography variant="h6" gutterBottom component="div">Tracking method</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Box
                  style={{
                    display: "grid",
                    gridRowGap: "20px",
                  }}
                >
                  <RadioGroup
                    defaultValue="individual"
                    name="radio-buttons-group"
                    value={trackMethod}
                    onChange={handleChangeTrackMethod}
                  >
                    <FormControlLabel value="0" control={<Radio />} label="Individual item" />
                    <FormControlLabel value="1" control={<Radio />} label="Group items" />
                  </RadioGroup>
                  {trackMethod === "0" ?
                    <FormInputText name="identifier" control={control} label="Identifier" /> :
                    <FormInputNumber name="countItem" control={control} label="Count item" InputProps={{ inputProps: { min: 0, max: 100 } }} onChange={handleChangeCount} />
                  }
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
            Save
          </Button>

        </Container>
      </TabPanel>
      <TabPanel value={numTab} index={1}>
        <Container maxWidth="lg">
          <Paper
            style={{
              display: "grid",
              gridRowGap: "20px",
              padding: "20px",
              margin: "10px 10px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <Typography variant="h6" gutterBottom component="div">Description</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Box
                  style={{
                    display: "grid",
                    gridRowGap: "20px",
                  }}
                >
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Paper
            style={{
              display: "grid",
              gridRowGap: "20px",
              padding: "20px",
              margin: "10px 10px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <Typography variant="h6" gutterBottom component="div">Images</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Box
                  style={{
                    display: "grid",
                    gridRowGap: "20px",
                  }}
                >
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Paper
            style={{
              display: "grid",
              gridRowGap: "20px",
              padding: "20px",
              margin: "10px 10px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <Typography variant="h6" gutterBottom component="div">Options</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Box
                  style={{
                    display: "grid",
                    gridRowGap: "20px",
                  }}
                >
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </TabPanel>
      <TabPanel value={numTab} index={2}>
        <Container maxWidth="lg">
          <Paper
            style={{
              display: "grid",
              gridRowGap: "20px",
              padding: "20px",
              margin: "10px 10px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <Typography variant="h6" gutterBottom component="div">Current status</Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Box
                  style={{
                    display: "grid",
                    gridRowGap: "20px",
                  }}
                >
                  {trackMethod === "0" ?
                    <Fragment>In stock</Fragment> :
                    <Fragment>
                      In stock - <br />
                      Reserved <br />
                      Repair <br />
                      Total
                    </Fragment>
                  }
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Paper
            style={{
              display: "grid",
              gridRowGap: "20px",
              padding: "20px",
              margin: "10px 10px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography variant="h6" gutterBottom component="div">Rental progress</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box
                  style={{
                    display: "grid",
                    gridRowGap: "20px",
                  }}
                >
                  Table rental progress ( Start time | Client |	Inventories |	Сумма	| Paid |	Admin |	Closed )
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </TabPanel>
      <TabPanel value={numTab} index={3}>
        Item Three
      </TabPanel>
      <TabPanel value={numTab} index={4}>
        Item Three
      </TabPanel>
    </Box>





  );

}

export { EditInventoryPage }


/*
<FormInputSelect
                                id="status"
                                name="status"
                                control={control}
                                defaultValue=""
                                variant="outlined"
                                margin="normal"
                                label="Status"
                                labelId="status-label-id"
                              >
                                  <MenuItem value="">Select status</MenuItem>
                                  <MenuItem value="servidor">1</MenuItem>
                                  <MenuItem value="clt">2</MenuItem>
                                  <MenuItem value="autonomo">3</MenuItem>
                                  <MenuItem value="desempregado">4</MenuItem>
                                  <MenuItem value="empresario">5</MenuItem>
                              </FormInputSelect>

*/