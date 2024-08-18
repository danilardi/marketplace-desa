import { ToastError, ToastSuccess } from "../AlertNotification";
import Api from "../Api";
import HandleNotifError from "../HandleNotifError";

export const fetchCart = async (setFunction) => {
    try {
        const res = await Api.get(`/wishlist`);

        if (res.status === 'success') {
            if (setFunction) {
                // balikkan urutan wishlist
                let temp = res.data.wishlist
                setFunction(temp.reverse());
            } else {
                return res.data;
            }
        }
    } catch (error) {

        // HandleNotifError(error.response);
    }
}

export const addToCart = async ({ orderQuantity, productId }) => {
    try {
        const res = await Api.post(`/wishlist`, { orderQuantity: orderQuantity, productId: productId });

        if (res.status === 'success') {
            ToastSuccess("Added to cart");
            return true
        }
    } catch (error) {

        if (error.data) {
            ToastError(error.data.message);
        } else {
            ToastError("Failed to add to cart");
        }
        // HandleNotifError(error.response);
    }
}

export const updateCart = async ({ id, orderQuantity }) => {
    try {
        const res = await Api.put(`/wishlist/${id}`, { orderQuantity: orderQuantity });

        if (res.status === 'success') {
            // ToastSuccess("Updated cart");
            return true
        }
    } catch (error) {

        return false
        // HandleNotifError(error.response);
    }
}

export const deleteCart = async (id) => {
    try {

        const res = await Api.delete(`/wishlist/${id}`);

        if (res.status === 'success') {
            ToastSuccess("Deleted from cart");
            return true
        }
    } catch (error) {

        // HandleNotifError(error.response);
    }
}

