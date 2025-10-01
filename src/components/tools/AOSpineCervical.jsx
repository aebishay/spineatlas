import { useState } from 'react';
import './AOSpineCervical.css';

function AOSpineCervicalCalculator() {
  const [injuryType, setInjuryType] = useState('');
  const [facetInvolvement, setFacetInvolvement] = useState('');
  const [discInvolvement, setDiscInvolvement] = useState('');

  const interpretation = injuryType
    ? `Injury type: ${injuryType}${facetInvolvement ? ` | Facet: ${facetInvolvement}` : ''}${discInvolvement ? ` | Disc: ${discInvolvement}` : ''}`
    : 'Please select at least the injury type.';

  return (
    <section className="ao-cervical-section">
      <div className="ao-cervical-container">
        <h2>AO Spine Subaxial Cervical Classification</h2>
        <p className="subtitle">Classify injuries between C3–C7 using morphology and additional modifiers</p>

        <div className="ao-cervical-block">
          <h3>Injury Morphology</h3>
          <div className="ao-cervical-options-wrapper">
            {['A - Compression', 'B - Tension band', 'C - Translational'].map((label, i) => (
              <button
                key={i}
                className={`ao-cervical-option ${injuryType === label ? 'active' : ''}`}
                onClick={() => setInjuryType(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="ao-cervical-block">
          <h3>Facet Involvement</h3>
          <div className="ao-cervical-options-wrapper">
            {['F1 - Nondisplaced', 'F2 - Displaced', 'F3 - Floating lateral mass'].map((label, i) => (
              <button
                key={i}
                className={`ao-cervical-option ${facetInvolvement === label ? 'active' : ''}`}
                onClick={() => setFacetInvolvement(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="ao-cervical-block">
          <h3>Disc Involvement</h3>
          <div className="ao-cervical-options-wrapper">
            {['N0 - Intact', 'N1 - Indeterminate', 'N2 - Injured'].map((label, i) => (
              <button
                key={i}
                className={`ao-cervical-option ${discInvolvement === label ? 'active' : ''}`}
                onClick={() => setDiscInvolvement(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="ao-cervical-summary">
          <h3>Classification Summary</h3>
          <p>{interpretation}</p>
        </div>
      </div>
    </section>
  );
}

export default AOSpineCervicalCalculator;