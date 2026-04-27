
import Sidebar from './Sidebar';
import Homepage from './Homepage';
import Preview from './Preview';
import Archivepage from './Archivepage';
import Noteform from './Noteform';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';




function App() {

  const data = [
    {
      'id': 1,
      'title': 'ayush',
      'content': 'xyz'
    },
    {
      'id': 2,
      'title': 'secound',
      'content': 'xyz'
    }
  ];
  const [notes, setNotes] = useState(data)
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const filteredNotes = notes.filter((n) => (
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  )
  )
  function handleSelectNote(id) {
    let note = notes.find((n) => n.id === id);
    setSelectedNote(note);
    setIsAdding(false);
  }

  function handleclick() {
    setIsAdding(true);
    setSelectedNote(null);
  }

  function handleChangeSearch(e) {
    const value = e.target.value;
    setSearchQuery(value);
  }


  return (<Router>
    <div className="App">
      <Sidebar />
      <div className="main">
        <div className="main-header">
          <p>My Notes</p>
          <input type="text" placeholder="search notes..." onChange={handleChangeSearch} value={searchQuery} />
          <button onClick={handleclick}>+ Add New Note</button>
        </div>
        <Routes>
          <Route path="/" element={<Homepage notes={filteredNotes} onSelectNote={handleSelectNote} />} />
          <Route path="/archive" element={<Archivepage notes={filteredNotes} />} />
        </Routes>
      </div>
      <div className='right'>
        {isAdding && <Noteform />}
        {!selectedNote && !isAdding && <p>select a note</p>}
        {selectedNote && <Preview noteSelected={selectedNote} />}
      </div>
    </div>

  </Router>
  );
}

export default App;
