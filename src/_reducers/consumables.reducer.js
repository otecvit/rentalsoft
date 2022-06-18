import { consumablesConstants } from '../_constants';

export function consumables(state = [], action) {
    switch (action.type) {
        case consumablesConstants.ADD_CONSUMABLES: {
            return [
                ...state,
                action.consumable
            ];
        }

        case consumablesConstants.LOAD_REQUEST_CONSUMABLES: {
            return action.consumables
        }

        case consumablesConstants.INSERT_REQUEST_CONSUMABLES: {
            return {
                ...state,
            };
        }

        case consumablesConstants.REMOVE_CONSUMABLE: {
            return state.filter(item => item.chTokenConsumable !== action.consumable.chTokenConsumable);
        }


        case consumablesConstants.CLEAR_CONSUMABLES: {
            return [];
        }

        default:
            return state
    }
}