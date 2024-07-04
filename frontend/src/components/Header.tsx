import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("accessToken")
        navigate('/')
    }
    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 w-full z-10">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <button 
                onClick={logout} 
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
            >
                Logout
            </button>
        </header>
    );
};

export default Header;