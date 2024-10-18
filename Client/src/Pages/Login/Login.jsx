import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import { MdOutlineMail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { validemail } from '../../Utils/helper';
import { IoMdCheckmark } from "react-icons/io";
import axiosInstance from '../../Utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [showpassword, setshowpassword] = useState(false);
  const [resetpassword,setResetpassword]=useState('');
  const[showreset,setShowreset]=useState(false);
  const navigate=useNavigate();

  function tooglepassword() {
    setshowpassword(!showpassword);
  }

  function inputhandle(e) {
    const { name, value } = e.target;
    setForm(prevstate => ({
      ...prevstate, [name]: value
    }));
  }

 async function handlesubmit(e) {
    e.preventDefault();
   try {
    const response=await axiosInstance.post("/login",{
      email:form.email,
      password:form.password
    });
    if(response.data && response.data.accessToken){
      localStorage.setItem('Token',response.data.accessToken);
      navigate('/dashboard');
      toast.success(response.data.message)

    }
   } catch (error) {
    if(error.response &&error.response.data && error.response.data.message){
      toast.error(error.response.data.message);
    }else{
      toast.error('An unexpected error Occurred.Please try again');
    }
   }
  }

  const getinfo=async()=>{
    try {
      const response=await axiosInstance.put("/forgot-password",{
        email:resetpassword,
      });
      if(response.data){
        toast.success(response.data.message);
        setResetpassword('');
        setShowreset(false)
      }

    } catch (error) {
      if(error.response &&error.response.data && error.response.data.message){
        toast.error(error.response.data.message);
      }else{
        toast.error('An unexpected error Occurred.Please try again');
      }
    }

  }

  // const getnew=async()=>{
  //   try {
  //     const response=await axiosInstance.put("/new-password",{
  //       password:newpassword,
  //     });
  //     if(response.data){
  //       toast.success(response.data.message);
  //       setResetpassword('');
  //       setNewpassword('');
  //       setShownew(false);
  //       setShowreset(false)
  //     }

  //   } catch (error) {
  //     if(error.response &&error.response.data && error.response.data.message){
  //       toast.error(error.response.data.message);
  //     }else{
  //       toast.error('An unexpected error Occurred.Please try again');
  //     }
  //   }
  // }

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='pb-7 '>
      <div className='flex flex-col items-center lg:w-[40%] md:w-[50%] mx-auto border border-gray-800 rounded-lg py-6 my-[60px]'>
        <div className='bg-blue-600 py-2 px-5 rounded-lg text-white font-semibold'>
          <p className='text-[25px]'>Login</p>
        </div>
        <form onSubmit={handlesubmit} className='flex flex-col py-5'>
          <div className='flex items-center border border-gray-800 rounded-lg my-2'>
            <input className='px-3 my-2 w-[90%]  rounded-lg outline-none' type='email' name='email' placeholder='Enter your email' value={form.email} onChange={inputhandle} />
            <MdOutlineMail />
          </div>
          <div className='flex items-center border border-gray-800 rounded-lg my-2'>
            <input className='px-3 my-2 w-[90%]  rounded-lg outline-none' type={showpassword ? 'text' : 'password'} placeholder='Enter your password' value={form.password} onChange={inputhandle} name='password'/>
            {showpassword ? <FaRegEye onClick={tooglepassword} /> : <FaRegEyeSlash onClick={tooglepassword}/>}
          </div>
          <div className='flex items-center'>
            <button type='button' onClick={()=>{setShowreset(true)}} className='w-full text-xm text-red-500 font-semibold underline'>forgot Password</button>
          </div>
          {
            showreset &&
            <div className='flex justify-between'>
            <div className='flex items-center border border-gray-800 rounded-lg my-2'>
            <input className='px-3 my-2 w-[90%]  rounded-lg outline-none' type='email' name='email' placeholder='Enter your email' value={resetpassword} onChange={(e)=>{setResetpassword(e.target.value)}} />
            <MdOutlineMail />
          </div>
          <div className='flex items-center '>
          <button onClick={()=>{getinfo()}} type='button' className='bg-blue-600 p-2 rounded-full text-gray-200 font-bold'><IoMdCheckmark/></button>
          </div>
          </div>
          }
         
        
          <div className='flex py-3'>
            <p>Not a Subscriber?</p>
            <Link to='/signup' className='text-blue-700 font-semibold'>Create Your Account</Link>
          </div>

          <div className='text-white text-center py-2 font-semibold'>
            <button type="submit" className='bg-blue-600 w-full py-2 rounded-lg'>Submit</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Login;
