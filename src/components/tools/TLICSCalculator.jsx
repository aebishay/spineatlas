import { useState } from 'react';
import './TLICSCalculator.css';

const options = {
  morphology: [
    { label: 'Compression', value: 1 },
    { label: 'Burst', value: 2 },
    { label: 'Translation/Rotation', value: 3 },
    { label: 'Distraction', value: 4 },
  ],
  PLC: [
    { label: 'Intact', value: 0 },
    { label: 'Suspected/Indeterminate', value: 2 },
    { label: 'Injured', value: 3 },
  ],
  neurology: [
    { label: 'Intact', value: 0 },
    { label: 'Nerve root injury', value: 2 },
    { label: 'Complete cord injury', value: 2 },
    { label: 'Incomplete cord injury', value: 3 },
    { label: 'Cauda equina', value: 3 },
  ],
};

function TLICSCalculator() {
  const [morphology, setMorphology] = useState(null);
  const [plc, setPlc] = useState(null);
  const [neuro, setNeuro] = useState(null);

  const score = [morphology, plc, neuro].reduce((sum, val) => sum + (val || 0), 0);

  const recommendation =
    score >= 5
      ? 'Surgical treatment likely recommended.'
      : score <= 3
      ? 'Non-operative treatment may be appropriate.'
      : 'Consider clinical judgment or further imaging.';

  return (
    <section className="tlics-section">
      <div className="tlics-container">
        <h2>TLICS Calculator</h2>
        <p className="subtitle">Thoracolumbar Injury Classification and Severity Score</p>

        <div className="tlics-block">
          <h3>Injury Morphology</h3>
          <div className="tlics-options-wrapper">
            {options.morphology.map((opt, i) => (
              <button
                key={i}
                className={`tlics-option ${morphology === opt.value ? 'active' : ''}`}
                onClick={() => setMorphology(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="tlics-block">
          <h3>Posterior Ligamentous Complex</h3>
          <div className="tlics-options-wrapper">
            {options.PLC.map((opt, i) => (
              <button
                key={i}
                className={`tlics-option ${plc === opt.value ? 'active' : ''}`}
                onClick={() => setPlc(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="tlics-block">
          <h3>Neurologic Status</h3>
          <div className="tlics-options-wrapper">
            {options.neurology.map((opt, i) => (
              <button
                key={i}
                className={`tlics-option ${neuro === opt.value ? 'active' : ''}`}
                onClick={() => setNeuro(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="tlics-summary">
          <h3>Total Score: {score}</h3>
          <p>{recommendation}</p>
        </div>
      </div>
    </section>
  );
}

export default TLICSCalculator;