import { api } from '../config.json';

const authData = {
    headers: {
        Accept        : 'application/json',
        'Content-Type': 'application/json'
    }
};

if (sessionStorage.hasOwnProperty('token')) {
    authData.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
}

export function updateBearer(token) {
    authData.headers.Authorization = `Bearer ${token}`;
}

/**
 * Get a ressource from the API
 * @param  {String} url   The base URL
 * @param  {Object} opts_ Options to pass to fetch (headers are already there)
 * @return {Promise} The result as JSON
 */
export function get(url, opts_) {
    const opts = Object.assign({}, authData, {
        method: 'GET'
    }, opts_);

    return fetch(`${api}/${url}`, opts)
        .then(res => res.json())
        .then((results) => {
            if (Array.isArray(results)) {
                return results.filter(r => !r.isRemoved);
            } else if (!results.isRemoved) {
                return results;
            }
        });
}

/**
 * Post a ressource to the API
 * @param  {String} url   The base URL
 * @param  {Object} data  The data object
 * @param  {Object} opts_ Options to pass to fetch (headers, body and method are already there)
 * @return {Promise} The result as JSON
 */
export function post(url, data, opts_) {
    const opts = Object.assign({}, authData, {
        method: 'POST',
        body  : JSON.stringify(data)
    }, opts_);

    return fetch(`${api}/${url}`, opts)
        .then(res => res.json());
}

/**
 * Put a ressource to the API
 * @param  {String} url   The base URL
 * @param  {Object} data  The data object
 * @param  {Object} opts_ Options to pass to fetch (headers, body and method are already there)
 * @return {Promise} The result as JSON
 */
export function put(url, data, opts_) {
    const opts = Object.assign({}, authData, {
        method: 'PUT',
        body  : JSON.stringify(data)
    }, opts_);

    return fetch(`${api}/${url}`, opts)
        .then(res => res.json());
}

/**
 * Delete a ressource from the API
 * @param  {String} url   The base URL
 * @param  {Object} opts_ Options to pass to fetch (headers are already there)
 * @return {Promise} The result as JSON
 */
export function del(url, opts_) {
    const opts = Object.assign({}, authData, {
        method: 'DELETE'
    }, opts_);

    return fetch(`${api}/${url}`, opts)
        .then(res => res.json());
}
