import axios from 'axios';
import { initialState as loginInitialState } from '../containers/login/login.reducer';

/**
 * Parses the JSON returned by a network request
 * @param  {object} response A response from a network request
 * @return {object} The parsed JSON from the request
 */
function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }

    // if we are the login url handle the text response
    if (response.config.url.includes(loginInitialState.path)) {
        return response.data === 'Ok.' ? true : false;
    }

    return response.data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 * @param  {object} response A response from a network request
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
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

    return axios(options)
        .then(checkStatus)
        .then(parseJSON)
        .catch((e, req) => console.log(e, req))
}