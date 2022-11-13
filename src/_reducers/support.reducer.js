import { supportConstants } from '../_constants';

const initialState = {
    isLoading: false,
    isLoadingInventory: false,
    isLoadingConsumable: false,
    isLoadingService: false,
    isLoadingBundles: false,
    isLoadingTariffs: false,
    lastTariffID: "",
}

export function support(state = initialState, action) {
    switch (action.type) {
        case supportConstants.APPLY_IS_LOADING: {
            return {
                ...state,
                isLoading: action.message,
            }
        }

        case supportConstants.APPLY_IS_LOADING_INVENTORY: {
            return {
                ...state,
                isLoadingInventory: action.message,
            }
        }

        case supportConstants.APPLY_IS_LOADING_CONSUMABLE: {
            return {
                ...state,
                isLoadingConsumable: action.message,
            }
        }

        case supportConstants.APPLY_IS_LOADING_SERVICE: {
            return {
                ...state,
                isLoadingService: action.message,
            }
        }

        case supportConstants.APPLY_IS_LOADING_TARIFFS: {
            return {
                ...state,
                isLoadingTariffs: action.message,
            }
        }



        case supportConstants.APPLY_IS_LOADING_BUNDLES: {
            return {
                ...state,
                isLoadingBundles: action.message,
            }
        }

        case supportConstants.LAST_TARIFF_INSERT: {
            return {
                ...state,
                lastTariffID: action.tariffid,
            };
        }


        default:
            return state
    }
}