import { supportConstants, consumablesConstants } from '../_constants';
import { dataexchangeService } from '../_services';
import { alertActions } from './';
import { supportActions } from './support.actions';

import { history } from '../_helpers';

export const consumablesActions = {
    add,
    load,
    loadDataConsumable,
    remove,
    edit,
    clear,

};

function add(consumable) {

    return dispatch => {
        dataexchangeService.add(consumable, 'Consumables/InsertConsumable.php', 'Consumables/EditFileName.php')
            .then(
                consumable => {
                    dispatch(request(consumable));
                    dispatch(alertActions.success("Succes add"));
                    history.push('/consumables');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(consumable) { return { type: consumablesConstants.ADD_CONSUMABLES, consumable } }
    function lastTariffId(tariffid) { return { type: supportConstants.LAST_TARIFF_INSERT, tariffid } }
    function success(inventory) { return { type: consumablesConstants.INSERT_SUCCESS_CUSTOMER, inventory } }
    function failure(error) { return { type: consumablesConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}



function load(companyToken) {

    return dispatch => {
        dispatch(loading(true));
        dataexchangeService.load(companyToken, 'Consumables/LoadConsumables.php')
            .then(
                consumables => {

                    dispatch(request(consumables));
                    dispatch(loading(false));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );

    };
    function request(consumables) { return { type: consumablesConstants.LOAD_REQUEST_CONSUMABLES, consumables } }
    function success(consumables) { return { type: consumablesConstants.INSERT_SUCCESS_CUSTOMER, consumables } }
    function failure(error) { return { type: consumablesConstants.INSERT_FAILURE_CUSTOMER, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING_CONSUMABLE, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion

}

function loadDataConsumable(companyToken) {

    return dispatch => {
        // включаем режим загрузки
        dispatch(loading(true));
        dataexchangeService.loadData(companyToken, 'Consumables/LoadDataConsumable.php')
            .then(
                consumable => {
                    dispatch(request(consumable));
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
    function request(consumables) { return { type: consumablesConstants.LOAD_REQUEST_CONSUMABLES, consumables } }
    function failure(error) { return { type: consumablesConstants.INSERT_FAILURE_CONSUMABLE, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING_CONSUMABLE, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function remove(consumable) {

    //console.log(inventory);

    return dispatch => {

        dataexchangeService.remove(consumable, 'Consumables/RemoveConsumable.php')
            .then(
                consumable => {
                    dispatch(request(consumable));
                    dispatch(alertActions.success("Remove complete"));
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(consumable) { return { type: consumablesConstants.REMOVE_CONSUMABLE, consumable } }
    function success(customer) { return { type: consumablesConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: consumablesConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function edit(consumable) {

    return dispatch => {
        dataexchangeService.edit(consumable, 'Consumables/EditConsumable.php', 'Consumables/EditFileName.php')
            .then(
                consumable => {
                    dispatch(request(consumable));
                    dispatch(alertActions.success("Succes edit"));
                    history.push('/consumables');
                    //dispatch(request(inventory));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(consumable) { return { type: consumablesConstants.EDIT_CONSUMABLES, consumable } }
    function failure(error) { return { type: consumablesConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion

}


function clear() {
    return { type: consumablesConstants.CLEAR_CONSUMABLES, message: [] }
}