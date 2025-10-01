import React, { useState } from 'react';
import './GapScore.css'; // Link to CSS file

const GapScore = () => {
  const [age, setAge] = useState('');
  const [pelvicIncidence, setPelvicIncidence] = useState('');
  const [lordosis, setLordosis] = useState('');
  const [pt, setPT] = useState('');
  const [sva, setSVA] = useState('');
  const [score, setScore] = useState(null);

  const calculateGAP = () => {
    const PI_LL = Math.abs(pelvicIncidence - lordosis);
    let mismatchScore = 0;
    let ptScore = 0;
    let svaScore = 0;
    let ageScore = 0;

    if (PI_LL <= 10) mismatchScore = 0;
    else if (PI_LL <= 20) mismatchScore = 1;
    else mismatchScore = 2;

    if (pt <= 20) ptScore = 0;
    else if (pt <= 25) ptScore = 1;
    else ptScore = 2;

    if (sva <= 4) svaScore = 0;
    else if (sva <= 9) svaScore = 1;
    else svaScore = 2;

    if (age < 60) ageScore = 0;
    else if (age < 75) ageScore = 1;
    else ageScore = 2;

    const total = mismatchScore + ptScore + svaScore + ageScore;
    setScore(total);
  };

  return (
    <div className="gap-section">
      <div className="gap-container">
        <h2>GAP Score Calculator</h2>
        <p className="gap-subtitle">Fill in the fields to calculate the Global Alignment and Proportion score.</p>

        <div className="gap-form">
          <div className="gap-field">
            <label>Age:</label>
            <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} />
          </div>

          <div className="gap-field">
            <label>Pelvic Incidence (°):</label>
            <input type="number" value={pelvicIncidence} onChange={e => setPelvicIncidence(Number(e.target.value))} />
          </div>

          <div className="gap-field">
            <label>Lumbar Lordosis (°):</label>
            <input type="number" value={lordosis} onChange={e => setLordosis(Number(e.target.value))} />
          </div>

          <div className="gap-field">
            <label>Pelvic Tilt (°):</label>
            <input type="number" value={pt} onChange={e => setPT(Number(e.target.value))} />
          </div>

          <div className="gap-field">
            <label>Sagittal Vertical Axis (cm):</label>
            <input type="number" value={sva} onChange={e => setSVA(Number(e.target.value))} />
          </div>
        </div>

        <button className="tool-button" onClick={calculateGAP}>Calculate</button>

        {score !== null && (
          <div className="gap-summary">
            <strong>Total GAP Score: {score}</strong>
            <p>
              Risk Category: {score <= 2 ? 'Proportioned' : score <= 5 ? 'Moderate Disproportion' : 'Severe Disproportion'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GapScore;