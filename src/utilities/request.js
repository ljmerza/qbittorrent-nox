import axios from 'axios';
import { initialState as loginInitialState } from '../containers/login/login.reducer';
import { initialState as configInitialState } from '../containers/config/config.reducer';

/**
 * Parses the JSON returned by a network request
 * @param  {object} response A response from a network request
 * @return {object} The parsed JSON from the request
 */
function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }

    // if we have no return data then just fail
    if (!response.data) throw Error(`no data returned`);

    // if we have JSON data then it's a good return so return that
    if (typeof response.data === "object") return response.data;

    // if we are the login url handle the text response
    if (response.config.url.includes(loginInitialState.path) && response.data !== 'Ok.') {
        throw Error(`Could not login`);

    } else if (response.data === 'Ok.'){
        // else it might be some success string
        return true;
    }

    // if we are at checking if we logged in and fails 
    // then dont return error - just redirect to login page
    if (response.config.url.includes(configInitialState.pathVersion)) {
        throw Error(null);
    }

    // if we got this far then it's some error or bad data so throw error
    throw Error(response.data);
}

/**
 * Checks if a network request came back fine, and throws an error if not
 * @param  {object} response A response from a network request
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
    console.log({ response })
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