import { customerConstants } from '../_constants';

export function customers(state = {}, action) {
    switch (action.type) {
        case customerConstants.INSERT_REQUEST_CUSTOMER: {
            console.log(customerConstants.INSERT_REQUEST_CUSTOMER, '------');
            return {
                
            };
        }
        default:
            return state
    }
}