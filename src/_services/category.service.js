import config from 'config';
import { authHeader, history } from '../_helpers';

export const categoryService = {
    load,
    add,
    edit,
    remove,
};

function edit(category) {
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

function add(category) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
    };

    return fetch(`${config.apiUrl}/Category/InsertCategory.php`, requestOptions)
        .then(handleResponse)
        .then(category => {
            return category[0].data;
            }
        );
    
}


function load(category) {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
    };

    return fetch(`${config.apiUrl}/Category/LoadCategory.php`, requestOptions)
        .then(handleResponse)
        .then(category => {
            return category[0].data;
            }
        );
    
}


function remove(category) {
    
    //console.log(category);
    
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
