import React, { useEffect, useState } from "react";

const Notes = () => {
  const [mode, setMode] = useState("view"); 
  const [notes, setNotes] = useState([]); // This holds our active notes
  const [deletedNotes, setDeletedNotes] = useState([]); // This holds trashed notes
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // 1. Load data from Storage as soon as the app starts
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const savedDeleted = JSON.parse(localStorage.getItem("deletedNotes")) || [];
    setNotes(savedNotes);
    setDeletedNotes(savedDeleted);
  }, []);

  // 2. Helper function to save to Storage whenever state changes
  // We call this every time we add, delete, or edit
  const persistData = (updatedNotes, updatedDeleted) => {
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    localStorage.setItem("deletedNotes", JSON.stringify(updatedDeleted));
  };

  // ADD NOTE
  const saveHandler = () => {
    if (!text.trim()) return;
    
    const newNotes = [...notes, text]; // Create new array
    setNotes(newNotes); // Update State (UI)
    persistData(newNotes, deletedNotes); // Update Storage (Notebook)
    
    setText("");
    setMode("view");
  };

  // DELETE NOTE (Move to Trash)
  const deleteHandler = (index) => {
    const noteToDelete = notes[index];
    
    // Filter out the deleted note from active notes
    const newNotes = notes.filter((_, i) => i !== index);
    // Add it to the deleted notes list
    const newDeleted = [...deletedNotes, noteToDelete];

    setNotes(newNotes);
    setDeletedNotes(newDeleted);
    persistData(newNotes, newDeleted);
  };

  // EDIT SAVE
  const editSaveHandler = () => {
    const updatedNotes = notes.map((note, index) =>
      index === editIndex ? text : note
    );

    setNotes(updatedNotes);
    persistData(updatedNotes, deletedNotes);
    
    setText("");
    setEditIndex(null);
    setMode("view");
  };

  const editHandler = (index) => {
    setText(notes[index]);
    setEditIndex(index);
    setMode("edit");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>My Notes</h2>
      {/* Navigation */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setMode("add")}>Add ➕</button>
        <button onClick={() => setMode("view")}>View 📒 ({notes.length})</button>
        <button onClick={() => setMode("delete")}>Trash 🧺 ({deletedNotes.length})</button>
      </div>

      {/* Add/Edit UI */}
      {(mode === "add" || mode === "edit") && (
        <div>
          <textarea
            rows="4"
            style={{ width: "100%", display: "block", marginBottom: "10px" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something..."
          />
          <button onClick={mode === "edit" ? editSaveHandler : saveHandler}>
            {mode === "edit" ? "Update Note" : "Save Note"}
          </button>
          <button onClick={() => {setText(""); setMode("view")}}>Cancel</button>
        </div>
      )}

      {/* View Active Notes */}
      {mode === "view" && (
        <div>
          {notes.length === 0 && <p>No notes found. Add one!</p>}
          {notes.map((note, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
              <p>{note}</p>
              <button onClick={() => editHandler(index)}>Edit ✏️</button>
              <button onClick={() => deleteHandler(index)} style={{ color: "red" }}>Delete 🗑️</button>
            </div>
          ))}
        </div>
      )}

      {/* View Deleted Notes */}
      {mode === "delete" && (
        <div>
          <h3>Trash Bin</h3>
          {deletedNotes.length === 0 && <p>Trash is empty.</p>}
          {deletedNotes.map((note, index) => (
            <p key={index} style={{ color: "gray", textDecoration: "line-through" }}>{note}</p>
          ))}
          {deletedNotes.length > 0 && (
            <button onClick={() => { setDeletedNotes([]); localStorage.removeItem("deletedNotes"); }}>
              Empty Trash
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Notes;