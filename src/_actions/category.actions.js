import { categoryConstants } from '../_constants';
import { categoryService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const categoryActions = {
    edit,
    add,
    remove,
    load
};

function edit(category) {

    return dispatch => {
        categoryService.edit(category)
            .then(
                category => {
                    dispatch(request(category));
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(category) { return { type: categoryConstants.EDIT_CATEGORY, category } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function add(category) {

    return dispatch => {
        categoryService.add(category)
            .then(
                category => {
                    dispatch(request(category));
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(category) { return { type: categoryConstants.ADD_CATEGORY, category } }
    function success(customer) { return { type: customerConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: customerConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}


function remove(category) {


    return dispatch => {
        dispatch(request(category));
        categoryService.remove(category)
            .then(
                category => {
                    console.log("----", category);
                    //dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );


    };

    function request(category) { return { type: categoryConstants.REMOVE_CATEGORY, category } }
    function success(customer) { return { type: categoryConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: categoryConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}

function dfs(obj, targetId) {
    if (obj.id === targetId) {
        return obj
    }
    if (obj.nextItems) {
        for (let item of obj.nextItems) {
            let check = dfs(item, targetId)
            if (check) {
                return check
            }
        }
    }
    return null
}


function load(category) {

    return dispatch => {
        categoryService.load(category)
            .then(
                category => {

                    const tree = array => array
                        .reduce((a, c) => {
                            c.children = array.filter(i => i.parentId == c.id)
                            a.push(c)
                            return a
                        }, [])
                        .filter(i => i.parentId === "0");

                    dispatch(request(tree(category)));
                    //dispatch(alertActions.success('Registration successful'));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );

    };

    function request(category) { return { type: categoryConstants.LOAD_REQUEST_CATEGORY, category } }
    function success(customer) { return { type: categoryConstants.INSERT_SUCCESS_CUSTOMER, customer } }
    function failure(error) { return { type: categoryConstants.INSERT_FAILURE_CUSTOMER, error } }
    //function success_login(user) { return { type: userConstants.LOGIN_SUCCESS, user } } // for redirect after registartion
}
