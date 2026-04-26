const Archivepage = ({notes}) => {
  return (<div className="archived-notes-container">
     {notes.map((note) => (
      <div className="note-card">
        <p className="note-title">{note.title}</p>
        <p className="content">{note.content}</p>
      </div>
    ))
    }
  </div>  );
}
 
export default Archivepage;