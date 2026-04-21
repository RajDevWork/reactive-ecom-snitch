import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setItems } from '../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Increase quantity
  const handleIncrease = (id) => {
    const updated = cartItems.map(item =>
      item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    dispatch(setItems(updated));
  };

  // Decrease quantity
  const handleDecrease = (id) => {
    const updated = cartItems
      .map(item =>
        item._id === id
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
      .filter(item => item.quantity > 0);

    dispatch(setItems(updated));
  };

  // Remove item
  const handleRemove = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    dispatch(setItems(updated));
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.price.amount * (item.quantity || 1);
  }, 0);

  return (
    <div className="min-h-screen bg-[#fbf9f6] px-6 md:px-16 py-12">
      <h1 className="text-3xl mb-10 font-['Cormorant_Garamond']">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cartItems.map(item => (
              <div key={item._id} className="flex gap-5 bg-white rounded-xl p-4 shadow-sm border">

                <img
                  src={item.images?.[0]?.url}
                  alt={item.title}
                  className="w-24 h-28 object-cover rounded-md"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-medium">{item.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.price.currency} {item.price.amount}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => handleDecrease(item._id)}
                      className="px-3 py-1 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>

                    <span>{item.quantity || 1}</span>

                    <button
                      onClick={() => handleIncrease(item._id)}
                      className="px-3 py-1 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>

                    <button
                      onClick={() => handleRemove(item._id)}
                      className="ml-4 text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm border h-fit">
            <h2 className="text-xl mb-4">Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span>
                ₹ {totalPrice.toLocaleString()}
              </span>
            </div>

            <button className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:opacity-90">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;