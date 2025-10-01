import { useState } from 'react';
import './MJOA.css';

function MJOACalculator() {
  const [upperExt, setUpperExt] = useState(null);
  const [lowerExt, setLowerExt] = useState(null);
  const [sensory, setSensory] = useState(null);
  const [bladder, setBladder] = useState(null);

  const totalComplete = [upperExt, lowerExt, sensory, bladder].every(val => val !== null);
  const totalScore = totalComplete ? upperExt + lowerExt + sensory + bladder : null;

  let severity = '';
  if (totalScore >= 15) severity = 'Mild myelopathy';
  else if (totalScore >= 12) severity = 'Moderate myelopathy';
  else severity = 'Severe myelopathy';

  const renderOptions = (label, options, selected, setSelected) => (
    <div className="mjoa-block">
      <h3>{label}</h3>
      <div className="mjoa-options-vertical">
        {options.map((opt, i) => (
          <button
            key={i}
            className={`mjoa-option ${selected === opt.value ? 'active' : ''}`}
            onClick={() => setSelected(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section className="mjoa-section">
      <div className="mjoa-container">
        <h2>mJOA Calculator</h2>
        <p className="subtitle">Modified Japanese Orthopaedic Association score for cervical myelopathy</p>

        {renderOptions('Upper Extremity Motor Function', [
          { label: 'Unable to feed oneself with any utensil', value: 0 },
          { label: 'Unable to feed oneself with a spoon but able to with effort', value: 1 },
          { label: 'Able to feed with a spoon but with difficulty', value: 2 },
          { label: 'Minor difficulty with buttoning shirt', value: 3 },
          { label: 'Able to button shirt with slight difficulty', value: 4 },
          { label: 'No disability', value: 5 },
        ], upperExt, setUpperExt)}

        {renderOptions('Lower Extremity Motor Function', [
          { label: 'Complete loss of motor and sensory function', value: 0 },
          { label: 'Sensory preservation without ability to ambulate', value: 1 },
          { label: 'Able to walk with aid', value: 2 },
          { label: 'Able to walk stairs with railing', value: 3 },
          { label: 'Moderate difficulty walking; no aid needed', value: 4 },
          { label: 'Mild spasticity or dyscoordination', value: 5 },
          { label: 'Normal ambulation', value: 6 },
        ], lowerExt, setLowerExt)}

        {renderOptions('Sensory Function (Upper Extremities)', [
          { label: 'Severe sensory loss or pain', value: 0 },
          { label: 'Mild sensory loss', value: 1 },
          { label: 'Slight sensory loss', value: 2 },
          { label: 'Normal', value: 3 },
        ], sensory, setSensory)}

        {renderOptions('Bladder Function', [
          { label: 'Unable to urinate or severe incontinence', value: 0 },
          { label: 'Moderate retention or dribbling', value: 1 },
          { label: 'Mild urinary symptoms', value: 2 },
          { label: 'Normal bladder function', value: 3 },
        ], bladder, setBladder)}

        {totalComplete && (
          <div className="mjoa-summary">
            <h3>Total Score: {totalScore}</h3>
            <p>{severity}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default MJOACalculator;