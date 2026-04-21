import axios from "axios";

const cartApiInstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
});


// 🟢 Get full cart
export const getCart = async () => {
    const response = await cartApiInstance.get("/");
    return response.data;
};


// 🟢 Add item
export const addItem = async ({ productId, variantId }) => {
    const response = await cartApiInstance.post(
        `/add/${productId}/${variantId}`,
        { quantity: 1 }
    );
    return response.data;
};


// 🟢 Update quantity
export const updateQuantity = async ({ itemId, quantity }) => {
    const response = await cartApiInstance.patch(
        `/update/${itemId}`,
        { quantity }
    );
    return response.data;
};


// 🟢 Remove item
export const removeItem = async (itemId) => {
    const response = await cartApiInstance.delete(
        `/remove/${itemId}`
    );
    return response.data;
};


// 🟢 Clear cart
export const clearCart = async () => {
    const response = await cartApiInstance.delete(`/clear`);
    return response.data;
};