import { taxesConstants } from '../_constants';

export function taxes(state = [], action) {
    switch (action.type) {
        case taxesConstants.ADD_TAX: {
            return [
                ...state,
                action.tax
            ];
        }

        case taxesConstants.EDIT_TAX: {
            return state.map((item) => {
                if (item.chTokenTax === action.tax.chTokenTax)
                    return action.tax;
                else
                    return item;
            });
        }

        case taxesConstants.LOAD_REQUEST_TAXES: {
            return action.taxes
        }

        case taxesConstants.INSERT_REQUEST_TAXES: {
            return {
                ...state,
            };
        }

        case taxesConstants.REMOVE_TAX: {
            return state.filter(item => item.chTokenTax !== action.tax.chTokenTax);
        }


        case taxesConstants.CLEAR_TAXES: {
            return [];
        }

        default:
            return state
    }
}