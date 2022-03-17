import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { customerActions } from '../../_actions';


import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';


function BrowseInventoryPage() {
    const history = useHistory();

    const customers = useSelector(state => state.customers);
    const user = useSelector(state => state.authentication.user);

    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const dispatch = useDispatch();

    const handleAddCustomer = () => { 
        let path = `/inventory/new`; 
        history.push(path);
    }

    const handleMenuItemClick = (event,) => {
        let path = `/inventory/new_group`; 
        history.push(path);
        setOpen(false);
    };

    
    useEffect(() => {
      // загружаем данные клиентов
      
      //dispatch(customerActions.load({ token: user.token }));  
    }, []);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }
        setOpen(false);
    };

    return (
        <Grid container spacing={2}>
             <Grid item xs={12}>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddCustomer}>
                        New inventory
                    </Button>
                    <Button
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                        transformOrigin:
                            placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu">
                                <MenuItem
                                    onClick={(event) => handleMenuItemClick(event)}
                                >
                                    New group inventory
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
            </Grid>
            <Grid item xs={12}>
                Browse Inventory
            </Grid>
        </Grid> 
    );

}

export { BrowseInventoryPage };