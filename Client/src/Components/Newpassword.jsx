import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../Utils/axiosInstance';

function Newpassword() {
  const { token } = useParams();
  const navigate=useNavigate();

  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token)
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const response = await axiosInstance.put(`/newpassword/${token}`, {
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword
      });

      if (response.data) {
        toast.success(response.data.message);
        navigate('/login')

      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred.');
      } else if (error.request) {
        toast.error('No response received from the server.');
      } else {
        toast.error('Error in setting up request: ' + error.message);
      }
    }
  };

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='flex flex-1 items-center justify-center'>
        <div className='w-[40%] mx-auto border border-gray-800 rounded-lg py-7'>
          <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
            <div className='flex items-center border border-gray-800 rounded-lg my-2'>
              <input 
                className='px-3 my-2 w-[90%] rounded-lg outline-none' 
                type='password' 
                name='newPassword'
                placeholder='New password' 
                value={passwords.newPassword} 
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex items-center border border-gray-800 rounded-lg my-2'>
              <input 
                className='px-3 my-2 w-[90%] rounded-lg outline-none' 
                type='password' 
                name='confirmPassword'
                placeholder='Confirm password' 
                value={passwords.confirmPassword} 
                onChange={handleChange}
                required
              />
            </div>
            <div className='text-white text-center py-2 font-semibold'>
              <button type="submit" className='bg-blue-600 w-full py-2 px-4 rounded-lg'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Newpassword;
