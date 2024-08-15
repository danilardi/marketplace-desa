import Api from "../Api";
import ApiForm from "../ApiForm";
import HandleNotifError from "../HandleNotifError";
// import HandleNotifError from "../HandleNotifError";

export const getProduct = async (limit, offset, setFunction) => {
    try {
        const res = await Api.get(`/products`, {
            params: {
                limit: limit,
                offset: offset
            }
        });
        // // console.log(res);
        if (res.status === "success") {
            setFunction(res.data);
        }
    } catch (error) {
        // console.log(error);
        // HandleNotifError(error);
    }
};

export const getProductById = async (id, setFunction) => {
    try {
        const res = await Api.get(`/products/${id}`);
        // // console.log("res", res);
        if (res.status === "success") {
            setFunction(res.data.product);
        }
    } catch (error) {
        // console.log(error);
        // HandleNotifError(error);
    }
}

export const getProductReview = async (id, setFunction) => {
    try {
        const res = await Api.get(`/reviews/${id}`);
        // // console.log("res", res);
        if (res.status === "success") {
            setFunction(res.data.reviews);
        }
    } catch (error) {
        console.log(error);
        // HandleNotifError(error);
    }
}

export const addProductReview = async (id, data) => {
    try {
        const res = await Api.post(`/reviews/${id}`, data);
        // // console.log(res);
        if (res.status === "success") {
            return res;
        }
    } catch (error) {
        console.log(error);
        HandleNotifError(error);
    }
}

export const addProduct = async (data) => {
    try {
        const res = await Api.post(`/products`, data);
        // // console.log(res);
        if (res.status === "success") {
            return res;
        }
    } catch (error) {
        // console.log(error);
        // HandleNotifError(error);
    }
}

export const editProduct = async (id, data) => {
    try {
        const res = await Api.put(`/products/${id}`, data);
        // // console.log(res);
        if (res.status === "success") {
            return res;
        }
    } catch (error) {
        // console.log(error);
        // HandleNotifError(error);
    }
}

export const addImageProduct = async (data) => {
    try {
        // console.log("data", data);
        const res = await ApiForm.post(`/upload/images`, data);
        // console.log(res);
        if (res.status === "success") {
            return res;
        }
    } catch (error) {
        // console.log(error);
        // HandleNotifError(error);
    }
}

export const deleteProduct = async (id) => {
    try {
        const res = await Api.delete(`/products/${id}`);
        // // console.log(res);
        if (res.status === "success") {
            return res;
        }
    } catch (error) {
        // console.log(error);
        // HandleNotifError(error);
    }
}