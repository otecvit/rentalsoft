import { customerConstants } from '../_constants';

export function customers(state = [], action) {
    switch (action.type) {
        case customerConstants.ADD_CUSTOMER: {
            return [
                ...state,
                action.customer
            ];
        }
        case customerConstants.LOAD_REQUEST_CUSTOMERS: {
            return action.customers
        }

        case customerConstants.INSERT_REQUEST_CUSTOMER: {
            return {
                ...state,
            };
        }

        case customerConstants.REMOVE_CUSTOMER: {
            return state.filter(item => item.chTokenCustomer !== action.customer.chTokenCustomer);
        }


        case customerConstants.CLEAR_CUSTOMER: {
            return [];
        }

        default:
            return state
    }
}