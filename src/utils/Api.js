import axios from "axios";
import { getAccessToken, getRefreshToken, removeAuth } from "./AuthUtils";
import { getBaseURLWithPrefix } from "./Helper";
import { refreshToken } from "./API/Auth";

const Api = axios.create({
  baseURL: getBaseURLWithPrefix(),
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
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
  console.log('error', getAccessToken())
  if (error.response?.status === 401 && getAccessToken()) {
    refreshToken({ refreshToken: getRefreshToken() })
  } else if (error.response?.status === 401 && !getAccessToken()) {
    removeAuth()
    window.location.reload()
  }
  return Promise.reject(error.response ? error.response : error)
}

Api.interceptors.request.use(onRequestSuccess, onRequestError)
Api.interceptors.response.use(onResponseSuccess, onResponseError)

export default Api