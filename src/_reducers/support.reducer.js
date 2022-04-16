import { supportConstants } from '../_constants';

const initialState = {
    isLoading: false,
    lastTariffID: "",
}

export function support(state = initialState, action) {
    switch (action.type) {
        case supportConstants.APPLY_IS_LOADING: {
            return state;
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