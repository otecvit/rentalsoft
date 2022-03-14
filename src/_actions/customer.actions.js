import { customerConstants } from '../_constants';
import { customerService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const customerActions = {
    load,
    insert,
};

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

