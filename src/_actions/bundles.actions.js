import { supportConstants, bundlesConstants, consumablesConstants } from '../_constants';
import { dataexchangeService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const bundlesActions = {
    load,
    add,
    edit,
    remove,
    clear,
    loadData,
};

function add(bundle) {

    return dispatch => {
        dataexchangeService.add(bundle, 'Bundles/InsertBundle.php', 'Bundles/EditFileName.php')
            .then(
                bundle => {
                    dispatch(request(bundle));
                    dispatch(alertActions.success("Succes add"));
                    history.push('/bundles');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(bundle) { return { type: bundlesConstants.ADD_BUNDLE, bundle } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function clear() {
    return { type: bundlesConstants.CLEAR_BUNDLES, message: [] }
}

function load(user) {
    return dispatch => {
        dataexchangeService.load(user, 'Bundles/LoadBundles.php')
            .then(
                bundles => {
                    dispatch(request(bundles));
                    //dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );

    };

    function request(bundles) { return { type: bundlesConstants.LOAD_BUNDLES, bundles } }
    function failure(error) { return { type: bundlesConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function remove(bundle) {
    console.log("--->>", bundle);
    return dispatch => {
        dataexchangeService.remove(bundle, 'Bundles/RemoveBundle.php')
            .then(
                bundles => {
                    dispatch(request(bundles));
                    dispatch(alertActions.success("Remove complete"));
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(bundle) { return { type: bundlesConstants.REMOVE_BUNDLE, bundle } }
    function success(customer) { return { type: bundlesConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { console.log(error) }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}


function edit(bundle) {

    return dispatch => {
        dataexchangeService.edit(bundle, 'Bundles/EditBundle.php', 'Bundles/EditFileName.php')
            .then(
                bundle => {
                    dispatch(request(bundle));
                    dispatch(alertActions.success("Succes edit"));
                    history.push('/bundles');
                    //dispatch(request(inventory));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(bundle) { return { type: bundlesConstants.EDIT_BUNDLE, bundle } }
    function failure(error) { return { type: bundlesConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion

}


function loadData(companyToken) {

    return dispatch => {
        // включаем режим загрузки
        dispatch(loading(true));
        dataexchangeService.loadData(companyToken, 'Bundles/LoadDataBundle.php')
            .then(
                bundles => {
                    dispatch(request(bundles));
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
    function request(bundles) { return { type: bundlesConstants.LOAD_BUNDLES, bundles } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: bundlesConstants.INSERT_FAILURE_CUSTOMER, error } }
    function loading(message) { return { type: supportConstants.APPLY_IS_LOADING, message } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

