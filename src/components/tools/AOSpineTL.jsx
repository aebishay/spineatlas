import { useState } from 'react';
import './AOSpineTL.css';

function AOSpineTL() {
  const [selection, setSelection] = useState(null);

  const types = [
    { label: 'Type A - Compression', value: 'A', description: 'Injury from axial compression without distraction or rotation.' },
    { label: 'Type B - Tension Band Injury', value: 'B', description: 'Failure of the posterior or anterior tension band (e.g., flexion-distraction).' },
    { label: 'Type C - Translation/Rotation', value: 'C', description: 'Displacement in any direction due to shear or rotation.' },
  ];

  return (
    <section className="aotl-section">
      <div className="aotl-container">
        <h2>AO Spine Thoracolumbar Classification</h2>
        <p className="subtitle">Classify spinal fractures into Types A, B, or C based on mechanism</p>

        <div className="aotl-options">
          {types.map((type, i) => (
            <button
              key={i}
              className={`aotl-option ${selection === type.value ? 'active' : ''}`}
              onClick={() => setSelection(type.value)}
            >
              <strong>{type.label}</strong>: {type.description}
            </button>
          ))}
        </div>

        {selection && (
          <div className="aotl-summary">
            <h3>Selected Type: {selection}</h3>
            <p>{types.find((t) => t.value === selection).description}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default AOSpineTL;