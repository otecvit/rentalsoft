import { tariffsConstants } from '../_constants';

export function tariffs(state = [], action) {
    switch (action.type) {
        case tariffsConstants.LOAD_REQUEST_TARIFFS: {
            // парсим результат, arrTariffDetail - текстовая интерпритация массива, поэтому JSON.parse
            return action.tariffs.map( item => {
                return {
                    ...item, 
                    arrTariffDetail: JSON.parse(item.arrTariffDetail)
                };
            });
        }

        case tariffsConstants.INSERT_REQUEST_TARRIFS: {
            
            return {
               ...state,
               /*customers: [...state.customer, action.customer]*/
            };
        }
        default:
            return state
    }
}