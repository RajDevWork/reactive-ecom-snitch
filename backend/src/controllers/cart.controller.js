import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import { stockOfVariant } from "../dao/product.dao.js";

/* ================================
   ADD TO CART
================================ */
export const addToCart = async (req, res) => {
    try {
        const { productId, variantId } = req.params;
        const { quantity = 1 } = req.body;

        const product = await productModel.findOne({
            _id: productId,
            "variants._id": variantId
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product or variant not found"
            });
        }

        const stock = await stockOfVariant(productId, variantId);

        let cart = await cartModel.findOne({ user: req.user._id });

        if (!cart) {
            cart = await cartModel.create({ user: req.user._id });
        }

        const existingItem = cart.items.find(
            item =>
                item.product.toString() === productId &&
                item.variant?.toString() === variantId
        );

        if (existingItem) {
            if (existingItem.quantity + quantity > stock) {
                return res.status(400).json({
                    success: false,
                    message: `Only ${stock} items left in stock`
                });
            }

            existingItem.quantity += quantity;
        } else {
            if (quantity > stock) {
                return res.status(400).json({
                    success: false,
                    message: `Only ${stock} items left in stock`
                });
            }

            cart.items.push({
                product: productId,
                variant: variantId,
                quantity,
                price: product.price
            });
        }

        await cart.save();

        const updatedCart = await cart.populate("items.product");

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            items: updatedCart.items
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


/* ================================
   GET CART
================================ */
export const getCart = async (req, res) => {
    try {
        let cart = await cartModel
            .findOne({ user: req.user._id })
            .populate("items.product");

        if (!cart) {
            cart = await cartModel.create({ user: req.user._id });
        }

        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            items: cart.items
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


/* ================================
   UPDATE QUANTITY
================================ */
export const updateQuantity = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        console.log(itemId,quantity)

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1"
            });
        }

        const cart = await cartModel.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const item = cart.items.id(itemId);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        const stock = await stockOfVariant(item.product, item.variant);

        if (quantity > stock) {
            return res.status(400).json({
                success: false,
                message: `Only ${stock} items available`
            });
        }

        item.quantity = quantity;

        await cart.save();

        const updatedCart = await cart.populate("items.product");

        return res.status(200).json({
            success: true,
            message: "Quantity updated",
            items: updatedCart.items
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
};


/* ================================
   REMOVE ITEM
================================ */
export const removeItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        const cart = await cartModel.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item._id.toString() !== itemId
        );

        await cart.save();

        const updatedCart = await cart.populate("items.product");

        return res.status(200).json({
            success: true,
            message: "Item removed",
            items: updatedCart.items
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


/* ================================
   CLEAR CART
================================ */
export const clearCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = [];

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart cleared",
            items: []
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};