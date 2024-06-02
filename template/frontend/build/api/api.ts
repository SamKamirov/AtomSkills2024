import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

type TErrorType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: 'http://45.86.181.61:8081',
    timeout: 5000
  });

  api.interceptors.request.use(
    (config) => {
      return config;
});

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<TErrorType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);
      }

      throw error;
    }
  );
  return api;
};
