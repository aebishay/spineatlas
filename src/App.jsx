import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import SeminalPapers from './components/SeminalPapers';
import Newresearch from './components/Newresearch';
import VideoCategories from './components/VideoCategories';
import InteractiveTools from './components/InteractiveTools';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/seminal-papers" element={<SeminalPapers />} />
        <Route path="/new-research" element={<Newresearch />} />
        <Route path="/video-library" element={<VideoCategories />} />
        <Route path="/interactive-tools" element={<InteractiveTools />} />
      </Routes>
    </Router>
  );
};

export default App;