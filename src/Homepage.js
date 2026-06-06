import EmptyState from "./EmptyState";

const Homepage = ({ notes,onSelectNote,onTagClick,selectedNote,activeCategory,searchQuery}) => {

  if (notes.length === 0) {
    let message = "No notes found";
    if (searchQuery && activeCategory !== "all") {
      message = `No notes matching "${searchQuery}" in category "${activeCategory}"`;
    } else if (searchQuery) {
      message = `No notes matching "${searchQuery}"`;
    } else if (activeCategory !== "all") {
      message = `No notes in category "${activeCategory}"`;
    } else {
      message = "Start by adding your first note";
    }
    return <EmptyState title="No Notes Found" message={message} />;
  }


  function renderTags(tags){
    if(!tags||tags.length===0)return;
    return tags.map((t)=>(<div className="tags" key={t.id} onClick={(e)=>{e.stopPropagation();
      onTagClick(t)}}>{t.title}</div>))
  }
  
  return (<div className="notes-container">
    {notes.map((note) => (
      <div className={`note-card ${selectedNote?.id===note.id?"selected":""}`} onClick={()=>onSelectNote(note.id)} key={note.id}>
        <p className="note-title">{note.title}</p>
        <p className="note-content">{note.content}</p>
        <div className="tags-container">{renderTags(note.tags)}</div>
      </div>
    ))
    }
  </div>);
}

export default Homepage;