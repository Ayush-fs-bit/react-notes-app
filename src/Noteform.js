import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Noteform = ({ onAddNote, noteToEdit, onUpdateNote, onCancel,onBack,isEditing }) => {
  const [category, setCategory] = useState('other');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [tags, setTags] = useState([]);

  const location = useLocation();
  const isArchivePage=location.pathname==="/archive";




  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setCategory(noteToEdit.category);
      setTags(noteToEdit.tags||[])
    }
  }, [noteToEdit]);


  function handleSubmit() {
    if (!content.trim()) return;
    if (noteToEdit) {
      onUpdateNote({
        id: noteToEdit.id,
        title,
        content,
        category,
        isArchived: noteToEdit.isArchived,
        tags,
        createdAt:noteToEdit.createdAt,
        updatedAt:Date.now()
      })
    } else {
      onAddNote({
        id: Date.now(),
        title,
        content,
        category,
        isArchived: isArchivePage,
        tags,
        createdAt:Date.now(),
        updatedAt:null
      })
      resetForm();
    }
  }

  function resetForm(){
    setTitle('');
    setContent('');
    setCategory('other');
    setTags([]);
    setTagsInput('');
  }


  function handleCancel() {
    resetForm();
    onCancel?.();
    if(!isEditing){
      onBack();
    }
  }

  function handleTagAddition() {
    if (!tagsInput) return;

    setTags((prev) =>prev.some((t)=>t.title===tagsInput)?prev:[...prev, { title: tagsInput, id: Date.now() }]);
    setTagsInput('');
  }

  function deleteTag(id){
    setTags((prev)=>{
      return prev.filter((t)=>t.id !== id);
    })
  }

  return (
    <div className="note-form">
      <header className="note-form-head">
        <h2>{noteToEdit ? "Edit Note" : "Add New Note"}</h2>
        <p>{noteToEdit ? "update your note" : "create a new note and get started"}</p>
      </header>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <label htmlFor="formTitle">Title</label>
        <input type="text" id="formTitle" placeholder="Enter a note title..." value={title} onChange={(e) => setTitle(e.target.value)} />



        <label htmlFor="formContent">Content</label>
        <textarea required id="formContent" placeholder="start writing your notes..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>




        <div className="form-partesian">
          <div className="left">
            <label htmlFor="formCategories">Category</label>
            <select id="formCategories" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option className="option" value={'other'}>other</option>
              <option className="option" value={'work'}>work</option>
              <option className="option" value={'study'}>study</option>
              <option className="option" value={'personal'}>personal</option>
              <option className="option" value={'idea'}>idea</option>

            </select>
          </div>
          <div className="right">
            <div className="form-tags-container">
              <label htmlFor="tagInput">Tags</label>
              <input type="text" placeholder="Add tag..." id="tagInput" value={tagsInput} onChange={(e) => setTagsInput(e.target.value.trim())} />
              <button type="button" onClick={handleTagAddition}>Add</button>
              </div>
            <div className="added-tags">
              {tags.map((t) => {
                return <div className="form-tags" key={t.id}><p>{t.title}</p><button type="button" className="form-tag-delete-btn"  onClick={()=>deleteTag(t.id)}>x</button></div>
              })}
            </div>
          </div>
        </div>


        <div className="form-buttons">
        <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
        <button type="submit" className="save-btn">Save</button>
        </div>
      </form>

    </div>);
}

export default Noteform;