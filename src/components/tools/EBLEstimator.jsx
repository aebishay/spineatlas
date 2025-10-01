import { useState } from 'react';
import './EBLEstimator.css';

function EBLEstimator() {
  const [levels, setLevels] = useState(1);
  const [osteotomy, setOsteotomy] = useState('no');

  const baseLoss = 100; // baseline mL
  const levelMultiplier = 150; // mL per level
  const osteotomyAddition = 800; // additional mL for 3-column

  const estimate =
    baseLoss +
    levels * levelMultiplier +
    (osteotomy === 'yes' ? osteotomyAddition : 0);

  return (
    <section className="ebl-section">
      <div className="ebl-container">
        <h2>Estimated Blood Loss (EBL) Calculator</h2>
        <p className="subtitle">
          Estimate intraoperative blood loss based on number of levels and osteotomy type.
        </p>

        <div className="ebl-block">
          <h3>Number of Instrumented Levels</h3>
          <input
            type="number"
            min="1"
            value={levels}
            onChange={(e) => setLevels(parseInt(e.target.value))}
          />
        </div>

        <div className="ebl-block">
          <h3>3-Column Osteotomy Performed?</h3>
          <div className="ebl-options">
            <button
              className={`ebl-option ${osteotomy === 'yes' ? 'active' : ''}`}
              onClick={() => setOsteotomy('yes')}
            >
              Yes
            </button>
            <button
              className={`ebl-option ${osteotomy === 'no' ? 'active' : ''}`}
              onClick={() => setOsteotomy('no')}
            >
              No
            </button>
          </div>
        </div>

        <div className="ebl-summary">
          <h3>Estimated Blood Loss: {estimate} mL</h3>
        </div>
      </div>
    </section>
  );
}

export default EBLEstimator;