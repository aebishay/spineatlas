import { useState } from 'react';
import './VASCalculator.css';

function VASCalculator() {
  const [score, setScore] = useState(null);

  const interpretation =
    score === null
      ? 'Select a pain score from 0 to 10.'
      : score <= 3
      ? 'Mild pain'
      : score <= 6
      ? 'Moderate pain'
      : 'Severe pain';

  return (
    <section className="vas-section">
      <div className="vas-container">
        <h2>VAS Pain Scale</h2>
        <p className="subtitle">Rate your pain from 0 (no pain) to 10 (worst imaginable).</p>

        <div className="vas-scale">
          {[...Array(11)].map((_, i) => (
            <button
              key={i}
              className={`vas-option ${score === i ? 'active' : ''}`}
              onClick={() => setScore(i)}
            >
              {i}
            </button>
          ))}
        </div>

        <div className="vas-summary">
          <h3>Selected Score: {score !== null ? score : '--'}</h3>
          <p>{interpretation}</p>
        </div>
      </div>
    </section>
  );
}

export default VASCalculator;