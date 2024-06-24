import axios from "axios";
import { SERVER_URL } from "../const";
import { getToken } from "../utils";
import { StatusCodes } from "http-status-codes";
import { toast } from "react-toastify";

const StatusCodesMapping = {
  [StatusCodes.INTERNAL_SERVER_ERROR]: true,
  [StatusCodes.TEMPORARY_REDIRECT]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.FORBIDDEN]: true,
  [StatusCodes.NOT_FOUND]: true,

}

const shouldDisplayMessage = (response) => !!StatusCodesMapping[response.status];

export const createApi = () => {
  const api = axios.create({
    baseURL: SERVER_URL,
    timeout: 5000
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      };

      return config;
    });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && shouldDisplayMessage(error.response)) {
        const detailMessage = (error.response.data);

        toast.warn(detailMessage.error)
      }
      throw error;
    }
  );
  return api;
};
