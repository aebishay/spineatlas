import { useState } from 'react';
import './SINSCalculator.css';

const criteria = {
  location: [
    { label: 'Junctional (occiput–C2, C7–T2, T11–L1, L5–S1)', value: 3 },
    { label: 'Mobile spine (C3–C6, L2–L4)', value: 2 },
    { label: 'Semi-rigid (T3–T10)', value: 1 },
    { label: 'Rigid (S2–S5)', value: 0 },
  ],
  pain: [
    { label: 'Mechanical pain', value: 3 },
    { label: 'Occasional pain', value: 1 },
    { label: 'No pain', value: 0 },
  ],
  bone: [
    { label: 'Lytic', value: 2 },
    { label: 'Mixed (lytic/blastic)', value: 1 },
    { label: 'Blastic', value: 0 },
  ],
  alignment: [
    { label: 'Subluxation or translation', value: 4 },
    { label: 'De novo deformity (kyphosis/scoliosis)', value: 2 },
    { label: 'Normal alignment', value: 0 },
  ],
  collapse: [
    { label: '>50% vertebral body collapse', value: 3 },
    { label: '<50% collapse', value: 2 },
    { label: 'No collapse', value: 0 },
  ],
  posterior: [
    { label: 'Bilateral involvement of posterior elements', value: 3 },
    { label: 'Unilateral involvement', value: 1 },
    { label: 'No involvement', value: 0 },
  ],
};

function SINSCalculator() {
  const [scores, setScores] = useState({
    location: null,
    pain: null,
    bone: null,
    alignment: null,
    collapse: null,
    posterior: null,
  });

  const totalScore = Object.values(scores).reduce((sum, val) => sum + (val ?? 0), 0);

  const interpretation =
    totalScore <= 6 ? 'Stable'
    : totalScore <= 12 ? 'Potentially unstable'
    : 'Unstable';

  const updateScore = (key, value) => {
    setScores(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section className="sins-section">
      <div className="sins-container">
        <h2>SINS Calculator</h2>
        <p className="subtitle">Spinal Instability Neoplastic Score</p>

        {Object.entries(criteria).map(([key, options]) => (
          <div className="sins-block" key={key}>
            <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
            <div className="sins-options-wrapper">
              {options.map((opt, i) => (
                <button
                  key={i}
                  className={`sins-option ${scores[key] === opt.value ? 'active' : ''}`}
                  onClick={() => updateScore(key, opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="sins-summary">
          <h3>Total Score: {totalScore}</h3>
          <p>Interpretation: <strong>{interpretation}</strong></p>
        </div>
      </div>
    </section>
  );
}

export default SINSCalculator;