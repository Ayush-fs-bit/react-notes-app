import EmptyState from "./EmptyState";

const Homepage = ({ notes,onSelectNote,onTagClick,selectedNote,activeCategory,searchQuery}) => {

  if(notes.length===0 && searchQuery){
    return <EmptyState title={"No Notes Found"} message={`no notes found with "${searchQuery}" included`}/>
  }

  if(notes.length===0 && activeCategory==="all"){
    return <EmptyState title={"No Notes Found"} message={"start by adding a first note"}/>
  }

  if(notes.length===0 && activeCategory !== "all"){
    return <EmptyState title={"No Notes Found"} message={`no notes found with category "${activeCategory}"`}/>
  }


  function renderTags(tags){
    if(!tags||tags.length===0)return;
    return tags.map((t)=>(<div className="tags" key={t} onClick={(e)=>{e.stopPropagation();
      onTagClick(t)}}>{t}</div>))
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