import { servicesConstants } from '../_constants';

export function services(state = [], action) {
    switch (action.type) {
        case servicesConstants.ADD_SERVICE: {
            return [
                ...state,
                action.service
            ];
        }

        case servicesConstants.LOAD_REQUEST_SERVICES: {
            return action.services
        }

        case servicesConstants.INSERT_REQUEST_SERVICE: {
            return {
                ...state,
            };
        }

        case servicesConstants.REMOVE_SERVICE: {
            return state.filter(item => item.chTokenService !== action.service.chTokenService);
        }


        case servicesConstants.CLEAR_SERVICES: {
            return [];
        }

        default:
            return state
    }
}