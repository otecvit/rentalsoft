import { supportConstants, inventoryConstants } from '../_constants';
import { inventoryService } from '../_services';
import { alertActions } from './';
import { supportActions } from './support.actions';

export const inventoryActions = {
    add,
    addFiles,
    load,
    remove,
    edit

};

function add(inventory) {

    return dispatch => {
        inventoryService.add(inventory)
            .then(
                inventory => {
                    dispatch(request(inventory));
                    //dispatch(request(inventory));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(inventory) { return { type: inventoryConstants.ADD_INVENTORY, inventory } }
    function lastTariffId(tariffid) { return { type: supportConstants.LAST_TARIFF_INSERT, tariffid } }
    function success(inventory) { return { type: inventoryConstants.INSERT_SUCCESS_CUSTOMER, inventory } }
    function failure(error) { return { type: inventoryConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function addFiles(inventory) {

    return dispatch => {
        inventoryService.addFiles(inventory)
            .then(
                inventory => {
                    dispatch(request(inventory));
                    //dispatch(request(inventory));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(inventory) { return { type: inventoryConstants.ADD_INVENTORY, inventory } }
    function lastTariffId(tariffid) { return { type: supportConstants.LAST_TARIFF_INSERT, tariffid } }
    function success(inventory) { return { type: inventoryConstants.INSERT_SUCCESS_CUSTOMER, inventory } }
    function failure(error) { return { type: inventoryConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}



function load(tariffs) {
    return dispatch => {
        tariffsService.load(tariffs)
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
                    //dispatch(success());
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
