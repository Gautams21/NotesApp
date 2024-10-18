const express = require("express");
const Route = express.Router();
const Note = require("../Models/NotesModel");
const { AuthenticationToken } = require("../Utilities");



// Add note
Route.post("/add", AuthenticationToken, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    // Check for required fields
    if (!title) {
      return res
        .status(400)
        .json({ error: true, message: "Title is required" });
    }
    if (!content) {
      return res
        .status(400)
        .json({ error: true, message: "Content is required" });
    }

    // Access user ID from the authenticated user
    // Get userID from the token

    // Create the note
    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      userID: user._id, // Use userID from the request
    });

    // Return success response
    return res
      .status(201)
      .json({ success: true, note, message: "Note added successfully" });
  } catch (error) {
    console.error("Error adding note:", error); // Log the error for debugging
    return res.status(500).json({ error: true, message: "Server Error" });
  }
});


// Edit note
Route.put("/edit/:noteId", AuthenticationToken, async(req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, content, tags,isPinned } = req.body;
    const {user}=req.user;
    
    const updateuser=await Note.findOne({_id:noteId,userID:user._id});
    if (!title) {
        return res
          .status(400)
          .json({ error: true, message: "Title is required" });
      }
      if (!content) {
        return res
          .status(400)
          .json({ error: true, message: "Content is required" });
      }
  
    if(title) updateuser.title=title;
    if(content) updateuser.content=content;
    if(tags)updateuser.tags=tags;
    if(isPinned)updateuser.isPinned=isPinned;

    await updateuser.save();

    return res.status(201).json({
        success:true,
        Data:updateuser,
        message:"Note Updated Successfully"
    })

  } catch (error) {
    return res.status(501).json({ error: true, message: "Server Error" });
  }
});
// get note acc.to user
Route.get('/getnotes',AuthenticationToken,async(req,res)=>{
   try {
    const {user}=req.user;
    const getnotes=await Note.find({userID:user._id}).sort({isPinned:-1});
    return res.status(200).json({success:true,getnotes})
    
   } catch (error) {
    return res.status(501).json({error:true,message:"Server Error"})
   }
})
// delete a note
Route.delete('/deletenote/:noteId',AuthenticationToken,async(req,res)=>{
    const noteId=req.params.noteId;
    const {user}=req.user;
    try {
        const note=await Note.findOne({_id:noteId,userID:user._id});
         if(!note){
            return res.status(401).json({error:true,message:"No Note found"});
         }
         await Note.deleteOne({_id:noteId,userID:user._id})

         return res.status(200).json({
            success:true,
            message:"Noted deleted successfully"
         })
        
    } catch (error) {
        return res.status(501).json({error:true,message:"Server Error"})
    }
})

// pin a note
Route.put('/pinnote/:noteId', AuthenticationToken, async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { user } = req.user;

    // Find the note by noteId and userId
    const note = await Note.findOne({ _id: noteId, userID: user._id });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    // Toggle the pinned status
    note.isPinned = !note.isPinned;

    // Save the updated note
    await note.save();

    return res.status(200).json({
      success: true,
      data: note,
      message: "Note pinned status updated successfully"
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// search note
Route.get('/searchnote', AuthenticationToken, async (req, res) => {
  try {
    // Extract user from request
    const {user} = req.user;

    // Extract query string
    const {search}  = req.query;

    // Check if search query is provided
    if (!search) {
      return res.status(400).json({ error: true, message: "Search query is required." });
    }

    // Perform the search
    const matchingnotes = await Note.find({
      userID: user._id, // Ensure the search is done for the authenticated user's notes
      $or: [
        { title: { $regex: new RegExp(search, 'i') } },   // Case-insensitive search in title
        { content: { $regex: new RegExp(search, 'i') } }  // Case-insensitive search in content
      ]
    });

    // Return success response with matching notes
    return res.json({
      success: true,
      notes: matchingnotes,
      message: "Notes matching search query retrieved successfully."
    });

  } catch (error) {
    // Log the error and return a server error response
    console.error('Error in /searchnote:', error);
    return res.status(500).json({ error: true, message: 'Server Error' });
  }
});

module.exports = Route;
