import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../hook/useCart';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items) || [];
  const user = useSelector(state => state.auth.user);

  // console.log("user = ",user)

  // console.log("cartItems = ",cartItems)

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
   <div className="min-h-screen bg-[#f8f7f5] text-[#1b1c1a]">

  {/* Navbar */}
  <nav className="sticky top-0 z-50 px-8 lg:px-16 xl:px-24 py-5 flex items-center justify-between backdrop-blur-xl bg-white/60 border-b border-[#ece9e4] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
    
    <Link
      to="/"
      className="text-xl tracking-[0.6em] uppercase text-[#C9A96E] hover:opacity-80 transition"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      Snitch.
    </Link>

    <div className="flex gap-6 items-center text-xs uppercase tracking-[0.3em] text-[#7A6E63]">

      {/* Cart */}
      <div
        onClick={() => navigate('/cart')}
        className="relative cursor-pointer group"
      >
        <div className="p-2 rounded-full bg-white shadow-sm group-hover:shadow-md transition">
          <svg className="w-5 h-5 text-[#1b1c1a] group-hover:text-[#C9A96E] transition" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 4H5L4 6H2V8H3L6.6 15.59L5.25 18.04C5.09 18.32 5 18.65 5 19C5 20.1 5.9 21 7 21H19V19H7.42C7.28 19 7.17 18.89 7.17 18.75L7.2 18.63L8.1 17H15.55C16.3 17 16.96 16.59 17.3 15.97L20.88 9.5C20.95 9.34 21 9.17 21 9C21 8.45 20.55 8 20 8H6.21L5.27 6H7V4Z"/>
          </svg>
        </div>

        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#C9A96E] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow">
            {cartItems.length}
          </span>
        )}
      </div>

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
  <div className="px-6 md:px-16 py-14">

    <h1 className="text-4xl mb-12 tracking-tight font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      Your Cart
    </h1>

    {cartItems.length === 0 ? (
      <p className="text-gray-500">Your cart is empty.</p>
    ) : (
      <div className="grid lg:grid-cols-3 gap-12">

        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {cartItems.map(item => (
            <div
              key={item._id}
              className="flex gap-6 bg-white rounded-2xl p-5 border border-[#ece9e4] shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition duration-300"
            >

              {/* Image */}
              <div className="overflow-hidden rounded-xl">
                <img
                  src={item.product?.images?.[0]?.url || '/fallback.png'}
                  alt={item.product?.title}
                  className="w-28 h-32 object-cover transition duration-500 hover:scale-110"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">

                <div>
                  <h2 className="text-lg font-medium mb-1">
                    {item.product?.title}
                  </h2>

                  <p className="text-sm text-[#7A6E63]">
                    {item.price?.currency} {item.price?.amount}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4 mt-4">

                  <div className="flex items-center border rounded-full overflow-hidden">

                    <button
                      onClick={() =>
                        handleUpdateQuantity({
                          itemId: item._id,
                          quantity: Math.max(1, (item.quantity || 1) - 1)
                        })
                      }
                      className="px-4 py-1 cursor-pointer active:scale-95 hover:bg-[#f5f3f0] transition"
                    >
                      −
                    </button>

                    <span className="px-4 text-sm">
                      {item.quantity || 1}
                    </span>

                    <button
                      onClick={() =>
                        handleUpdateQuantity({
                          itemId: item._id,
                          quantity: (item.quantity || 1) + 1
                        })
                      }
                      className="px-4 py-1 active:scale-95 cursor-pointer hover:bg-[#f5f3f0] transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-sm cursor-pointer active:scale-95 text-red-400 hover:text-red-600 transition"
                  >
                    Remove
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Summary */}
        <div className="sticky top-28 h-fit bg-white rounded-2xl p-6 border border-[#ece9e4] shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

          <h2 className="text-xl mb-6 font-medium">Summary</h2>

          <div className="flex justify-between mb-4 text-sm">
            <span>Total</span>
            <span className="font-medium">
              ₹ {totalPrice.toLocaleString()}
            </span>
          </div>

          <button className="w-full mt-6 bg-[#1b1c1a] cursor-pointer active:scale-95 text-white py-3 rounded-full tracking-wide hover:opacity-90 transition">
            Proceed to Checkout
          </button>

        </div>

      </div>
    )}
  </div>
</div>
  );
};

export default Cart;