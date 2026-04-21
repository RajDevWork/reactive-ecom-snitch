import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../hook/useCart';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items) || []; // ✅ FIX
  const user = useSelector(state => state.auth.user);

  console.log("user = ",user)

  console.log("cartItems = ",cartItems)

  const {
    handleGetCart,
    handleUpdateQuantity,
    handleRemoveItem
  } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    handleGetCart();
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + (item.price?.amount || 0) * (item.quantity || 1);
  }, 0);

  return (
    <div className="min-h-screen bg-[#fbf9f6]">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 px-8 lg:px-16 xl:px-24 py-5 flex items-center justify-between backdrop-blur-md bg-white/70 border-b border-[#eae7e2]">
        
        <Link
          to="/"
          className="text-lg tracking-[0.5em] uppercase text-[#C9A96E]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Snitch.
        </Link>

        <div className="flex gap-6 items-center text-xs uppercase tracking-[0.3em] text-[#7A6E63]">

          {/* Cart Icon */}
          <div
            onClick={() => navigate('/cart')}
            className="relative cursor-pointer group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-[#1b1c1a] group-hover:text-[#C9A96E] transition"
            >
              <path d="M7 4H5L4 6H2V8H3L6.6 15.59L5.25 18.04C5.09 18.32 5 18.65 5 19C5 20.1 5.9 21 7 21H19V19H7.42C7.28 19 7.17 18.89 7.17 18.75L7.2 18.63L8.1 17H15.55C16.3 17 16.96 16.59 17.3 15.97L20.88 9.5C20.95 9.34 21 9.17 21 9C21 8.45 20.55 8 20 8H6.21L5.27 6H7V4ZM7 23C5.9 23 5 22.1 5 21C5 19.9 5.9 19 7 19C8.1 19 9 19.9 9 21C9 22.1 8.1 23 7 23ZM17 23C15.9 23 15 22.1 15 21C15 19.9 15.9 19 17 19C18.1 19 19 19.9 19 21C19 22.1 18.1 23 17 23Z"/>
            </svg>

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C9A96E] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>

          {/* User */}
          {user ? (
            <span className="text-[#1b1c1a]">{user.fullname}</span>
          ) : (
            <>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="px-6 md:px-16 py-12">

        <h1 className="text-3xl mb-10 font-['Cormorant_Garamond']">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Items */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {cartItems.map(item => (
                <div
                  key={item._id}
                  className="flex gap-5 bg-white rounded-xl p-4 shadow-sm border"
                >

                  {/* Image */}
                  <img
                    src={item.product?.images?.[0]?.url || '/fallback.png'}
                    alt={item.product?.title}
                    className="w-24 h-28 object-cover rounded-md"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">

                    <div>
                      <h2 className="font-medium">
                        {item.product?.title || 'Product'}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.price?.currency} {item.price?.amount}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-4">

                      <button
                        onClick={() =>
                          handleUpdateQuantity({
                            itemId: item._id,
                            quantity: Math.max(1, (item.quantity || 1) - 1)
                          })
                        }
                        className="px-3 py-1 border rounded hover:bg-gray-100"
                      >
                        -
                      </button>

                      <span>{item.quantity || 1}</span>

                      <button
                        onClick={() =>
                          handleUpdateQuantity({
                            itemId: item._id,
                            quantity: (item.quantity || 1) + 1
                          })
                        }
                        className="px-3 py-1 border rounded hover:bg-gray-100"
                      >
                        +
                      </button>

                      <button
                        onClick={() => handleRemoveItem(item._id)}
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
                <span>₹ {totalPrice.toLocaleString()}</span>
              </div>

              <button className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:opacity-90">
                Checkout
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;