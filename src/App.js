import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    fetch("https://note-backend-qipi.onrender.com/notes")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setFilteredNotes(data);
      });
  }, []);

  const handleFormSubmit = async (noteData) => {
    try {
      const response = await fetch(
        `https://note-backend-qipi.onrender.com/notes${
          editNote ? `/${editNote.id}` : ""
        }`,
        {
          method: editNote ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noteData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (editNote) {
        setNotes((prev) =>
          prev.map((note) => (note.id === data.id ? data : note))
        );
        setFilteredNotes((prev) =>
          prev.map((note) => (note.id === data.id ? data : note))
        );
      } else {
        setNotes((prev) => [data, ...prev]);
        setFilteredNotes((prev) => [data, ...prev]);
      }
      setEditNote(null);
    } catch (error) {
      console.error("Failed to fetch:", error);
      alert("Failed to add or update the note. Please check your server.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://note-backend-qipi.onrender.com/notes/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setNotes((prev) => prev.filter((note) => note.id !== id));
        setFilteredNotes((prev) => prev.filter((note) => note.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const response = await fetch(
        `https://note-backend-qipi.onrender.com/notes/toggle/${id}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        const updatedNote = await response.json();
        setNotes((prev) =>
          prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
        );
        setFilteredNotes((prev) =>
          prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
        );
      }
    } catch (error) {
      console.error("Failed to toggle completion:", error);
    }
  };

  const handleSearch = ({ searchTerm, category }) => {
    const filtered = notes.filter((note) => {
      return (
        (!searchTerm ||
          note.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!category || note.category === category)
      );
    });
    setFilteredNotes(filtered);
  };

  return (
    <div className="app">
      <div>
        <h1>Personal Notes Manager</h1>
        <SearchBar onSearch={handleSearch} />
        <NoteForm onSubmit={handleFormSubmit} noteToEdit={editNote} />
      </div>
      <div>
        <NoteList
          notes={filteredNotes}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
          onEdit={(note) => setEditNote(note)}
        />
      </div>
    </div>
  );
};

export default App;
