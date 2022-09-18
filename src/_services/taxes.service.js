import config from 'config';
import { authHeader, history } from '../_helpers';

export const taxesService = {
    load,
    add,
    edit,
    remove,
};

function edit(tax) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
    };

    return fetch(`${config.apiUrl}/Category/EditCategory.php`, requestOptions)
        .then(handleResponse)
        .then(category => {
            return category[0].data;
        }
        );

}

function add(tax) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tax)
    };

    return fetch(`${config.apiUrl}/Taxes/InsertTax.php`, requestOptions)
        .then(handleResponse)
        .then(taxe => {
            return taxe[0].data;
        }
        );

}

function load(taxes) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taxes)
    };

    return fetch(`${config.apiUrl}/Taxes/LoadTaxes.php`, requestOptions)
        .then(handleResponse)
        .then(taxes => {
            return taxes[0].data;
        }
        );

}


function remove(category) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
    };

    return fetch(`${config.apiUrl}/Category/RemoveCategory.php`, requestOptions)
        .then(handleResponse)
        .then(category => {
            return category[0].data;
        }
        );

}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            /*
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            */
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
