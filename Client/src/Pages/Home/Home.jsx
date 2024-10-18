import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import Notecards from '../../Components/Notecards';
import moment from 'moment';
import { MdAdd } from 'react-icons/md';
import Editnote from '../../Components/Editnote';
import axiosInstance from '../../Utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Addeditnote from '../../Components/Addeditnote';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [userinfo, setUserinfo] = useState(null);
  const [allnotes, setAllnotes] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null); // State to store the note being edite // State to track if a note has been edited
  const navigate = useNavigate();

  // Fetch user info
  const getinfo = async () => {
    try {
      const response = await axiosInstance.get('/getuser');
      if (response.data && response.data.user) {
        setUserinfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  // Get all notes
  const getallnotes = async () => {
    try {
      const response = await axiosInstance.get('/getnotes');
      if (response.data && response.data.getnotes) {
        setAllnotes(response.data.getnotes);
      }
    } catch (error) {
      toast.error('An error occurred, try again');
    }
  };

  // Search note
  const searchnote = async (query) => {
    if (!query) {
      // Reset notes if search query is empty
      getallnotes();
      setSearching(false);
      return;
    }

    try {
      const response = await axiosInstance.get('/searchnote', {
        params: { search: query },
      });

      if (response.data && response.data.notes) {
        setSearching(true);
        setAllnotes(response.data.notes);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Effect to load notes and user info on mount and when a note is edited
  useEffect(() => {
    getallnotes();
    getinfo();
   // Reset after fetching
  }, [selectedNote]); // Re-run when hasEdited changes

  // Handle edit note action
  const handleEditNote = (note) => {
    setSelectedNote(note);
    document.getElementById('edit_note_modal').showModal();
  };

  // Handle delete note
  const handledelete = async (note) => {
    try {
      const response = await axiosInstance.delete(`/deletenote/${note._id}`);
      if (response.data) {
        getallnotes();
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };
  const handlePinNote = async (note) => {
    try {
      const updatedIsPinned = !note.isPinned; // Toggle pin status
      const response = await axiosInstance.put(`/pinnote/${note._id}`, { isPinned: updatedIsPinned });

      if (response.data && response.data.success) {
        getallnotes(); // Refresh notes after pinning
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };
  

  return (
    <div className='min-h-screen relative'>
      <Navbar userinfo={userinfo} getallnotes={getallnotes}  searchnote={searchnote} />
      <div className='w-[80%] mx-auto'>
        {allnotes.length > 0 ? (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8'>
            {allnotes.map((item) => (
              <Notecards
                key={item._id}
                title={item.title}
                date={moment(item.createdAt).format('Do MMM YYYY')}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                isEdit={() => handleEditNote(item)} // Open edit modal on click
                isDeleted={() => handledelete(item)}
                onPinnote={()=>{handlePinNote(item)}} // Implement deletion logic
              />
            ))}
          </div>
        ) : (
          <div className='flex items-center justify-center '>
            <p>No notes available.</p>
          </div>
        )}
      </div>

      {/* Button to open add note modal */}
      <button
        className='btn bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center text-white fixed right-4 bottom-4 md:right-10 md:bottom-10 shadow-lg hover:bg-blue-600'
        onClick={() => document.getElementById('add_note_modal').showModal()}
      >
        <MdAdd className='font-bold' />
      </button>

      {/* Modal for adding note */}
      <dialog id='add_note_modal' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <Addeditnote getallnotes={getallnotes} closeModal={() => document.getElementById('add_note_modal').close()} />
        </div>
      </dialog>

      {/* Modal for editing note */}
      <dialog id='edit_note_modal' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button onClick={() => { setSelectedNote(''); }} className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          {selectedNote && (
            <Editnote
              note={selectedNote}
              getallnotes={getallnotes}
              editcheck={setSelectedNote}// Pass the state setter to update when editing is done
            />
          )}
        </div>
      </dialog>
    </div>
  );
}

export default Home;
