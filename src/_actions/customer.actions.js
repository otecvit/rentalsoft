import { customerConstants } from '../_constants';
import { customerService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const customerActions = {
    insert
};

function insert(customer) {
    return dispatch => {

        console.log('+');
        dispatch(request(customer));

        customerService.insert(customer)
            .then(
                user => { 
                    dispatch(success());
                    //dispatch(success_login(customer)); // for redirect after registartion
                    history.push('/');
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

