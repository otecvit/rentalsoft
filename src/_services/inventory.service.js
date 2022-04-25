import config from 'config';
import { authHeader, history } from '../_helpers';

export const inventoryService = {
    load,
    add,
};

function add(inventory) {

    if (!!inventory.filesToUpload) {
        // добавляем инвентарь
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inventory)
        };

        return fetch(`${config.apiUrl}/Inventory/InsertInventory.php`, requestOptions)
            .then(handleResponse)
            .then(item => {

                // собираем body для файла
                let formData = new FormData();

                for (var i = 0; i < inventory.filesToUpload.length; i++) {
                    formData.append(
                        "fileToUpload[]",
                        inventory.filesToUpload[i].file

                    );
                }

                formData.append("companyToken", inventory.companyToken);

                const requestOptionsFiles = {
                    method: 'POST',
                    body: formData
                }

                // отправляем файл
                return fetch(`${config.apiUrl}/Support/UploadFiles.php`, requestOptionsFiles)
                    .then(handleResponse)
                    .then(file => {
                        return {
                            ...item[0].data,
                            ...file[0],
                        }
                    })
            })
            .then(result => {

                // записываем url картинки в базу данных
                const requestOptionsEditFile = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        files: result.data,
                        chTokenInventory: result.chTokenInventory,
                    })
                };

                return fetch(`${config.apiUrl}/Inventory/EditFileName.php`, requestOptionsEditFile)
                    .then(handleResponse)
                    .then(() => {
                        return result;
                    })

            })
    }
    else {
        // добавляем инвентарь
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inventory)
        };

        return fetch(`${config.apiUrl}/Inventory/InsertInventory.php`, requestOptions)
            .then(handleResponse)
            .then(item => {
                return item[0].data
            })

    }


}

function load(companyToken) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyToken)
    };

    return fetch(`${config.apiUrl}/Inventory/LoadInventory.php`, requestOptions)
        .then(handleResponse)
        .then(inventory => {
            return inventory[0].data;
        }
        );

}
/*
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`http://crm.mirprokata.by/api_v2/Users/AuthenticatetUsers.php`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });

}

function logout() {

    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
*/
/*
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}
*/
/*
function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    //return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
    return fetch(`http://crm.mirprokata.by/api_v2/Users/InsertUsers.php`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}
*/
/*
function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}
*/

/*
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}
*/
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
