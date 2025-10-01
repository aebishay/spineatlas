import React, { useState } from 'react';
import './PiLlMismatch.css';

const PiLlMismatch = () => {
  const [pi, setPI] = useState('');
  const [ll, setLL] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (pi !== '' && ll !== '') {
      const mismatch = Number(pi) - Number(ll);
      setResult(mismatch);
    }
  };

  return (
    <section className="tool-section">
      <div className="tool-container">
        <h1>PI–LL Mismatch Calculator</h1>
        <p className="subtitle">Enter values below to compute the difference between pelvic incidence and lumbar lordosis.</p>

        <div className="input-group">
          <label>Pelvic Incidence (°):</label>
          <input type="number" value={pi} onChange={e => setPI(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Lumbar Lordosis (°):</label>
          <input type="number" value={ll} onChange={e => setLL(e.target.value)} />
        </div>

        <button className="tool-button" onClick={calculate}>Calculate</button>

        {result !== null && (
          <div className="result-box">
            <strong>PI–LL Mismatch: {result}°</strong>
            <p>
              {Math.abs(result) <= 10
                ? 'Within acceptable alignment range.'
                : 'Considered a mismatch — may require correction.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PiLlMismatch;