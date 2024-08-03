import { badRequest, Error, mustLogin, notFound } from "./AlertNotification";

const HandleNotifError = (error) => {
    console.log("error", error);
    // if (error.code === "ERR_NETWORK") {
    //     Error("Server is offline");
    //     return;
    // }
    switch (error.status) {
        case 400:
            badRequest(error.data.message)
            break;
        case 401:
            mustLogin(error.data.message)
            break;
        case 403:
            badRequest(error.data.message)
            break;
        case 404:
            notFound(error.data.message)
            break;
        default:
            Error(error.data.message)
            break;
    }
};

export default HandleNotifError;