import Api from "../Api";
// import HandleNotifError from "../HandleNotifError";

export const fetchProduct = async (limit, offset, setFunction) => {
    try {
        const res = await Api.get(`/products`, {
            params: {
                limit: limit,
                offset: offset
            }
        });
        // console.log(res);
        if (res.status === "success") {
            setFunction(res.data);
        }
    } catch (error) {
        console.log(error);
        // HandleNotifError(error);
    }
};

export const fetchProductById = async (id, setFunction) => {
    try {
        const res = await Api.get(`/products/${id}`);
        console.log("res", res);
        if (res.status === "success") {
            setFunction(res.data.product);
        }
    } catch (error) {
        console.log(error);
        // HandleNotifError(error);
    }
}