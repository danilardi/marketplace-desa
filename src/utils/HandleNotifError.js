import { ToastError } from "./AlertNotification";

const HandleNotifError = (error) => {
    switch(error.statusCode) {
        case 500:
            ToastError("Server Error\nSilahkan coba lagi!");
            break;
        default:
            ToastError(error.message);
            break;
    }
};

export default HandleNotifError;