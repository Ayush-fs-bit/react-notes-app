import EmptyState from "./EmptyState";

const Archivepage = ({notes,onSelectNote,onTagClick,selectedNote,activeCategory,searchQuery}) => {

  if(notes.length===0 && searchQuery){
    return <EmptyState title={"No Notes Found"} message={`no notes found with "${searchQuery}" included`}/>
  }

  if(notes.length===0 && activeCategory==="all"){
    return <EmptyState title={"No Archived Notes Found"} message={"archive notes are stored here"}/>
  }

  if(notes.length===0 && activeCategory !== "all"){
    return <EmptyState title={"No Archived Notes Found"} message={`no archive notes found with category "${activeCategory}"`}/>
  }

  function renderTags(tags){
    if(!tags||tags.length===0)return;
    return tags.map((t) => (<div className="tags" key={t.id} onClick={(e)=>{e.stopPropagation();
      onTagClick(t)}}>{t.title}</div>))
  }
  

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