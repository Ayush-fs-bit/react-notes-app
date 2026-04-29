
import Sidebar from './Sidebar';
import Homepage from './Homepage';
import Preview from './Preview';
import Archivepage from './Archivepage';
import Noteform from './Noteform';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';





function App() {


  const [notes, setNotes] = useState(()=>{
    const saved=localStorage.getItem('notes');
    return saved?JSON.parse(saved):[];
  })
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing]=useState(false);

  useEffect(()=>{
    localStorage.setItem('notes',JSON.stringify(notes))
  },[notes]);



  const filteredNotes = notes.filter((n) => (
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  )
  )
  function handleSelectNote(id) {
    let note = notes.find((n) => n.id === id);
    setSelectedNote(note);
    setIsAdding(false);
    setIsEditing(false);
  }

  function handleAddClick() {
    setIsAdding(true);
    setIsEditing(false);
    setSelectedNote(null);
  }

  function handleChangeSearch(e) {
    const value = e.target.value;
    setSearchQuery(value);
  }

  function handleAddingNote(newNote){
    setNotes((prev)=>[newNote,...prev]);
    setSelectedNote(newNote);
    setIsAdding(false);
    setIsEditing(false);
  }

  function handleDeletingNote(){
    if(!selectedNote)return;
    if(!window.confirm("Delete this note"))return;
    const remainingNotes=notes.filter((n)=>n.id !== selectedNote.id);
    setNotes(remainingNotes);
    setSelectedNote(null);
  }

  function handleEditingNote(){
    setIsEditing(true);
    setIsAdding(false);
  }

  function handleUpdatedNote(updatedNote){
    setNotes((prev)=>
      prev.map((n)=>(n.id===updatedNote.id ? updatedNote : n))
    )
    setSelectedNote(updatedNote);
    setIsEditing(false);
  }

  function handleCancelEdit(){
    setIsEditing(false);
  }
  return (<Router>
    <div className="App">
      <Sidebar />
      <div className="main">
        <div className="main-header">
          <p>My Notes</p>
          <input type="text" placeholder="search notes..." onChange={handleChangeSearch} value={searchQuery} />
          <button onClick={handleAddClick}>+ Add New Note</button>
        </div>
        <Routes>
          <Route path="/" element={<Homepage notes={filteredNotes} onSelectNote={handleSelectNote} />} />
          <Route path="/archive" element={<Archivepage notes={filteredNotes} />} />
        </Routes>
      </div>
      <div className='right'>
        {isAdding && <Noteform onAddNote={handleAddingNote} />}
        {isEditing && <Noteform onUpdateNote={handleUpdatedNote} noteToEdit={selectedNote} onCancel={handleCancelEdit}/>}
        {!selectedNote && !isAdding && <p>select a note</p>}
        {!isEditing && selectedNote && <Preview noteSelected={selectedNote} onDelete={handleDeletingNote} onEdit={handleEditingNote}/>}
      </div>
    </div>

  </Router>
  );
}

export default App;
