import { templatesConstants } from '../_constants';

export function templates(state = [], action) {
    switch (action.type) {
        case templatesConstants.ADD_TEMPLATES: {
            return [
                ...state,
                action.templates
            ];
        }

        case templatesConstants.EDIT_TEMPLATES: {
            return state.map((item) => {
                if (item.chTokenTax === action.tax.chTokenTax)
                    return action.tax;
                else
                    return item;
            });
        }

        case templatesConstants.LOAD_REQUEST_TEMPLATES: {
            return action.templates
        }

        case templatesConstants.INSERT_REQUEST_TEMPLATES: {
            return {
                ...state,
            };
        }

        case templatesConstants.REMOVE_TEMPLATES: {
            return state.filter(item => item.chTokenTax !== action.tax.chTokenTax);
        }


        case templatesConstants.CLEAR_TEMPLATES: {
            return [];
        }

        default:
            return state
    }
}