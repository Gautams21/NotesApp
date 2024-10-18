// src/Components/EditNoteModal.js
import React, { useState } from "react";
import Taginput from "./Taginput"; // Assuming you have this component
import axiosInstance from "../Utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditNoteModal({ note, getallnotes, editcheck }) {
  const [form, setForm] = useState({
    title: note.title,
    content: note.content,
    tags: note.tags,
  });
  const [error, setError] = useState(null);

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
      // Edit existing note
      const response = await axiosInstance.put(`/edit/${note._id}`, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        toast.success(response.data.message);
        editcheck("");
        getallnotes();
      }

      // Clear the form after successful submission
      setForm({
        title: "",
        content: "",
        tags: [],
      });
    } catch (error) {
      // Handle error response
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-gray-900 text-3xl font-semibold">Title</label>
        <input
          className="p-2 rounded-lg placeholder:text-gray-800 border border-gray-900"
          type="text"
          name="title"
          placeholder="Enter your title"
          value={form.title}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-gray-800 text-lg font-semibold">Content</label>
        <textarea
          className="border border-gray-900 rounded-lg p-2"
          rows={4}
          cols={50}
          name="content"
          placeholder="Enter your content"
          value={form.content}
          onChange={handleChange}
        />
      </div>
      <div className="mt-8 mb-4">
        <label className="text-gray-800 text-lg font-semibold">Tags</label>
        <Taginput
          tag={form.tags}
          setTag={(tags) => setForm({ ...form, tags })}
        />
      </div>
      {error && <p className="text-red-500 text-sm pb-2">{error}</p>}
      <button
        className="w-full bg-blue-500 p-2 text-white font-semibold rounded-lg"
        onClick={handleSubmit}
      >
        Edit Note
      </button>
    </div>
  );
}

export default EditNoteModal;
