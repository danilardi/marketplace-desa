import PropTypes from 'prop-types'
import { Navigate } from "react-router-dom";
import { ToastError, ToastSuccess } from './AlertNotification';

export function setCookie(cname, cvalue, exphours) {
  const d = new Date();
  d.setTime(d.getTime() + exphours * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function setAccessToken(accessToken) {
  localStorage.setItem("accessToken", accessToken);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem("refreshToken", refreshToken);
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function setRoleId(roleId) {
  localStorage.setItem("roleId", roleId);
}

export function getRoleId() {
  return localStorage.getItem("roleId");
}

export function removeAuth() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export const IsLoggedIn = ({ children }) => {
  const loggedInUser = getAccessToken();
  if (!loggedInUser) 
    ToastError("Silahkan login terlebih dahulu");
  return loggedInUser ? children : <Navigate to="/login" />;
};

export const IsLoggedOut = ({ children }) => {
  const loggedInUser = getAccessToken();
  if (loggedInUser) 
    ToastSuccess("Anda Sudah Login");
  return loggedInUser ? <Navigate to="/home" /> : children;
};

IsLoggedIn.propTypes = {
  children: PropTypes.node,
};

IsLoggedOut.propTypes = {
  children: PropTypes.node,
};