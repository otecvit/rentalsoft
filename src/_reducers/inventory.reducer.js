import { inventoryConstants } from '../_constants';

export function inventory(state = [], action) {
    switch (action.type) {
        case inventoryConstants.LOAD_REQUEST_INVENTORY: {
            // парсим результат, arrTariffDetail - текстовая интерпритация массива, поэтому JSON.parse
            return action.tariffs.map(item => {
                return {
                    ...item,
                    arrTariffDetail: JSON.parse(item.arrTariffDetail)
                };
            });
        }

        case inventoryConstants.ADD_INVENTORY: {
            return [
                ...state,
                action.inventory
            ];
        }

        case inventoryConstants.EDIT_INVENTORY: {
            return state.map((item) => {
                if (item.id === action.tariff.id)
                    return action.tariff;
                else
                    return item;
            });
        }

        case inventoryConstants.REMOVE_INVENTORY: {
            // удфляем тариф из state
            return state.filter(item => item.id !== action.tariff.id);
        }

        default:
            return state
    }
}