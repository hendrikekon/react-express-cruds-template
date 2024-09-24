import React from 'react';
import { BrowserRouter,Routes, Route} from'react-router-dom';
import Navigation from './components/Navigation';
import { Detail, Edit, Home, Tambah } from './pages';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navigation />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/tambah" element={<Tambah />}/>
            <Route path="/detail/:id" element={<Detail />}/>
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
