import React, { useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../_actions';
import { history } from '../../_helpers';

import { LoginPage } from '../AuthenticationPage/LoginPage'
import { RegisterPage } from '../AuthenticationPage/RegisterPage'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


function AuthenticationPage() {

    const alert = useSelector(state => state.alert);
    
    const dispatch = useDispatch();


    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    
    return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh', backgroundColor: '#f9fbfd' }}
                >

                    <Grid 
                        item 
                        xs={12}
                        style={{ backgroundColor: '#ffffff', borderRadius: '0.35em' }}
                    >
                    {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }         
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                    </Switch>
                </Grid>   

            </Grid>
      );
}

export { AuthenticationPage };