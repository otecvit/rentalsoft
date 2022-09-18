import { taxesConstants } from '../_constants';
import { taxesService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const taxesActions = {
    edit,
    add,
    remove,
    load
};

function edit(tax) {

    return dispatch => {
        taxesService.edit(tax)
            .then(
                tax => {
                    dispatch(request(tax));
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(taxe) { return { type: taxesConstants.EDIT_TAXES, taxe } }
    function success(customer) { return { type: taxesConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: taxesConstants.INSERT_FAILURE_TAXES, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function add(tax) {

    return dispatch => {
        taxesService.add(tax)
            .then(
                tax => {
                    dispatch(request(tax));
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(taxe) { return { type: taxesConstants.ADD_TAXES, taxe } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}


function remove(tax) {


    return dispatch => {
        dispatch(request(tax));
        taxesService.remove(tax)
            .then(
                taxes => {
                    console.log("----", taxes);
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );


    };

    function request(category) { return { type: categoryConstants.REMOVE_CATEGORY, category } }
    function success(customer) { return { type: categoryConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: categoryConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}


function load(taxes) {

    return dispatch => {
        taxesService.load(taxes)
            .then(
                taxes => {

                    dispatch(request(taxes));
                    //dispatch(alertActions.success('Registration successful'));

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
