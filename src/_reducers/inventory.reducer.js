import { inventoryConstants } from '../_constants';

export function inventory(state = [], action) {
    switch (action.type) {
        case inventoryConstants.LOAD_REQUEST_INVENTORY: {
            return action.inventory;
        }

        case inventoryConstants.ADD_INVENTORY: {
            return [
                ...state,
                action.inventory
            ];
        }

        case inventoryConstants.EDIT_INVENTORY: {
            return state;
        }

        case inventoryConstants.REMOVE_INVENTORY: {

            return state.filter(item => item.chTokenInventory !== action.inventory.chTokenInventory);
        }

        case inventoryConstants.CLEAR_INVENTORY: {

            return action.message;
        }

        default:
            return state
    }
}