import { tariffsConstants } from '../_constants';

export function tariffs(state = [], action) {
    switch (action.type) {
        case tariffsConstants.LOAD_REQUEST_TARIFFS: {
            return action.tariffs;
        }

        case tariffsConstants.CLEAR_TARIFFS: {

            return action.message;
        }

        case tariffsConstants.ADD_TARIFF: {
            return [
                ...state,
                action.tariff
            ];
        }

        case tariffsConstants.EDIT_TARIFF: {
            return state.map((item) => {
                if (item.id === action.tariff.id)
                    return action.tariff;
                else
                    return item;
            });
        }

        case tariffsConstants.REMOVE_TARIFF: {
            // удфляем тариф из state
            return state.filter(item => item.id !== action.tariff.id);
        }

        default:
            return state
    }
}