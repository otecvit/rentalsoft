import { tariffsConstants } from '../_constants';

const data = [
    {
        name: 'qqqqq',
        tariffDetail: [
            {
                label: 'www', 
                duration: '1', 
                period: '1', 
                price: '2'
            },
            {
                label: 'eee', 
                duration: '3    ', 
                period: '1', 
                price: '3'
            },
        ]
    },
]

export function tariffs(state = data, action) {
    switch (action.type) {
        case tariffsConstants.LOAD_REQUEST_TARRIFS: {
            console.log("dfgdf");
            return {
                ...state,
            };
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