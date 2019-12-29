import axios from 'axios';

/**
 * Checks if a network request came back fine, and throws an error if not
 * @param  {object} response A response from a network request
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        if (!response.data) throw Error(`no data returned`);
        return response.data;
    }

    const error = new Error(response.data);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object} The response data
 */
export default function request(options) {
    options.withCredentials = true;
    return axios(options).then(checkStatus)
}