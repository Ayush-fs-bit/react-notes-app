import { useEffect, useState } from "react";

const Noteform = ({ onAddNote, noteToEdit,onUpdateNote,onCancel}) => {
  const [category, setCategory] = useState('other');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  
  useEffect(() => {
        if (noteToEdit) {
          setTitle(noteToEdit.title);
          setContent(noteToEdit.content);
          setCategory(noteToEdit.category);
        }
      }, [noteToEdit]);


  function handleSubmit() {
    if (noteToEdit) {
      if(!content.trim())return;
      onUpdateNote({
        id:noteToEdit.id,
        title,
        content,
        category
      })
    } else {
      if (!content.trim()) return;
      onAddNote({
        id: Date.now(),
        title,
        content,
        category
      })
      setTitle('');
      setContent('');
      setCategory('other');
    }
  }


  function handleCancel() {
    setTitle('');
    setContent('');
    setCategory('other');
    onCancel && onCancel();
  }

  return (
    <div className="note-form">
      <header>
        <h2>{noteToEdit ? "Edit Note" : "Add New Note"}</h2>
        <p>{noteToEdit ? "update your note" : "create a new note and get started"}</p>
      </header>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <label htmlFor="formTitle">Title</label>
        <input type="text" id="formTitle" placeholder="Enter a note title..." value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="formCategories">Category</label>
        <select id="formCategories" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value={'other'}>other</option>
          <option value={'work'}>work</option>
          <option value={'study'}>study</option>
          <option value={'personal'}>personal</option>
          <option value={'idea'}>idea</option>

        </select>
        <label htmlFor="formContent">Content</label>
        <textarea id="formContent" placeholder="start writing your notes..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <button type="button" onClick={handleCancel}>Cancel</button>
        <button type="submit">Save</button>
      </form>

    </div>);
}

export default Noteform;