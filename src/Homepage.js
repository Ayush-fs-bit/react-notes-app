const Homepage = ({ notes,onSelectNote }) => {
  if(notes.length===0){
    return <div>
      <h3>No Notes found</h3>
      <p>Start By Adding First Note</p>
    </div>
  }
  
  return (<div className="notes-container">
    {notes.map((note) => (
      <div className="note-card" onClick={()=>onSelectNote(note.id)}>
        <p className="note-title">{note.title}</p>
        <p className="content">{note.content}</p>
      </div>
    ))
    }
  </div>);
}

export default Homepage;