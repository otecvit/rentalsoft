import { taxesConstants } from '../_constants';

export function taxes(state = [], action) {
    switch (action.type) {
        case taxesConstants.ADD_TAXES: {
            return [
                ...state,
                action.tax
            ];
        }
        case taxesConstants.LOAD_REQUEST_TAXES: {
            return action.taxes
        }

        case taxesConstants.INSERT_REQUEST_TAXES: {
            return {
                ...state,
            };
        }

        case taxesConstants.REMOVE_TAXES: {
            return state.filter(item => item.chTokenTaxe !== action.customer.chTokenTaxe);
        }


        case taxesConstants.CLEAR_TAXES: {
            return [];
        }

        default:
            return state
    }
}