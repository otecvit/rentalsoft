import { supportConstants, tariffsConstants } from '../_constants';
import { tariffsService } from '../_services';
import { alertActions } from './';
import { supportActions } from './support.actions';

import { history } from '../_helpers';

export const tariffsActions = {
    add,
    load,
    loadOneTariff,
    remove,
    edit
};

function add(tariff) {

    return dispatch => {

        tariffsService.add(tariff)
            .then(
                tariff => {

                    dispatch(lastTariffId(tariff.id));
                    dispatch(request(tariff));
                    dispatch(alertActions.success("Succes add"));
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(tariff) { return { type: tariffsConstants.ADD_TARIFF, tariff } }
    function lastTariffId(tariffid) { return { type: supportConstants.LAST_TARIFF_INSERT, tariffid } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function load(tariffs) {
    return dispatch => {

        dispatch(loading(true));
        tariffsService.load(tariffs)
            .then(
                tariffs => {
                    dispatch(request(tariffs));
                    dispatch(loading(false));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );

    };
    function request(tariffs) { return { type: tariffsConstants.LOAD_REQUEST_TARIFFS, tariffs } }
    function success(customer) { return { type: categoryConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: tariffsConstants.INSERT_FAILURE_CUSTOMER, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function loadOneTariff(tariffs) {
    return dispatch => {
        tariffsService.loadOneTariff(tariffs)
            .then(
                tariffs => {
                    dispatch(request(tariffs));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );

    };
    function request(tariffs) { return { type: tariffsConstants.LOAD_REQUEST_TARIFFS, tariffs } }
    function success(customer) { return { type: categoryConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: categoryConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}



function remove(tariff) {

    return dispatch => {

        tariffsService.remove(tariff)
            .then(
                tariff => {
                    dispatch(request(tariff));
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(tariff) { return { type: tariffsConstants.REMOVE_TARIFF, tariff } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function edit(tariff) {

    return dispatch => {
        tariffsService.edit(tariff)
            .then(
                tariff => {
                    dispatch(request(tariff));
                    dispatch(alertActions.success("Succes edit"));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(tariff) { return { type: tariffsConstants.EDIT_TARIFF, tariff } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}


/*
function insert(customer) {
    return dispatch => {

        dispatch(request(customer));

        customerService.insert(customer)
            .then(
                customer => { 
                    dispatch(success());
                    //dispatch(success_login(customer)); // for redirect after registartion
                    history.push('/customers');
                    //history.push('/login');
                    //dispatch(alertActions.success('Registration successful'));
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(customer) { return { type: customerConstants.INSERT_REQUEST_CUSTOMER, customer } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function load(user) {
    return dispatch => {
        customerService.load(user)
            .then(
                customers => { 
                    dispatch(request(customers));
                    //dispatch(alertActions.success('Registration successful'));
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
        
    };

    function request(customers) { return { type: customerConstants.LOAD_REQUEST_CUSTOMERS, customers } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}
*/
