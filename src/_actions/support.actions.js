import { supportConstants } from '../_constants';

export const supportActions = {
    loading,
    lastTariff,

};

function loading(message) {
    return { type: supportConstants.APPLY_IS_LOADING, message };
}

function lastTariff(message) {
    return { type: supportConstants.LAST_TARIFF_INSERT, message };
}


// function success(message) {
//     return { type: alertConstants.SUCCESS, message };
// }

// function error(message) {
//     return { type: alertConstants.ERROR, message };
// }

// function clear() {
//     return { type: alertConstants.CLEAR };
// }