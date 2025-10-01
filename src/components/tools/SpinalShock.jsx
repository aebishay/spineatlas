import { useState } from 'react';
import './SpinalShock.css';

function SpinalShock() {
  const [bulbocavernosus, setBulbocavernosus] = useState(null);
  const [deepTendon, setDeepTendon] = useState(null);
  const [analTone, setAnalTone] = useState(null);

  const allAbsent = [bulbocavernosus, deepTendon, analTone].every(val => val === 'absent');
  const anyPresent = [bulbocavernosus, deepTendon, analTone].some(val => val === 'present');

  const status = allAbsent
    ? 'Spinal shock likely present (areflexia).'
    : anyPresent
    ? 'Spinal shock resolving or absent (reflexes present).'
    : 'Awaiting input.';

  return (
    <section className="spinalshock-section">
      <div className="spinalshock-container">
        <h2>Spinal Shock Assessment</h2>
        <p className="subtitle">Evaluate clinical criteria for diagnosis and resolution of spinal shock.</p>

        <div className="spinalshock-block">
          <h3>Bulbocavernosus Reflex</h3>
          <div className="spinalshock-options-wrapper">
            <button
              className={`spinalshock-option ${bulbocavernosus === 'present' ? 'active' : ''}`}
              onClick={() => setBulbocavernosus('present')}
            >
              Present
            </button>
            <button
              className={`spinalshock-option ${bulbocavernosus === 'absent' ? 'active' : ''}`}
              onClick={() => setBulbocavernosus('absent')}
            >
              Absent
            </button>
          </div>
        </div>

        <div className="spinalshock-block">
          <h3>Deep Tendon Reflexes</h3>
          <div className="spinalshock-options-wrapper">
            <button
              className={`spinalshock-option ${deepTendon === 'present' ? 'active' : ''}`}
              onClick={() => setDeepTendon('present')}
            >
              Present
            </button>
            <button
              className={`spinalshock-option ${deepTendon === 'absent' ? 'active' : ''}`}
              onClick={() => setDeepTendon('absent')}
            >
              Absent
            </button>
          </div>
        </div>

        <div className="spinalshock-block">
          <h3>Anal Tone</h3>
          <div className="spinalshock-options-wrapper">
            <button
              className={`spinalshock-option ${analTone === 'present' ? 'active' : ''}`}
              onClick={() => setAnalTone('present')}
            >
              Present
            </button>
            <button
              className={`spinalshock-option ${analTone === 'absent' ? 'active' : ''}`}
              onClick={() => setAnalTone('absent')}
            >
              Absent
            </button>
          </div>
        </div>

        <div className="spinalshock-summary">
          <h3>Interpretation:</h3>
          <p>{status}</p>
        </div>
      </div>
    </section>
  );
}

export default SpinalShock;
