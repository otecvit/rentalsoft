import { supportConstants, inventoryConstants } from '../_constants';
import { dataexchangeService } from '../_services';
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
        dataexchangeService.add(inventory, 'Inventory/InsertInventory.php', 'Inventory/EditFileName.php')
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
        dispatch(loading(true));
        dataexchangeService.load(companyToken, 'Inventory/LoadInventory.php')
            .then(
                inventory => {
                    dispatch(request(inventory));
                    dispatch(loading(false));
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
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion

}

function loadDataInventory(companyToken) {

    return dispatch => {
        // включаем режим загрузки
        dispatch(loading(true));
        dataexchangeService.loadData(companyToken, 'Inventory/LoadDataInventory.php')
            .then(
                inventory => {
                    dispatch(request(inventory));
                    // выключаем режим загрузки
                    dispatch(loading(false));
                    //return inventory
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
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING_INVENTORY, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function remove(inventory) {

    //console.log(inventory);

    return dispatch => {

        dataexchangeService.remove(inventory, 'Inventory/RemoveInventory.php')
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
        dataexchangeService.edit(inventory, 'Inventory/EditInventory.php', 'Inventory/EditFileName.php')
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