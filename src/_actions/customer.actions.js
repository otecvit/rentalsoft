import { supportConstants, customerConstants } from '../_constants';
import { customerService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const customerActions = {
    load,
    add,
    clearCustomerState,
    loadDataCustomer,
};

function add(customer) {

    return dispatch => {
        customerService.add(customer)
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

function loadDataCustomer(companyToken) {

    return dispatch => {
        // включаем режим загрузки
        dispatch(loading(true));
        customerService.loadDataCustomer(companyToken)
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

