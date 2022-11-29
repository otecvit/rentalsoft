import { supportConstants, templatesConstants } from '../_constants';
import { templatesService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const templatesActions = {
    edit,
    add,
    remove,
    load,
    loadData,
    clear
};

function edit(templates) {

    return dispatch => {
        dispatch(loading(true));
        templatesService.edit(templates)
            .then(
                templates => {
                    dispatch(request(templates));
                    dispatch(loading(false));
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(templates) { return { type: templatesConstants.EDIT_TEMPLATES, templates } }
    function failure(error) { return { type: templatesConstants.INSERT_FAILURE_TEMPLATES, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function add(templates) {

    return dispatch => {
        dispatch(loading(true));
        templatesService.add(templates)
            .then(
                templates => {
                    dispatch(request(templates));
                    dispatch(loading(false));
                    dispatch(alertActions.success("Succes add"));
                    history.push('/settings/templates');
                    //dispatch(success());
                },
                error => {
                    //dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(templates) { return { type: templatesConstants.ADD_TEMPLATES, templates } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}


function remove(templates) {

    return dispatch => {
        dispatch(loading(true));
        templatesService.remove(templates)
            .then(
                templates => {
                    dispatch(request(templates));

                    dispatch(loading(false));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(templates) { return { type: templatesConstants.REMOVE_TEMPLATES, templates } }
    function success(customer) { return { type: categoryConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: categoryConstants.INSERT_FAILURE_CUSTOMER, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function clear() {
    return { type: templatesConstants.CLEAR_TEMPLATES, message: [] }
}

function load(templates) {


    return dispatch => {
        dispatch(loading(true));
        templatesService.load(templates)
            .then(
                templates => {
                    dispatch(request(templates));
                    dispatch(loading(false));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );

    };

    function request(templates) { return { type: templatesConstants.LOAD_REQUEST_TEMPLATES, templates } }
    function success(customer) { return { type: taxesConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: taxesConstants.INSERT_FAILURE_CUSTOMER, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING_TEMPLATES, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function loadData(templates) {

    return dispatch => {
        dispatch(loading(true));
        templatesService.loadData(templates)
            .then(
                templates => {
                    dispatch(request(templates));
                    dispatch(loading(false));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );

    };

    function request(templates) { return { type: templatesConstants.LOAD_REQUEST_TEMPLATES, templates } }
    function success(customer) { return { type: taxesConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: taxesConstants.INSERT_FAILURE_CUSTOMER, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING_TEMPLATES, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}
