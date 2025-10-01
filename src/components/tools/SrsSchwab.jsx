import React, { useState } from 'react';
import './SrsSchwab.css';

const SrsSchwab = () => {
  const [pt, setPT] = useState('');
  const [sva, setSVA] = useState('');
  const [pi, setPI] = useState('');
  const [ll, setLL] = useState('');
  const [result, setResult] = useState(null);

  const classify = () => {
    const pi_ll = Math.abs(pi - ll);
    let ptGrade = '';
    let svaGrade = '';
    let piLlGrade = '';

    // PT
    if (pt < 20) ptGrade = '0';
    else if (pt < 30) ptGrade = '+';
    else ptGrade = '++';

    // SVA (in mm)
    if (sva < 40) svaGrade = '0';
    else if (sva < 95) svaGrade = '+';
    else svaGrade = '++';

    // PI–LL mismatch
    if (pi_ll < 10) piLlGrade = '0';
    else if (pi_ll < 20) piLlGrade = '+';
    else piLlGrade = '++';

    setResult({ ptGrade, svaGrade, piLlGrade });
  };

  return (
    <div className="srs-section">
      <div className="srs-container">
        <h2>SRS-Schwab Classification</h2>
        <p className="srs-subtitle">Classify deformity severity using PI–LL mismatch, pelvic tilt, and sagittal vertical axis (SVA).</p>

        <div className="srs-form">
          <div className="srs-field">
            <label>Pelvic Tilt (°)</label>
            <input type="number" value={pt} onChange={(e) => setPT(Number(e.target.value))} />
          </div>

          <div className="srs-field">
            <label>Sagittal Vertical Axis (mm)</label>
            <input type="number" value={sva} onChange={(e) => setSVA(Number(e.target.value))} />
          </div>

          <div className="srs-field">
            <label>Pelvic Incidence (°)</label>
            <input type="number" value={pi} onChange={(e) => setPI(Number(e.target.value))} />
          </div>

          <div className="srs-field">
            <label>Lumbar Lordosis (°)</label>
            <input type="number" value={ll} onChange={(e) => setLL(Number(e.target.value))} />
          </div>
        </div>

        <button className="tool-button" onClick={classify}>Classify</button>

        {result && (
          <div className="srs-summary">
            <p><strong>PT Grade:</strong> {result.ptGrade}</p>
            <p><strong>SVA Grade:</strong> {result.svaGrade}</p>
            <p><strong>PI–LL Grade:</strong> {result.piLlGrade}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SrsSchwab;