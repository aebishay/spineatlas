import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import SeminalPapers from './components/SeminalPapers';
import Newresearch from './components/Newresearch';
import VideoCategories from './components/VideoCategories';
import CalculatorTools from './components/tools/CalculatorTools';
import InteractiveTools from './components/InteractiveTools';

// Tools
import TLICSCalculator from './components/tools/TLICSCalculator';
import SINSCalculator from './components/tools/SINSCalculator';
import ASIACalculator from './components/tools/ASIACalculator';
import FrankelGrade from './components/tools/FrankelGrade';
import AOSpineTL from './components/tools/AOSpineTL';
import AOSpineCervical from './components/tools/AOSpineCervical';
import SpinalShock from './components/tools/SpinalShock';
import MJOA from './components/tools/MJOA';
import NurickGrade from './components/tools/NurickGrade';
import ClavienDindo from './components/tools/ClavienDindo';
import ODI from './components/tools/ODICalculator';
import VAS from './components/tools/VASCalculator';
import Charlson from './components/tools/CharlsonComorbidity';
import EBLEstimator from './components/tools/EBLEstimator';
import GapScore from './components/tools/GapScore';
import SrsSchwab from './components/tools/SrsSchwab';
import PiLlMismatch from './components/tools/PiLlMismatch';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔁 Redirect handler runs early before render
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');
    if (redirect && location.pathname === '/') {
      navigate(redirect, { replace: true });
    }
  }, [location, navigate]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.search]);

  return (
    <div className="app-wrapper">
      <Navbar />

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/seminal-papers" element={<SeminalPapers />} />
          <Route path="/new-research" element={<Newresearch />} />
          <Route path="/video-library" element={<VideoCategories />} />
          <Route path="/interactive-tools" element={<InteractiveTools />} />
          <Route path="/tools/calculators" element={<CalculatorTools />} />
          <Route path="/tools/tlics" element={<TLICSCalculator />} />
          <Route path="/tools/sins" element={<SINSCalculator />} />
          <Route path="/tools/asia" element={<ASIACalculator />} />
          <Route path="/tools/vas" element={<VAS />} />
          <Route path="/tools/charlson" element={<Charlson />} />
          <Route path="/tools/spinal-shock" element={<SpinalShock />} />
          <Route path="/tools/mjoa" element={<MJOA />} />
          <Route path="/tools/frankel" element={<FrankelGrade />} />
          <Route path="/tools/ao-thoracolumbar" element={<AOSpineTL />} />
          <Route path="/tools/nurick" element={<NurickGrade />} />
          <Route path="/tools/clavien-dindo" element={<ClavienDindo />} />
          <Route path="/tools/odi" element={<ODI />} />
          <Route path="/tools/ebl-estimator" element={<EBLEstimator />} />
          <Route path="/tools/ao-cervical" element={<AOSpineCervical />} />
          <Route path="/tools/gap-score" element={<GapScore />} />
          <Route path="/tools/srs-schwab" element={<SrsSchwab />} />
          <Route path="/tools/pi-ll-mismatch" element={<PiLlMismatch />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;