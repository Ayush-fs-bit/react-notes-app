import Head from './Head';
import Sidebar from './Sidebar';
import './App.css';
import Homepage from './Homepage';
import Archivepage from './Archivepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return ( <Router>
    <div className="App">
      <Head />
      <Sidebar />
      <div className="main">
       
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/archive" element={<Archivepage />} />
          </Routes>
        
      </div>
    </div></Router>
  );
}

export default App;
