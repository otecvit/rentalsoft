import config from 'config';
import { authHeader, history } from '../_helpers';

export const templatesService = {
    load,
    loadData,
    add,
    edit,
    remove,
};

function edit(templates) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templates)
    };

    return fetch(`${config.apiUrl}/PrintTemplates/EditTemplate.php`, requestOptions)
        .then(handleResponse)
        .then(templates => {
            return templates[0].data;
        }
        );

}

function add(templates) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templates)
    };

    return fetch(`${config.apiUrl}/PrintTemplates/InsertTemplates.php`, requestOptions)
        .then(handleResponse)
        .then(templates => {
            return templates[0].data;
        }
        );

}

function load(templates) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templates)
    };

    return fetch(`${config.apiUrl}/PrintTemplates/LoadTemplates.php`, requestOptions)
        .then(handleResponse)
        .then(templates => {
            return templates[0].data;
        }
        );

}

function loadData(templates) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templates)
    };

    return fetch(`${config.apiUrl}/PrintTemplates/LoadTemplateData.php`, requestOptions)
        .then(handleResponse)
        .then(templates => {
            return templates[0].data;
        }
        );

}


function remove(templates) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templates)
    };

    return fetch(`${config.apiUrl}/PrintTemplates/RemoveTemplates.php`, requestOptions)
        .then(handleResponse)
        .then(templates => {
            return templates[0].data;
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
