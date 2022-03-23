import { categoryConstants } from '../_constants';
import { categoryService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const categoryActions = {
    edit,
    add,
    remove
};

function edit(category) {

    //console.log("category.actions -> ", category);

    return dispatch => {
        
        dispatch(request(category));
        
        /*
        categoryService.edit(category)
            .then(
                category => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
        */
        
    };

    function request(category) { return { type: categoryConstants.EDIT_CATEGORY, category } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function add(category) {

    //console.log("category.actions -> ", category);

    return dispatch => {
        
        dispatch(request(category));
        
        /*
        categoryService.edit(category)
            .then(
                category => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
        */
        
    };

    function request(category) { return { type: categoryConstants.ADD_CATEGORY, category } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}


function remove(category) {

    //console.log("category.actions -> ", category);

    return dispatch => {
        
        dispatch(request(category));
        
        /*
        categoryService.edit(category)
            .then(
                category => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
        */
        
    };

    function request(category) { return { type: categoryConstants.REMOVE_CATEGORY, category } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}


/*
function insert(customer) {
    return dispatch => {

        dispatch(request(customer));

        customerService.insert(customer)
            .then(
                customer => { 
                    dispatch(success());
                    //dispatch(success_login(customer)); // for redirect after registartion
                    history.push('/customers');
                    //history.push('/login');
                    //dispatch(alertActions.success('Registration successful'));
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(customer) { return { type: customerConstants.INSERT_REQUEST_CUSTOMER, customer } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
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
*/
