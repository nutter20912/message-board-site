import axios from 'axios';

/**
 * Promise HTTP client
 *
 * @param {string} method
 * @param {string} url
 * @param {object} payload
 * @returns {Promise}
 */
export default function request(method, url, payload) {
  return new Promise((resolve, reject) => {
    const axiosInstance = (() => {
      if (method === 'get') {
        return axios({
          method,
          url,
          params: payload,
        });
      }

      return axios({
        headers: { 'X-Socket-ID': window.Echo?.socketId() },
        method,
        url,
        data: payload,
      });
    })();

    axiosInstance
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
