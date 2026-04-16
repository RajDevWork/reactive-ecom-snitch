import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    contactNumber: '',
    email: '',
    password: '',
    isSeller: false,
  });
  const navigate = useNavigate()
  const {handleRegister} = useAuth()
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' || type === 'radio' ? checked : value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    await handleRegister({
        email:formData.email,
        fullname:formData.fullname,
        contact:formData.contactNumber,
        password:formData.password,
        isSeller:formData.isSeller
    })
    navigate("/login")
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-[#FFF8DC] to-[#F0E68C] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#DAA520]/20 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#DAA520] to-[#B8860B] p-2 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Join Our Community</h1>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    required
                    className="w-full pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-[#DAA520] focus:ring-2 focus:ring-[#DAA520]/20 transition-all duration-200 bg-gray-50/50"
                    placeholder="Your full name"
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <div className="relative">
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    required
                    className="w-full pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-[#DAA520] focus:ring-2 focus:ring-[#DAA520]/20 transition-all duration-200 bg-gray-50/50"
                    placeholder="Your phone number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-[#DAA520] focus:ring-2 focus:ring-[#DAA520]/20 transition-all duration-200 bg-gray-50/50"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-[#DAA520] focus:ring-2 focus:ring-[#DAA520]/20 transition-all duration-200 bg-gray-50/50"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="relative">
                    <input
                      type="radio"
                      name="isSeller"
                      value="false"
                      checked={formData.isSeller === false}
                      onChange={() => setFormData({ ...formData, isSeller: false })}
                      className="sr-only peer"
                    />
                    <div className="p-3 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-[#DAA520] peer-checked:bg-[#DAA520]/10 transition-all duration-200 hover:border-[#DAA520]/50">
                      <div className="text-center">
                        <svg className="w-6 h-6 mx-auto mb-1 text-gray-400 peer-checked:text-[#DAA520]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="text-sm font-medium">Buyer</span>
                      </div>
                    </div>
                  </label>
                  <label className="relative">
                    <input
                      type="radio"
                      name="isSeller"
                      value="true"
                      checked={formData.isSeller === true}
                      onChange={() => setFormData({ ...formData, isSeller: true })}
                      className="sr-only peer"
                    />
                    <div className="p-3 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-[#DAA520] peer-checked:bg-[#DAA520]/10 transition-all duration-200 hover:border-[#DAA520]/50">
                      <div className="text-center">
                        <svg className="w-6 h-6 mx-auto mb-1 text-gray-400 peer-checked:text-[#DAA520]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="text-sm font-medium">Seller</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white font-semibold py-3 px-4 rounded-xl hover:from-[#B8860B] hover:to-[#DAA520] focus:outline-none focus:ring-4 focus:ring-[#DAA520]/30 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              Create Account
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#DAA520] hover:text-[#B8860B] font-medium transition-colors">
                Sign in
              </Link>
            </p><br />

            <a href="/api/auth/google" className="text-[#DAA520] hover:text-[#B8860B] font-medium transition-colors">
              Continue with Google
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;