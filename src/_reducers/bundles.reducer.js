import { bundlesConstants } from '../_constants';

export function bundles(state = [], action) {
    switch (action.type) {
        case bundlesConstants.ADD_BUNDLE: {
            return [
                ...state,
                action.bundle
            ];
        }

        case bundlesConstants.LOAD_BUNDLES: {
            return action.bundles
        }

        // case bundlesConstants.ADD_BUNDLE: {
        //     return {
        //         ...state,
        //     };
        // }

        case bundlesConstants.REMOVE_BUNDLE: {
            console.log("action.bundle.chTokenBundle =>", action.bundle.chTokenBundle)
            return state.filter(item => item.chTokenBundle !== action.bundle.chTokenBundle);
        }


        case bundlesConstants.CLEAR_BUNDLES: {
            return [];
        }

        default:
            return state
    }
}