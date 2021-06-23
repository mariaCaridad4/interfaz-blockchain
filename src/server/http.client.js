import api from './api';
import authHeader from './auth-header';

/**
 * Axios http Client. Every API call will be made through this Client.
 *
 * Further modifications in this layer can be done later (e.g Auth).
 */

/**
 * Post Request.
 * @param {string} url
 * @param {string} data
 * @param {Object} config
 */
const post = (url = '', data = '') => {
  let config = {"headers": authHeader()}
  return api.post(url, data, config);
};

/**
 * Get Request.
 * @param {string} url
 */
const get = (url) => {
  let config = {"headers": authHeader()}
  return api(url, config);
};

/**
 * Put Request.
 * @param {string} url
 * @param {string} data
 * @param {Object} config
 */
const put = (url = '', data = '') => {
  let config = {"headers": authHeader()}
  return api.put(url, data, config);
};

/**
 * Remove Request.
 * Cannot contain a delete method - Cause delete is a keyword.
 * @param {string} url
 * @param {Object} config
 */
const remove = (url = '') => {
  let config = {"headers": authHeader()}
  return api.delete(url, config);
};

/**
 * HttpClient Object.
 */
const HttpClient = {
  post,
  get,
  put,
  remove
};

export { HttpClient };