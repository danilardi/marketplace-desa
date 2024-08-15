import HandleNotifError from "../HandleNotifError";
import Api from "../Api";
import { removeAuth, setAccessToken, setRefreshToken, setRoleId } from "../AuthUtils";
import { ToastError, ToastSuccess } from "../AlertNotification";

export const login = async (body) => {
    try {
        const res = await Api.post(`/authentications`, body);
        // console.log("cekk", res);
        if (res && res.status === "success") {
            // ToastSuccess("Login Success");
            if (res.data) {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setRoleId(res.data.roleId);
            }
            return res;
        }
    } catch (error) {
        ToastError(error.message);
    }
}

export const register = async (body) => {
    try {
        const res = await Api.post(`/users`, body);
        // // console.log("cekk", res);
        if (res && res.status === "success") {
            ToastSuccess("Register Success");
            return true;
        }
    } catch (error) {
        HandleNotifError(error);
    }
}

export const refreshToken = async (body) => {
    try {
        const res = await Api.put(`/authentications`, body);
        // // console.log("cekk", res);
        if (res && res.status === "success") {
            if (res.data) {
                setAccessToken(res.data.accessToken);
            }
        }
    } catch (error) {
        removeAuth();
        // HandleNotifError(error);
    }
}

export const getUser = async () => {
    try {
        // console.log("masuk getUser");
        const res = await Api.get(`/users`);
        // // console.log("getUser", res.data);
        if (res && res.status === "success") {
            return res;
        }
    } catch (error) {
        // console.log(error)
    }
}

export const updateUser = async (body) => {
    try {
        // // console.log("body", body);
        const res = await Api.put(`/users`, body);
        // // console.log("cekk", res);
        // if (res && res.status === "success") {
        //     ToastSuccess("Update Success");
        //     return res;
        // }
    } catch (error) {
        HandleNotifError(error);
    }
}