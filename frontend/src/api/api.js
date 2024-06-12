import axios from "axios";

export const createApi = () => {
  const api = axios.create({
    baseURL: 'http://45.86.181.61:8082/api',
    timeout: 5000
  });

  api.interceptors.request.use(
    (config) => {
      // const token = getToken();
      // if (token && config.headers) {
      //   config.headers['x-token'] = token;
      // }

      const user = localStorage.getItem('user');

      if (user && config.headers) {
        config.headers['user'] = user;
      }
      return config;
    });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);
      }
      throw error;
    }
  );
  return api;
};
