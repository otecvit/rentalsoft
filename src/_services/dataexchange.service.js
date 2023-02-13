import config from 'config';

export const dataexchangeService = {
    load,
    loadData,
    add,
    addWithoutFiles,
    edit,
    remove,
};

function load(companyToken, path) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyToken)
    };

    return fetch(`${config.apiUrl}/${path}`, requestOptions)
        .then(handleResponse)
        .then(item => {
            return item[0].data;
        }
        );
}


// загрузка инвентаря 
function loadData(companyToken, path) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyToken)
    };

    return fetch(`${config.apiUrl}/${path}`, requestOptions)
        .then(handleResponse)
        .then(item => {
            return item[0].data;
        }
        );

}

function add(item, path, pathSecond) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };

    // Inventory/InsertInventory.php
    return fetch(`${config.apiUrl}/${path}`, requestOptions)
        .then(handleResponse)
        .then(row => {

            if (!item.filesToUpload.length) return {
                ...row[0].data,
                data: [],
            };

            // собираем body для файла
            let formData = new FormData();

            for (var i = 0; i < item.filesToUpload.length; i++) {
                formData.append(
                    "fileToUpload[]",
                    item.filesToUpload[i].file
                );
            }

            formData.append("chTokenCompany", item.chTokenCompany);

            const requestOptionsFiles = {
                method: 'POST',
                body: formData
            }

            // отправляем файл
            return fetch(`${config.apiUrl}/Support/UploadFiles.php`, requestOptionsFiles)
                .then(handleResponse)
                .then(file => {
                    return {
                        ...row[0].data,
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
                    chToken: result.chToken,
                })
            };

            // Inventory/EditFileName.php
            return fetch(`${config.apiUrl}/${pathSecond}`, requestOptionsEditFile)
                .then(handleResponse)
                .then(() => {
                    return result;
                })

        })
        .then(result => {
            return result;
        })

}

function addWithoutFiles(item, path) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };

    // Inventory/InsertInventory.php
    return fetch(`${config.apiUrl}/${path}`, requestOptions)
        .then(handleResponse)
        .then(result => {
            return result;
        })
}

function edit(item, path, pathSecond) {

    // изменяем инвентарь
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };
    // Inventory/EditInventory.php
    return fetch(`${config.apiUrl}/${path}`, requestOptions)
        .then(handleResponse)
        .then(row => {

            if (!item.filesToUpload.length) return {
                ...row[0].data,
                data: [],
            };

            // собираем body для файла
            let formData = new FormData();

            for (var i = 0; i < item.filesToUpload.length; i++) {
                formData.append(
                    "fileToUpload[]",
                    item.filesToUpload[i].file
                );
            }

            formData.append("chTokenCompany", item.chTokenCompany);

            const requestOptionsFiles = {
                method: 'POST',
                body: formData
            }



            // отправляем файл
            return fetch(`${config.apiUrl}/Support/UploadFiles.php`, requestOptionsFiles)
                .then(handleResponse)
                .then(file => {
                    return {
                        ...row[0].data,
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
                    files: [...item.filesToLeave, ...result.data],
                    chToken: result.chToken,
                })
            };

            //Inventory/EditFileName.php
            return fetch(`${config.apiUrl}/${pathSecond}`, requestOptionsEditFile)
                .then(handleResponse)
                .then(() => {
                    return result;
                })

        })
        .then(result => {

            // нет файлов для удаления
            if (!item.filesToRemove.length) return result;

            // удаляем файлы с сервера
            const requestOptionsRemoveFile = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    files: item.filesToRemove,
                    chTokenCompany: item.chTokenCompany,
                })
            };

            return fetch(`${config.apiUrl}/Support/DeleteFiles.php`, requestOptionsRemoveFile)
                .then(handleResponse)
                .then(() => {
                    return result;
                })

        })

}

function remove(item, path) {

    // удаляем инвентарь
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };

    // Inventory/RemoveInventory.php
    return fetch(`${config.apiUrl}/${path}`, requestOptions)
        .then(handleResponse)
        .then(result => {

            // нет файлов для удаления
            if (!item.filesToRemove.length) return result[0];

            // удаляем файлы с сервера
            const requestOptionsRemoveFile = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    files: item.filesToRemove.map(item => item.file),
                    chTokenCompany: item.chTokenCompany,
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
