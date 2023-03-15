import { supportConstants, ordersConstants } from '../_constants';
import { dataexchangeService } from '../_services';
import { alertActions } from './';
import { supportActions } from './support.actions';

import { history } from '../_helpers';

export const ordersActions = {
    add,
    addPayment,
    load,
    loadData,
    remove,
    edit,
    clear,

};

function add(order) {

    return dispatch => {
        dataexchangeService.addWithoutFiles(order, 'Orders/InsertOrder.php')
            .then(
                order => {
                    dispatch(request(order));
                    dispatch(alertActions.success("Succes add"));
                    history.push('/orders');
                },
                error => {
                    //dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(order) { return { type: ordersConstants.ADD_ORDER, order } }
    function lastTariffId(tariffid) { return { type: supportConstants.LAST_TARIFF_INSERT, tariffid } }
    function success(order) { return { type: ordersConstants.INSERT_SUCCESS_CUSTOMER, service } }
    function failure(error) { return { type: ordersConstants.INSERT_FAILURE_ORDERS, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function addPayment(payment) {

    console.log(payment)

    return dispatch => {
        dataexchangeService.addWithoutFiles(payment, 'Orders/InsertPayment.php')
            .then(
                payment => {
                    dispatch(request(payment));
                    dispatch(alertActions.success("Succes add"));
                    //history.push('/orders');
                },
                error => {
                    //dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(payment) { return { type: ordersConstants.ADD_PAYMENT, payment } }
    //function success(payment) { return { type: ordersConstants.INSERT_SUCCESS_CUSTOMER, service } }
    //function failure(error) { return { type: ordersConstants.INSERT_FAILURE_ORDERS, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function load(companyToken) {

    return dispatch => {
        dispatch(loading(true));
        dataexchangeService.load(companyToken, 'Services/LoadServices.php')
            .then(
                services => {
                    dispatch(request(services));
                    dispatch(loading(false));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );

    };
    function request(services) { return { type: servicesConstants.LOAD_REQUEST_SERVICES, services } }
    function success(services) { return { type: servicesConstants.INSERT_SUCCESS_CUSTOMER, services } }
    function failure(error) { return { type: servicesConstants.INSERT_FAILURE_CUSTOMER, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING_SERVICE, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion

}

function loadData(companyToken) {

    return dispatch => {
        // включаем режим загрузки
        dispatch(loading(true));
        dataexchangeService.loadData(companyToken, 'Services/LoadDataService.php')
            .then(
                service => {
                    dispatch(request(service));
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
    function request(services) { return { type: servicesConstants.LOAD_REQUEST_SERVICES, services } }
    function failure(error) { return { type: servicesConstants.INSERT_FAILURE_CUSTOMER, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING_SERVICE, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function remove(service) {

    return dispatch => {

        dataexchangeService.remove(service, 'Services/RemoveService.php')
            .then(
                service => {
                    dispatch(request(service));
                    dispatch(alertActions.success("Remove complete"));
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(service) { return { type: servicesConstants.REMOVE_SERVICE, service } }
    function success(customer) { return { type: consumablesConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: servicesConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function edit(service) {

    console.log(service);

    return dispatch => {
        dataexchangeService.edit(service, 'Services/EditService.php', 'Services/EditFileName.php')
            .then(
                service => {
                    dispatch(request(service));
                    dispatch(alertActions.success("Succes edit"));
                    history.push('/services');
                    //dispatch(request(inventory));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(service) { return { type: servicesConstants.EDIT_SERVICE, service } }
    function failure(error) { return { type: servicesConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion

}


function clear() {
    return { type: servicesConstants.CLEAR_SERVICES, message: [] }
}