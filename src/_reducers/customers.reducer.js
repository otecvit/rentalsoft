import { customerConstants } from '../_constants';

export function customers(state = {}, action) {
    switch (action.type) {
        case customerConstants.LOAD_REQUEST_CUSTOMERS: {
            return {
                ...state,
                ...action.customers
            };
        }
        case customerConstants.INSERT_REQUEST_CUSTOMER: {
            
            return {
               ...state,
               /*customers: [...state.customer, action.customer]*/
            };
        }
        default:
            return state
    }
}