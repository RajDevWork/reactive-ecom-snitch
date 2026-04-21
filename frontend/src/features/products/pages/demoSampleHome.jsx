import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useProduct';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

const Home = () => {
    const products = useSelector(state => state.product.products);
    const user = useSelector(state => state.auth.user);
    const cartItems = useSelector(state => state.cart.items);

    const { handleGetAllProducts } = useProduct();
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            await handleGetAllProducts();
            setLoading(false);
        };
        fetch();
    }, []);

    // Filtered Products
    const filteredProducts = products?.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    );

    // Suggestions (top 5)
    const suggestions = products
        ?.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 5);

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div className="min-h-screen bg-[#fafafa] text-[#1b1c1a] font-['Inter'] selection:bg-[#C9A96E]/30">

                {/* Navbar */}
                <nav className="sticky top-0 z-50 px-8 lg:px-16 xl:px-24 py-5 flex items-center justify-between backdrop-blur-md bg-white/70 border-b border-[#eae7e2]">
                    <Link to="/" className="text-lg tracking-[0.5em] uppercase text-[#C9A96E]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        Snitch.
                    </Link>

                    <div className="flex gap-6 items-center text-xs uppercase tracking-[0.3em] text-[#7A6E63]">

                        {/* Cart */}
                        <div onClick={() => navigate('/cart')} className="relative cursor-pointer group">
                            <svg viewBox="0 0 24 24" fill="currentColor"
                                className="w-6 h-6 text-[#1b1c1a] group-hover:text-[#C9A96E] transition">
                                <path d="M7 4H5L4 6H2V8H3L6.6 15.59L5.25 18.04C5.09 18.32 5 18.65 5 19C5 20.1 5.9 21 7 21H19V19H7.42C7.28 19 7.17 18.89 7.17 18.75L7.2 18.63L8.1 17H15.55C16.3 17 16.96 16.59 17.3 15.97L20.88 9.5C20.95 9.34 21 9.17 21 9C21 8.45 20.55 8 20 8H6.21L5.27 6H7V4Z"/>
                            </svg>

                            {cartItems?.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#C9A96E] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartItems.length}
                                </span>
                            )}
                        </div>

                        {user ? (
                            <>
                                <span className="text-[#1b1c1a]">{user.fullname}</span>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Sign In</Link>
                                <Link to="/register">Sign Up</Link>
                            </>
                        )}
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto px-6 lg:px-12">

                    {/* Hero */}
                    <div className="pt-28 pb-20 text-center">
                        <span className="text-xs uppercase tracking-[0.4em] text-[#C9A96E] block mb-6">
                            New Season
                        </span>

                        <h1 className="text-6xl lg:text-8xl font-light mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            Redefine <br /> Minimalism
                        </h1>

                        <p className="max-w-xl mx-auto text-sm text-[#7A6E63] mb-12">
                            Elevated essentials crafted for a bold, modern wardrobe.
                        </p>

                        {/* Search */}
                        <div className="relative max-w-xl mx-auto group z-50">

                            <input
                                type="text"
                                placeholder="Search curated pieces..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-14 pr-12 py-4 rounded-full bg-white border border-[#e6e3df] shadow-md focus:border-[#C9A96E] outline-none text-sm"
                            />

                            {/* Icon */}
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#999] group-focus-within:text-[#C9A96E] transition">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                                </svg>
                            </span>

                            {/* Clear */}
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#aaa]"
                                >
                                    ✕
                                </button>
                            )}

                            {/* Suggestions */}
                            {search && suggestions?.length > 0 && (
                                <div className="absolute w-full mt-3 bg-white border rounded-2xl shadow-lg overflow-hidden">
                                    {suggestions.map(item => (
                                        <div
                                            key={item._id}
                                            onClick={() => navigate(`/product/${item._id}`)}
                                            className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-100"
                                        >
                                            <img
                                                src={item.images?.[0]?.url}
                                                className="w-10 h-12 object-cover rounded"
                                            />
                                            <div>
                                                <p className="text-sm">{item.title}</p>
                                                <p className="text-xs text-gray-500">
                                                    {item.price?.currency} {item.price?.amount}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skeleton */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-32">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="w-full h-[420px] bg-gray-200 rounded-2xl" />
                                    <div className="mt-4 h-4 bg-gray-200 rounded w-3/4" />
                                    <div className="mt-2 h-3 bg-gray-200 rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : filteredProducts && filteredProducts.length > 0 ? (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-32">
                            {filteredProducts.map(product => {
                                const imageUrl = product.images?.[0]?.url;

                                return (
                                    <div key={product._id}
                                        onClick={() => navigate(`/product/${product._id}`)}
                                        className="group cursor-pointer">

                                        <div className="relative rounded-2xl overflow-hidden">

                                            <img src={imageUrl}
                                                className="w-full h-[420px] object-cover transition group-hover:scale-110"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                                            <div className="absolute bottom-0 p-5 text-white">
                                                <h3 className="text-lg">{product.title}</h3>
                                                <p className="text-sm">
                                                    ₹ {product.price?.amount}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    ) : (
                        <div className="text-center py-24">
                            <h2>No results found</h2>
                        </div>
                    )}
                </div>

                <footer className="border-t py-10 text-center text-xs tracking-[0.4em] text-[#C9A96E]">
                    Snitch. © {new Date().getFullYear()}
                </footer>
            </div>
        </>
    );
};

export default Home;