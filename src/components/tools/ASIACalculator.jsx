import { useState } from 'react';
import './ASIACalculator.css';

function ASIACalculator() {
  const [sensory, setSensory] = useState('');
  const [motor, setMotor] = useState('');
  const [sacral, setSacral] = useState('');

  let grade = '';
  let interpretation = '';

  if (sensory === 'no' && motor === 'no' && sacral === 'no') {
    grade = 'A';
    interpretation = 'Complete: No sensory or motor function preserved in sacral segments S4-S5.';
  } else if (sensory === 'yes' && motor === 'no' && sacral === 'yes') {
    grade = 'B';
    interpretation = 'Sensory Incomplete: Sensory but not motor function preserved below neurological level including S4-S5.';
  } else if (motor === 'yes' && sacral === 'yes') {
    grade = 'C or D';
    interpretation = 'Motor Incomplete: Motor function preserved below injury level. Grade C if more than half muscles <3/5, D if ≥3/5.';
  } else if (sensory === 'yes' && motor === 'yes' && sacral === 'yes') {
    grade = 'E';
    interpretation = 'Normal: Motor and sensory function are normal.';
  } else {
    grade = 'Incomplete data';
    interpretation = 'Please complete all selections above to determine the ASIA grade.';
  }

  const motorOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];
  const sensoryOptions = motorOptions;
  const sacralOptions = motorOptions;

  return (
    <section className="asia-section">
      <div className="asia-container">
        <h2>ASIA Impairment Scale</h2>
        <p className="subtitle">Classify spinal cord injury from A (complete) to E (normal).</p>

        <div className="asia-block">
          <h3>Motor Function</h3>
          {motorOptions.map((opt, i) => (
            <button
              key={i}
              className={`asia-option ${motor === opt.value ? 'active' : ''}`}
              onClick={() => setMotor(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="asia-block">
          <h3>Sensory Function</h3>
          {sensoryOptions.map((opt, i) => (
            <button
              key={i}
              className={`asia-option ${sensory === opt.value ? 'active' : ''}`}
              onClick={() => setSensory(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="asia-block">
          <h3>Sacral Sparing</h3>
          {sacralOptions.map((opt, i) => (
            <button
              key={i}
              className={`asia-option ${sacral === opt.value ? 'active' : ''}`}
              onClick={() => setSacral(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="asia-summary">
          <h3>ASIA Grade: {grade}</h3>
          <p>{interpretation}</p>
        </div>
      </div>
    </section>
  );
}

export default ASIACalculator;