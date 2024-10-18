import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import { MdOutlineMail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { validemail } from '../../Utils/helper';
import axiosInstance from '../../Utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {
const [form,setForm]=useState({
   name:'',
   email:'',
   password:''
});

const[showpassword,setshowpassword]=useState(false);
const navigate=useNavigate();

function tooglepassword(){
    setshowpassword(!showpassword);
}
function inputhandle(e){
    const {name,value}=e.target;
    setForm(prevstate=>({
      ...prevstate,[name]:value
    }))
    }

async function handlesubmit(e){
    e.preventDefault();

      try {
        const response=await axiosInstance.post('/create-account',{
          name:form.name,
          email:form.email,
          password:form.password
        });
        if(response.data && response.data.error){
          toast.error(response.data.error);
          return
        }

        if(response.data && response.data.accessToken){
          localStorage.setItem('Token',response.data.accessToken);
          navigate('/dashboard');
          toast.success("User created sucessfully")
        }


      } catch (error) {
        if(error.response &&error.response.data && error.response.data.message){
          toast.error(error.response.data.message);
        }else{
          toast.error('An unexpected error Occurred.Please try again');
        }
      }
      
}
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='pb-2'>
      <div className='flex flex-col items-center lg:w-[40%] md:w-[60%] mx-auto border border-gray-800 rounded-lg py-6 my-[60px] '>
      <div className='bg-blue-600 py-2 px-5 rounded-lg text-white font-semibold'>
        <p className='text-[25px]'>SignUp</p>
      </div>
        <form onSubmit={handlesubmit} className='flex flex-col py-5 w-[70%]'>
        <div className='flex items-center border border-gray-800 rounded-lg my-2 '>
            <input className='px-3 my-2 w-[90%]  rounded-lg outline-none' type='text' name='name' placeholder='Enter your name' value={form.name} onChange={inputhandle}/>
            <FaUser/>
            </div>
        <div className='flex items-center border border-gray-800 rounded-lg my-2 '>
            <input className='px-3 my-2 w-[90%]  rounded-lg outline-none' type='email' name='email' placeholder='Enter your email' value={form.email} onChange={inputhandle}/>
            <MdOutlineMail/>
            </div>
            <div className='flex items-center border border-gray-800 rounded-lg my-2 '>
            <input className='px-3 my-2 w-[90%]  rounded-lg outline-none' type={showpassword?'text':'password'} placeholder='Enter your password' value={form.password} onChange={inputhandle} name='password'/>
            { showpassword?<FaRegEye onClick={tooglepassword}/>:<FaRegEyeSlash onClick={tooglepassword}/>}
            </div>
            <div className='flex flex-col items-center py-3'>
                <p>Already a Subscriber?</p>
                <Link to='/login' className='text-blue-700 font-semibold'>Login Here</Link>
            </div>
            <div className=' text-white text-center py-2 font-semibold'>
                <button type='submit' className='bg-blue-600 w-full py-2 rounded-lg'>Submit</button>
            </div>
        </form>
      </div>
      </div>
      </div>
  )
}

export default Signup;
