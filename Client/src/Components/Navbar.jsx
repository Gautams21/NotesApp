import React, { useState } from 'react';
import { IoPeople } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { nameintials } from '../Utils/helper';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar({ userinfo,searchnote,getallnotes }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const logout = () => {
    localStorage.clear();  // Clear the token or any stored user data
    navigate('/login');
    toast.success('Logged out Successfully')

  };

  const clearsearch = () => {
    setSearch('');
    getallnotes();
  };

  const handlesearch = () => {
    // Logic for handling the search
    if(search){
      searchnote(search)
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link to='/dashboard' className="btn btn-ghost text-xl">NoTeS ApP</Link>
        </div>
        
        <div className="navbar-center hidden md:block  lg:block">
          <div className='flex items-center border border-gray-800 p-2 px-7 rounded-lg bg-slate-300'>
            <div className='flex items-center mx-3'>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='outline-none  bg-transparent text-gray-900 placeholder-gray-900'
                type='text'
                placeholder='Search your note here'
              />
              {search && (
                <IoMdClose className='text-slate-700 hover:text-gray-900 cursor-pointer' onClick={clearsearch} />
              )}
            </div>
            <FaSearch onClick={handlesearch} className='text-slate-700 hover:text-gray-900 cursor-pointer' />
          </div>
        </div>
        <div className="navbar-end ">
          {/* Ensure userinfo exists before accessing its properties */}
          {userinfo&&<>
              <Link className="btn bg-blue-600 text-[20px] text-white hover:bg-blue-600 rounded-full">
                {nameintials(userinfo.Fullname)} 
              </Link>
              <div className=' p-1 m-1 flex flex-col items-center'>
              <div className='flex items-center gap-2'>
              <p className='text-gray-900 font-bold'>{userinfo.Fullname}</p>
              <IoPeople />
              </div>
              <button onClick={logout} className=' underline font-semibold mx-3 text-[15px]'>
                Logout
              </button>
              </div>
            </>}
        </div>
      </div>
      <div className=" w-[70%] mx-auto py-3  lg:hidden md:hidden">
      {
        userinfo&&<><div className='flex items-center border border-gray-800 p-2 px-3 rounded-lg bg-slate-300'>
            <div className='flex items-center mx-1'>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='outline-none text-sm  bg-transparent text-gray-900 placeholder-gray-900'
                type='text'
                placeholder='Search your note here'
              />
              {search && (
                <IoMdClose className='text-slate-700 hover:text-gray-900 cursor-pointer' onClick={clearsearch} />
              )}
            </div>
            <FaSearch onClick={handlesearch} className='text-slate-700 hover:text-gray-900 cursor-pointer' />
          </div>
        </>
      }  
        </div>
      
    </div>
   
  );
}

export default Navbar;
