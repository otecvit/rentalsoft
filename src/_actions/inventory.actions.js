import { supportConstants, inventoryConstants } from '../_constants';
import { inventoryService } from '../_services';
import { alertActions } from './';
import { supportActions } from './support.actions';

import { history } from '../_helpers';

export const inventoryActions = {
    add,
    load,
    loadDataInventory,
    remove,
    edit,
    clearInventoryState

};

function add(inventory) {

    return dispatch => {
        inventoryService.add(inventory)
            .then(
                inventory => {
                    dispatch(request(inventory));
                    dispatch(alertActions.success("Succes add"));
                    history.push('/inventory');


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



function load(companyToken) {
    return dispatch => {
        inventoryService.load(companyToken)
            .then(
                inventory => {
                    dispatch(request(inventory));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );

    };
    function request(inventory) { return { type: inventoryConstants.LOAD_REQUEST_INVENTORY, inventory } }
    function success(inventory) { return { type: inventoryConstants.INSERT_SUCCESS_CUSTOMER, inventory } }
    function failure(error) { return { type: inventoryConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function loadDataInventory(companyToken) {

    return dispatch => {
        // включаем режим загрузки
        dispatch(loading(true));
        inventoryService.loadDataInventory(companyToken)
            .then(
                inventory => {
                    dispatch(request(inventory));
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
    function request(inventory) { return { type: inventoryConstants.LOAD_REQUEST_INVENTORY, inventory } }
    function success(inventory) { return { type: inventoryConstants.INSERT_SUCCESS_CUSTOMER, inventory } }
    function failure(error) { return { type: inventoryConstants.INSERT_FAILURE_CUSTOMER, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function remove(inventory) {

    //console.log(inventory);

    return dispatch => {

        inventoryService.remove(inventory)
            .then(
                inventory => {
                    dispatch(request(inventory));
                    dispatch(alertActions.success("Remove complete"));
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(inventory) { return { type: inventoryConstants.REMOVE_INVENTORY, inventory } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function edit(inventory) {

    return dispatch => {
        inventoryService.edit(inventory)
            .then(
                inventory => {
                    dispatch(request(inventory));
                    dispatch(alertActions.success("Succes edit"));
                    history.push('/inventory');
                    //dispatch(request(inventory));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(inventory) { return { type: inventoryConstants.EDIT_INVENTORY, inventory } }
    function lastTariffId(tariffid) { return { type: supportConstants.LAST_TARIFF_INSERT, tariffid } }
    function success(inventory) { return { type: inventoryConstants.INSERT_SUCCESS_CUSTOMER, inventory } }
    function failure(error) { return { type: inventoryConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion

}


function clearInventoryState() {
    return { type: inventoryConstants.CLEAR_INVENTORY, message: [] }
}