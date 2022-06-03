import config from 'config';
import { authHeader, history } from '../_helpers';

export const inventoryService = {
    load,
    loadDataInventory,
    add,
    edit,
    remove,
};



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


// загрузка инвентаря 
function loadDataInventory(companyToken) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyToken)
    };

    return fetch(`${config.apiUrl}/Inventory/LoadDataInventory.php`, requestOptions)
        .then(handleResponse)
        .then(inventory => {
            return inventory[0].data;
        }
        );

}

function add(inventory) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inventory)
    };

    return fetch(`${config.apiUrl}/Inventory/InsertInventory.php`, requestOptions)
        .then(handleResponse)
        .then(item => {

            if (!inventory.filesToUpload.length) return {
                ...item[0].data,
                data: [],
            };

            // собираем body для файла
            let formData = new FormData();

            for (var i = 0; i < inventory.filesToUpload.length; i++) {
                formData.append(
                    "fileToUpload[]",
                    inventory.filesToUpload[i].file
                );
            }

            formData.append("chTokenCompany", inventory.chTokenCompany);

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
            // files объединяем два маасива: картинки которые оставляем и картинки которые загрузили
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
        .then(result => {
            return result;
        })

}

function edit(inventory) {

    // изменяем инвентарь
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inventory)
    };



    return fetch(`${config.apiUrl}/Inventory/EditInventory.php`, requestOptions)
        .then(handleResponse)
        .then(item => {

            if (!inventory.filesToUpload.length) return {
                ...item[0].data,
                data: [],
            };

            // собираем body для файла
            let formData = new FormData();

            for (var i = 0; i < inventory.filesToUpload.length; i++) {
                formData.append(
                    "fileToUpload[]",
                    inventory.filesToUpload[i].file
                );
            }

            formData.append("chTokenCompany", inventory.chTokenCompany);

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
            // files объединяем два маасива: картинки которые оставляем и картинки которые загрузили
            const requestOptionsEditFile = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({

                    files: [...inventory.filesToLeave, ...result.data],
                    chTokenInventory: result.chTokenInventory,
                })
            };

            return fetch(`${config.apiUrl}/Inventory/EditFileName.php`, requestOptionsEditFile)
                .then(handleResponse)
                .then(() => {
                    return result;
                })

        })
        .then(result => {

            // нет файлов для удаления
            if (!inventory.filesToRemove.length) return result;

            // удаляем файлы с сервера
            const requestOptionsRemoveFile = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    files: inventory.filesToRemove,
                    chTokenCompany: inventory.chTokenCompany,
                })
            };

            return fetch(`${config.apiUrl}/Support/DeleteFiles.php`, requestOptionsRemoveFile)
                .then(handleResponse)
                .then(() => {
                    return result;
                })

        })

}

function remove(inventory) {

    // удаляем инвентарь
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inventory)
    };

    return fetch(`${config.apiUrl}/Inventory/RemoveInventory.php`, requestOptions)
        .then(handleResponse)
        .then(result => {

            // нет файлов для удаления
            if (!inventory.filesToRemove.length) return result;

            // удаляем файлы с сервера
            const requestOptionsRemoveFile = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    files: inventory.filesToRemove.map(item => item.file),
                    chTokenCompany: inventory.chTokenCompany,
                })
            };

            return fetch(`${config.apiUrl}/Support/DeleteFiles.php`, requestOptionsRemoveFile)
                .then(handleResponse)
                .then(() => {
                    return result[0];
                })

        })
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
