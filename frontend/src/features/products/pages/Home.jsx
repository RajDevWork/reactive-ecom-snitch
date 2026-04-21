import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useProduct';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

const Home = () => {
    const products = useSelector(state => state.product.products);
    const user = useSelector(state => state.auth.user);
    const { handleGetAllProducts } = useProduct();

    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    const filteredProducts = products?.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    );

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
                        {user ? (
                            <>
                                <span className="text-[#1b1c1a]">{user.fullname}</span>
                                {user.role === 'seller' && (
                                    <Link to="/seller/dashboard" className="hover:text-[#C9A96E]">Dashboard</Link>
                                )}
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-[#C9A96E]">Sign In</Link>
                                <Link to="/register" className="hover:text-[#C9A96E]">Sign Up</Link>
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
                            Redefine
                            <br /> Minimalism
                        </h1>

                        <p className="max-w-xl mx-auto text-sm text-[#7A6E63] leading-relaxed mb-12">
                            Elevated essentials crafted for a bold, modern wardrobe.
                        </p>

                        {/* Search */}
                        <div className="relative max-w-xl mx-auto group">
                        <input
                            type="text"
                            placeholder="Search curated pieces..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="
                                w-full pl-14 pr-12 py-4 
                                rounded-full 
                                bg-white 
                                border border-[#e6e3df]
                                shadow-[0_10px_30px_rgba(0,0,0,0.04)]
                                focus:shadow-[0_15px_40px_rgba(0,0,0,0.08)]
                                focus:border-[#C9A96E]
                                outline-none 
                                text-sm tracking-wide
                                transition-all duration-300
                            "
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
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-black transition"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    </div>

                    {/* Grid */}
                    {filteredProducts && filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pb-32">
                            {filteredProducts.map(product => {
                                const imageUrl = product.images?.[0]?.url || '/snitch_editorial_warm.png';

                                return (
                                    <div
                                        key={product._id}
                                        onClick={() => navigate(`/product/${product._id}`)}
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative rounded-2xl overflow-hidden">

                                            {/* Image */}
                                            <img
                                                src={imageUrl}
                                                alt={product.title}
                                                className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-110"
                                            />

                                            {/* Gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-white/20 to-transparent" />

                                                {/* Content */}
                                                <div className="absolute text-white bottom-0 left-0 right-0 p-5">
                                                    <div className="relative z-10">

                                                        {/* Always visible */}
                                                        <h3
                                                            className="text-lg mb-1"
                                                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                                        >
                                                            {product.title}
                                                        </h3>

                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm font-medium">
                                                                {product.price?.currency} {product.price?.amount?.toLocaleString()}
                                                            </span>

                                                            <span className="text-sm text-[#C9A96E] opacity-0 group-hover:opacity-100 transition duration-500">
                                                                Explore →
                                                            </span>
                                                        </div>

                                                        {/* Only on hover */}
                                                        <p className="text-xs text-white line-clamp-2 mt-2 opacity-0 group-hover:opacity-100 transition duration-500">
                                                            {product.description}
                                                        </p>

                                                    </div>
                                                </div>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <h2 className="text-2xl mb-4">No results found</h2>
                            <p className="text-[#7A6E63]">Try something else.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer className="border-t border-[#eae7e2] py-10 text-center text-xs tracking-[0.4em] text-[#C9A96E]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Snitch. © {new Date().getFullYear()}
                </footer>
            </div>
        </>
    );
};

export default Home;