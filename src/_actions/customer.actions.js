import { supportConstants, customerConstants } from '../_constants';
import { dataexchangeService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const customerActions = {
    load,
    add,
    edit,
    remove,
    clearCustomerState,
    loadDataCustomer,
};

function add(customer) {

    return dispatch => {
        dataexchangeService.add(customer, 'Customers/InsertCustomer.php', 'Customers/EditFileName.php')
            .then(
                customer => {
                    dispatch(request(customer));
                    dispatch(alertActions.success("Succes add"));
                    history.push('/customers');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(customer) { return { type: customerConstants.ADD_CUSTOMER, customer } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function clearCustomerState() {
    return { type: customerConstants.CLEAR_CUSTOMER, message: [] }
}

function load(user) {
    return dispatch => {
        dispatch(loading(true));
        dataexchangeService.load(user, 'Customers/LoadCustomers.php')
            .then(
                customers => {
                    dispatch(request(customers));
                    dispatch(loading(false));
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
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function remove(customer) {
    return dispatch => {
        dataexchangeService.remove(customer, 'Customers/RemoveCustomer.php')
            .then(
                customer => {
                    dispatch(request(customer));
                    dispatch(alertActions.success("Remove complete"));
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(customer) { return { type: customerConstants.REMOVE_CUSTOMER, customer } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}


function edit(customer) {

    return dispatch => {
        dataexchangeService.edit(customer, 'Customers/EditCustomer.php', 'Customers/EditFileName.php')
            .then(
                customer => {
                    dispatch(request(customer));
                    dispatch(alertActions.success("Succes edit"));
                    history.push('/customers');
                    //dispatch(request(inventory));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(customer) { return { type: customerConstants.EDIT_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion

}


function loadDataCustomer(companyToken) {

    return dispatch => {
        // включаем режим загрузки
        dispatch(loading(true));
        dataexchangeService.loadData(companyToken, 'Customers/LoadDataCustomer.php')
            .then(
                customers => {
                    dispatch(request(customers));
                    // включаем режим загрузки
                    dispatch(loading(false));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //dispatch(loading(false));
                }
            );

    };
    function request(customers) { return { type: customerConstants.LOAD_REQUEST_CUSTOMERS, customers } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

