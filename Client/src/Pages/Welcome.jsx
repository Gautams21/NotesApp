import React from 'react';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/signup');
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='lg:w-[90%] md:w-[90%] mx-auto flex flex-col-reverse  lg:flex-row justify-between items-center lg:py-20 py-10'>
                {/* Text Section */}
                <div className='lg:w-[50%] md:w-[55%] w-full flex flex-col items-center lg:items-start justify-center lg:mb-0 mb-8'>
                    <h1 className='lg:text-[40px] text-[25px] font-semibold text-gray-800 lg:mt-0 mt-7 text-center lg:text-left'>Welcome to the NoTeS ApP</h1>
                    <p className='lg:text-[25px] text-[18px] font-medium text-gray-600 lg:mt-4 mt-2 text-center lg:text-left'>
                        Start Your Journey Today
                    </p>
                    <button
                        className='bg-blue-600 hover:bg-blue-700 px-7 text-white font-semibold py-2 rounded-lg mt-6 transition duration-300 ease-in-out transform hover:scale-105'
                        onClick={handleNavigate}
                    >
                        Get Started
                    </button>
                </div>
                {/* Image Section */}
                <div className='lg:w-[45%] md:w-[65%] w-full flex justify-center'>
                    <img
                        className='w-full h-auto overflow-hidden m-3 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105'
                        src='https://plus.unsplash.com/premium_photo-1683417272601-dbbfed0ed718?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt='Welcome'
                    />
                </div>
            </div>
        </div>
    );
}

export default Welcome;
