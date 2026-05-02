const Archivepage = ({notes,onSelectNote,onTagClick}) => {
  if(notes.length===0){
    return <div>
      <h3>No Archived Notes Found</h3>
      <p>Archived notes are stored here</p>
    </div>
  }
  function handleTagClick(selectedTag){
    onTagClick(selectedTag)
  }

  function renderTags(tags){
    if(!tags||tags.length===0)return;
    return tags.map((t)=>(<div key={t} onClick={(e)=>{e.stopPropagation();
      handleTagClick(t)}}>#{t}</div>))
  }
  

  return (<div className="archived-notes-container">
     {notes.map((note) => (
      <div className="note-card" onClick={()=>onSelectNote(note.id)} key={note.id}>
        <p className="note-title">{note.title}</p>
        <p className="content">{note.content}</p>
        <div>{renderTags(note.tags)}</div>
      </div>
    ))
    }
  </div>  );
}
 
export default Archivepage;