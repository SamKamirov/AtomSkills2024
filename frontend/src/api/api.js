import axios from "axios";

export const createApi = () => {
  const api = axios.create({
    baseURL: 'http://45.86.181.61:8081',
    timeout: 5000
  });

  api.interceptors.request.use(
    (config) => {
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