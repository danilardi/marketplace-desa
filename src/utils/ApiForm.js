import axios from "axios";
import { getBaseURLWithPrefix } from "./Helper";
import { getAccessToken, getRefreshToken, removeAuth } from "./AuthUtils";
import { refreshToken } from "./API/Auth";

const ApiForm = axios.create({
  baseURL: getBaseURLWithPrefix(),
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "multipart/form-data",
    "accept": "application/json",
  },
});

const onRequestSuccess = (config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const onRequestError = (error) => Promise.reject(error)
const onResponseSuccess = (response) => response.data
const onResponseError = (error) => {
  // console.log('error', getAccessToken())
  if (error.response?.status === 401 && getAccessToken()) {
    refreshToken({ refreshToken: getRefreshToken() })
  } else if (error.response?.status === 401 && !getAccessToken()) {
    removeAuth()
    window.location.reload()
  }
  return Promise.reject(error.response ? error.response : error)
}

ApiForm.interceptors.request.use(onRequestSuccess, onRequestError)
ApiForm.interceptors.response.use(onResponseSuccess, onResponseError)

export default ApiForm

