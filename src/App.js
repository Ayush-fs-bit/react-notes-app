
import Sidebar from './Sidebar';
import Homepage from './Homepage';
import Preview from './Preview';
import Archivepage from './Archivepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';




function App() {
  const data=[
  {'id':1,
  'title':'ayush',
  'content':'xyz'},
  {'id':2,
  'title':'secound',
  'content':'xyz'}
  ];
  const [selectednote,setSelectedNote]=useState(null);

  function handleSelectNote(id){
    let note=data.find((n)=>n.id===id);
    setSelectedNote(note);
  }



  return (<Router>
    <div className="App">
      <Sidebar />
      <div className="main">
        <div className="main-header">
          <p>My Notes</p>
          <input type="text" placeholder="search notes..." />
          <button>+ Add New Note</button>
        </div>
        <Routes>
          <Route path="/" element={<Homepage notes={data} onSelectNote={handleSelectNote}/>} />
          <Route path="/archive" element={<Archivepage notes={data}/>} />
        </Routes>
      </div>
      <Preview noteSelected={selectednote}/>
    </div></Router>
  );
}

export default App;
