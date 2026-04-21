import {
    addItem,
    getCart,
    updateQuantity,
    removeItem,
    clearCart
} from "../service/cart.api";

import { useDispatch } from "react-redux";
import { setItems } from "../state/cart.slice";

export const useCart = () => {

    const dispatch = useDispatch();

    // 🟢 Fetch Cart
    async function handleGetCart() {
        try {
            const data = await getCart();
            dispatch(setItems(data.items));

            // console.log("data.items = ",data.cart.items)
            // console.log("data.items2 = ",data)
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    // 🟢 Add Item
    async function handleAddItem({ productId, variantId }) {
        try {
            const data = await addItem({ productId, variantId });

            // backend se updated cart aayega
            dispatch(setItems(data.items));

            return data;
        } catch (err) {
            console.log(err);
        }
    }

    // 🟢 Increase / Decrease Quantity
    async function handleUpdateQuantity({ itemId, quantity }) {
        try {
            const data = await updateQuantity({ itemId, quantity });
            dispatch(setItems(data.items));
        } catch (err) {
            console.log(err);
        }
    }

    // 🟢 Remove Item
    async function handleRemoveItem(itemId) {
        try {
            const data = await removeItem(itemId);
            dispatch(setItems(data.items));
        } catch (err) {
            console.log(err);
        }
    }

    // 🟢 Clear Cart
    async function handleClearCart() {
        try {
            const data = await clearCart();
            dispatch(setItems([]));
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    return {
        handleGetCart,
        handleAddItem,
        handleUpdateQuantity,
        handleRemoveItem,
        handleClearCart
    };
};