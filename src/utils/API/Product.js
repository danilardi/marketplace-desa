import client from "../client";

export const fetchProduct = async (limit, offset, setFunction) => {
    try {
        const res = await client.get(`/products`, {
            params: {
                limit: limit,
                offset: offset
            }
        });
        // console.log(res);
        if (res.status === 200) {
            setFunction(res.data.data);
        }
    } catch (error) {
        console.error(error);
    }
};

export const fetchProductById = async (id, setFunction) => {
    try {
        const res = await client.get(`/products/${id}`);
        // console.log(res);
        if (res.status === 200) {
            setFunction(res.data.data.product);
        }
    } catch (error) {
        console.error(error);
    }
}