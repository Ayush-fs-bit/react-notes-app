
import Sidebar from './Sidebar';
import Homepage from './Homepage';
import Preview from './Preview';
import Archivepage from './Archivepage';
import Noteform from './Noteform';
import { Routes, Route, useLocation} from 'react-router-dom';
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
  const [activeCategory,setActiveCategory]=useState('all');
  const [selectedTag,setSelectedTag]=useState('all');
  const location=useLocation();
  
 

  useEffect(()=>{
    localStorage.setItem('notes',JSON.stringify(notes))
  },[notes]);

  const baseFilteredNotes = notes.filter((n) => {
    const searchFilter =n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||n.content.toLowerCase().includes(searchQuery.toLowerCase());

    const tagFilter =selectedTag === "all" || n.tags?.includes(selectedTag);

    return searchFilter && tagFilter;
  });


  const filteredNotes = baseFilteredNotes.filter((n) =>{
    const categoryFilter=activeCategory==='all'||n.category===activeCategory;
    return categoryFilter;
})

  const homeNotes=filteredNotes.filter((n)=>!n.isArchived)
  const archivedNotes=filteredNotes.filter((n)=>n.isArchived)

  const homeNotesCategoryCount=baseFilteredNotes.filter((n)=>!n.isArchived).reduce((acc,note)=>{
    const cat=note.category||'other';
    acc[cat]=(acc[cat]||0)+1;
    return acc;
  },{})

  const archiveNotesCategoryCount=baseFilteredNotes.filter((n)=>n.isArchived).reduce((acc,note)=>{
    const cat=note.category||'other';
    acc[cat]=(acc[cat]||0)+1;
    return acc;
  },{})

  const countsToShow=location.pathname==="/archive"?archiveNotesCategoryCount:homeNotesCategoryCount;

  const totalArchiveNotes=baseFilteredNotes.length;
  const totalHomeNotes=baseFilteredNotes.length;

  const totalCount=location.pathname==="/archive"?totalArchiveNotes:totalHomeNotes;

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

  function handleCategoryChange(category){
    setActiveCategory(category);
   
  }

  function handleArchiveNote(){
    setNotes((prev)=>
      prev.map((n)=>(
        n.id===selectedNote.id
        ?{...n,isArchived:!n.isArchived}
        :n
      ))
    )
    setSelectedNote(null);
  }

  function handleSelectedTag(tag){
    setSelectedTag(tag);
    setSearchQuery('');
    setActiveCategory('all');
  }

  function handleClearTags(){
    setSelectedTag('all');
    setSearchQuery('');
    setActiveCategory('all')
  }

  return (
    <div className="App">
      <Sidebar onSearch={handleChangeSearch} input={searchQuery} onCategory={handleCategoryChange} counts={countsToShow} total={totalCount} activeCategory={activeCategory}/>
      <div className="main">
        <div className="main-header">
          <p>My Notes</p>
          <button onClick={handleAddClick}>+ Add New Note</button>
          {selectedTag!=='all' && <div>
              <p>Filtered By {selectedTag}</p><button onClick={handleClearTags}>clear</button>
            </div>}
        </div>
        <Routes>
          <Route path="/" element={<Homepage notes={homeNotes} onSelectNote={handleSelectNote} onTagClick={handleSelectedTag}/>} />
          <Route path="/archive" element={<Archivepage notes={archivedNotes} onSelectNote={handleSelectNote} onTagClick={handleSelectedTag}/>} />
        </Routes>
      </div>
      <div className='right'>
        {isAdding && <Noteform onAddNote={handleAddingNote} />}
        {isEditing && <Noteform onUpdateNote={handleUpdatedNote} noteToEdit={selectedNote} onCancel={handleCancelEdit}/>}
        {!selectedNote && !isAdding && <p>select a note</p>}
        {!isEditing && selectedNote && <Preview noteSelected={selectedNote} onDelete={handleDeletingNote} onEdit={handleEditingNote} onArchive={handleArchiveNote} onTagClick={handleSelectedTag}/>}
      </div>
    </div>

  );
}

export default App;
