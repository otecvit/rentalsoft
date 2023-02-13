import { ordersConstants } from '../_constants';

export function orders(state = [], action) {
    switch (action.type) {
        case ordersConstants.ADD_ORDER: {
            
            return [
                ...state,
                action.order
            ];
        }

        case ordersConstants.LOAD_ORDERS: {
            return action.orders
        }

        case ordersConstants.REMOVE_ORDER: {
            return state.filter(item => item.chTokenOrder !== action.order.chTokenOrder);
        }


        case ordersConstants.CLEAR_ORDERS: {
            return [];
        }

        default:
            return state
    }
}