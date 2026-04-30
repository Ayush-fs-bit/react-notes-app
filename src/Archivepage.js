const Archivepage = ({notes,onSelectNote}) => {
  if(notes.length===0){
    return <div>
      <h3>No Archived Notes Found</h3>
      <p>Archived notes are stored here</p>
    </div>
  }

  return (<div className="archived-notes-container">
     {notes.map((note) => (
      <div className="note-card" onClick={()=>onSelectNote(note.id)}>
        <p className="note-title">{note.title}</p>
        <p className="content">{note.content}</p>
      </div>
    ))
    }
  </div>  );
}
 
export default Archivepage;