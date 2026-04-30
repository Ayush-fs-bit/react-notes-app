const Archivepage = ({notes,onSelectNote}) => {
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