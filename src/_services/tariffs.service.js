import config from 'config';

export const tariffsService = {
    load,
    add
};

function load(tariffs) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tariffs)
    };
    return fetch(`${config.apiUrl}/Tariffs/LoadTariffs.php`, requestOptions)
        .then(handleResponse)
        .then(tariffs => {
            return tariffs[0].data;
            }
        );
    
}

function add(tariff) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tariff)
    };
    return fetch(`${config.apiUrl}/Tariffs/InsertTariff.php`, requestOptions)
        .then(handleResponse)
        .then(tariff => {
            return tariff[0].data;
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
