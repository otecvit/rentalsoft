import { supportConstants, taxesConstants } from '../_constants';
import { taxesService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const taxesActions = {
    edit,
    add,
    remove,
    load,
    clear
};

function edit(tax) {

    return dispatch => {
        dispatch(loading(true));
        taxesService.edit(tax)
            .then(
                tax => {
                    dispatch(request(tax));
                    dispatch(loading(false));
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(tax) { return { type: taxesConstants.EDIT_TAX, tax } }
    function failure(error) { return { type: taxesConstants.INSERT_FAILURE_TAXES, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function add(tax) {

    return dispatch => {
        dispatch(loading(true));
        taxesService.add(tax)
            .then(
                tax => {

                    dispatch(request(tax));
                    dispatch(loading(false));
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(tax) { return { type: taxesConstants.ADD_TAX, tax } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}


function remove(tax) {

    return dispatch => {
        dispatch(loading(true));
        taxesService.remove(tax)
            .then(
                tax => {
                    dispatch(request(tax));
                    dispatch(loading(false));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(tax) { return { type: taxesConstants.REMOVE_TAX, tax } }
    function success(customer) { return { type: categoryConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: categoryConstants.INSERT_FAILURE_CUSTOMER, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function clear() {
    return { type: taxesConstants.CLEAR_TAXES, message: [] }
}

function load(taxes) {

    return dispatch => {
        taxesService.load(taxes)
            .then(
                taxes => {
                    dispatch(request(taxes));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );

    };

    function request(taxes) { return { type: taxesConstants.LOAD_REQUEST_TAXES, taxes } }
    function success(customer) { return { type: taxesConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: taxesConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}
