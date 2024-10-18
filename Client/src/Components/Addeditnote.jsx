import React, { useState } from 'react';
import Taginput from './Taginput';
import axiosInstance from '../Utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addeditnote({  getallnotes }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { title, content, tags } = form;
    try {
      const response = await axiosInstance.post('/add', {
        title: form.title,
        content: form.content,
        tags: form.tags,
      });

      if (response.data && response.data.note) {
       toast.success(response.data.message);
       getallnotes();
       setForm({
        title:"",
        content:"",
        tags:[]
       })
      }

      // Clear the form after successful submission
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } 
    }
  };

  return (
    <div className='max-w-md mx-auto'>
      <div className='flex flex-col gap-2 mb-4'>
        <label className='text-gray-900 text-3xl font-semibold'>Title</label>
        <input
          className='p-2 rounded-lg placeholder:text-gray-800 border border-gray-900'
          type='text'
          name='title'
          placeholder='Enter your title'
          value={form.title}
          onChange={handleChange}
        />
      </div>
      <div className='flex flex-col gap-2 mb-4'>
        <label className='text-gray-800 text-lg font-semibold'>Content</label>
        <textarea
          className='border border-gray-900 rounded-lg p-2'
          rows={4}
          cols={50}
          name='content'
          placeholder='Enter your content'
          value={form.content}
          onChange={handleChange}
        />
      </div>
      <div className='mt-8 mb-4'>
        <label className='text-gray-800 text-lg font-semibold'>Tags</label>
        <Taginput tag={form.tags} setTag={(tags) => setForm({ ...form, tags })} />
      </div>
      <button
        className='w-full bg-blue-500 p-2 text-white font-semibold rounded-lg'
        onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}

export default Addeditnote;
