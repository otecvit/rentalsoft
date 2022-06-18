// import config from 'config';
// import { authHeader, history } from '../_helpers';

// export const customerService = {
//     load,
//     add,
//     edit,
//     remove,
//     loadDataCustomer
// };


// function add(customer) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(customer)
//     };

//     return fetch(`${config.apiUrl}/Customers/InsertCustomer.php`, requestOptions)
//         .then(handleResponse)
//         .then(item => {

//             if (!customer.filesToUpload.length) return {
//                 ...item[0].data,
//                 data: [],
//             };

//             // собираем body для файла
//             let formData = new FormData();

//             for (var i = 0; i < customer.filesToUpload.length; i++) {
//                 formData.append(
//                     "fileToUpload[]",
//                     customer.filesToUpload[i].file
//                 );
//             }

//             formData.append("chTokenCompany", customer.chTokenCompany);

//             const requestOptionsFiles = {
//                 method: 'POST',
//                 body: formData
//             }

//             // отправляем файл
//             return fetch(`${config.apiUrl}/Support/UploadFiles.php`, requestOptionsFiles)
//                 .then(handleResponse)
//                 .then(file => {
//                     return {
//                         ...item[0].data,
//                         ...file[0],
//                     }
//                 })
//         })
//         .then(result => {
//             // записываем url картинки в базу данных
//             // files объединяем два маасива: картинки которые оставляем и картинки которые загрузили
//             const requestOptionsEditFile = {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     files: result.data,
//                     chTokenCustomer: result.chTokenCustomer,
//                 })
//             };

//             return fetch(`${config.apiUrl}/Customers/EditFileName.php`, requestOptionsEditFile)
//                 .then(handleResponse)
//                 .then(() => {
//                     return result;
//                 })

//         })
//         .then(result => {
//             return result;
//         })

// }



// function load(user) {

//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`${config.apiUrl}/Customers/LoadCustomers.php`, requestOptions)
//         .then(handleResponse)
//         .then(customers => {
//             return customers[0].data;
//         }
//         );

// }

// function loadDataCustomer(companyToken) {

//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(companyToken)
//     };

//     return fetch(`${config.apiUrl}/Customers/LoadDataCustomer.php`, requestOptions)
//         .then(handleResponse)
//         .then(customers => {
//             return customers[0].data;
//         }
//         );

// }

// function edit(customer) {

//     // изменяем инвентарь
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(customer)
//     };

//     return fetch(`${config.apiUrl}/Customers/EditCustomer.php`, requestOptions)
//         .then(handleResponse)
//         .then(item => {

//             if (!customer.filesToUpload.length) return {
//                 ...item[0].data,
//                 data: [],
//             };

//             // собираем body для файла
//             let formData = new FormData();

//             for (var i = 0; i < customer.filesToUpload.length; i++) {
//                 formData.append(
//                     "fileToUpload[]",
//                     customer.filesToUpload[i].file
//                 );
//             }

//             formData.append("chTokenCompany", customer.chTokenCompany);

//             const requestOptionsFiles = {
//                 method: 'POST',
//                 body: formData
//             }

//             // отправляем файл
//             return fetch(`${config.apiUrl}/Support/UploadFiles.php`, requestOptionsFiles)
//                 .then(handleResponse)
//                 .then(file => {
//                     return {
//                         ...item[0].data,
//                         ...file[0],
//                     }
//                 })
//         })
//         .then(result => {

//             // записываем url картинки в базу данных
//             // files объединяем два масива: картинки которые оставляем и картинки которые загрузили
//             const requestOptionsEditFile = {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({

//                     files: [...customer.filesToLeave, ...result.data],
//                     chTokenCustomer: result.chTokenCustomer,
//                 })
//             };

//             return fetch(`${config.apiUrl}/Customers/EditFileName.php`, requestOptionsEditFile)
//                 .then(handleResponse)
//                 .then(() => {
//                     return result;
//                 })

//         })
//         .then(result => {

//             // нет файлов для удаления
//             if (!customer.filesToRemove.length) return result;

//             // удаляем файлы с сервера
//             const requestOptionsRemoveFile = {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     files: customer.filesToRemove,
//                     chTokenCompany: customer.chTokenCompany,
//                 })
//             };

//             return fetch(`${config.apiUrl}/Support/DeleteFiles.php`, requestOptionsRemoveFile)
//                 .then(handleResponse)
//                 .then(() => {
//                     return result;
//                 })

//         })

// }

// function remove(customer) {

//     // удаляем инвентарь
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(customer)
//     };

//     return fetch(`${config.apiUrl}/Customers/RemoveCustomer.php`, requestOptions)
//         .then(handleResponse)
//         .then(result => {

//             // нет файлов для удаления
//             if (!customer.filesToRemove.length) return result;

//             // удаляем файлы с сервера
//             const requestOptionsRemoveFile = {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     files: customer.filesToRemove.map(item => item.file),
//                     chTokenCompany: customer.chTokenCompany,
//                 })
//             };

//             return fetch(`${config.apiUrl}/Support/DeleteFiles.php`, requestOptionsRemoveFile)
//                 .then(handleResponse)
//                 .then(() => {
//                     return result[0];
//                 })

//         })
// }


// /*
// function login(username, password) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//     };

//     return fetch(`http://crm.mirprokata.by/api_v2/Users/AuthenticatetUsers.php`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             localStorage.setItem('user', JSON.stringify(user));

//             return user;
//         });

// }

// function logout() {

//     // remove user from local storage to log user out
//     localStorage.removeItem('user');
// }
// */
// /*
// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }
// */
// /*
// function register(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     //return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
//     return fetch(`http://crm.mirprokata.by/api_v2/Users/InsertUsers.php`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             localStorage.setItem('user', JSON.stringify(user));
//             return user;
//         });
// }
// */
// /*
// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
// }
// */

// /*
// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }
// */
// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);

//         if (!response.ok) {
//             /*
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }
//             */
//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }
//         return data;
//     });
// }
