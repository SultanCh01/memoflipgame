import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import EasyLevel from './components/EasyLevel';
import MediumLevel from './components/MediumLevel';
import HardLevel from './components/HardLevel';
import NightmareLevel from './components/NightmareLevel';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/easy" element={<EasyLevel />} />
        <Route path="/medium" element={<MediumLevel />} />
        <Route path="/hard" element={<HardLevel />} />
        <Route path="/nightmare" element={<NightmareLevel />} />

      </Routes>
    
    </Router>
  );
}
export default App;