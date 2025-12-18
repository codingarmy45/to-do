import React, { useState } from "react";

const Notes = () => {
  const [mode, setMode] = useState(""); // add | view | delete | edit
  const [notes, setNotes] = useState([]);
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Add note
  const saveHandler = () => {
    if (!text.trim()) return;
    setNotes([...notes, text]);
    setText("");
  };

  // Delete note
  const deleteHandler = (index) => {
    setDeletedNotes([...deletedNotes, notes[index]]);
    setNotes(notes.filter((_, i) => i !== index));
  };

  // Edit note
  const editHandler = (index) => {
    setText(notes[index]);
    setEditIndex(index);
    setMode("edit");
  };

  // Save edited note
  const editSaveHandler = () => {
    setNotes(
      notes.map((note, index) =>
        index === editIndex ? text : note
      )
    );
    setText("");
    setEditIndex(null);
    setMode("view");
  };

  return (
    <div>
      {/* Buttons */}
      <div>
        <button onClick={() => setMode("add")}>Add ➕</button>
        <button onClick={() => setMode("view")}>View 📒</button>
        <button onClick={() => setMode("delete")}>Deleted 🧺</button>
      </div>

      {/* Add */}
      {mode === "add" && (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={saveHandler}>Save</button>
        </div>
      )}

      {/* Edit */}
      {mode === "edit" && (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={editSaveHandler}>Update</button>
        </div>
      )}

      {/* View */}
      {mode === "view" &&
        notes.map((note, index) => (
          <div key={index}>
            <p>{note}</p>
            <button onClick={() => deleteHandler(index)}>Delete</button>
            <button onClick={() => editHandler(index)}>Edit ✏️</button>
          </div>
        ))}

      {/* Deleted Notes */}
      {mode === "delete" &&
        deletedNotes.map((note, index) => (
          <p key={index}>{note}</p>
        ))}
    </div>
  );
};

export default Notes;
