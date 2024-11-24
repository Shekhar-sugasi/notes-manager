import React from "react";
import "../styles/NoteList.css";

const NoteList = ({ notes, onDelete, onToggleComplete, onEdit }) => {
  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="note-item">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <span>{note.category}</span>
            <div className="note-actions">
              <button
                className={`toggle-btn ${
                  note.completed ? "incomplete" : "completed"
                }`}
                onClick={() => onToggleComplete(note.id)}
              >
                {note.completed
                  ? "Marked as Incomplete"
                  : "Marked as Completed"}
              </button>
              <button className="edit" onClick={() => onEdit(note)}>
                Edit
              </button>
              <button className="delete" onClick={() => onDelete(note.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NoteList;
