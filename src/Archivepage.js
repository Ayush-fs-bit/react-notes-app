const Archivepage = ({notes,onSelectNote,onTagClick,selectedNote}) => {
  if(notes.length===0){
    return <div className="empty-state">
      <h3>No Archived Notes Found</h3>
      <p>Archived notes are stored here</p>
    </div>
  }
  function handleTagClick(selectedTag){
    onTagClick(selectedTag)
  }

  function renderTags(tags){
    if(!tags||tags.length===0)return;
    return tags.map((t)=>(<div className="tags" key={t} onClick={(e)=>{e.stopPropagation();
      handleTagClick(t)}}>{t}</div>))
  }
  console.log(selectedNote)
  

  return (<div className="archived-notes-container">
     {notes.map((note) => (
      <div className={`note-card ${selectedNote?.id===note.id?"selected":""}`}  onClick={()=>onSelectNote(note.id)} key={note.id}>
        <p className="note-title">{note.title}</p>
        <p className="note-content">{note.content}</p>
        <div className="tags-container">{renderTags(note.tags)}</div>
      </div>
    ))
    }
  </div>  );
}
 
export default Archivepage;