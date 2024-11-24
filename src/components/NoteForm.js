import { useState, useEffect } from "react";
import "../styles/NoteForm.css";

const NoteForm = ({ onSubmit, noteToEdit }) => {
  const [title, setTitle] = useState(noteToEdit ? noteToEdit.title : "");
  const [description, setDescription] = useState(
    noteToEdit ? noteToEdit.description : ""
  );
  const [category, setCategory] = useState(
    noteToEdit ? noteToEdit.category : "Others"
  );

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setDescription(noteToEdit.description);
      setCategory(noteToEdit.category);
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const noteData = { title, description, category };

    onSubmit(noteData);

    setTitle("");
    setDescription("");
    setCategory("Others");
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h2>{noteToEdit ? "Edit Note" : "Add Note"}</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Others">Others</option>
        </select>
      </label>
      <button type="submit">{noteToEdit ? "Update Note" : "Add Note"}</button>
    </form>
  );
};

export default NoteForm;
