import { useState } from 'react';
import './ClavienDindo.css';

function ClavienDindo() {
  const [grade, setGrade] = useState(null);

  const grades = [
    { value: 'I', description: 'Any deviation from the normal postoperative course without the need for pharmacological treatment or surgical, endoscopic and radiological interventions.' },
    { value: 'II', description: 'Requiring pharmacological treatment with drugs other than such allowed for grade I complications.' },
    { value: 'IIIa', description: 'Requiring surgical, endoscopic or radiological intervention not under general anesthesia.' },
    { value: 'IIIb', description: 'Requiring surgical, endoscopic or radiological intervention under general anesthesia.' },
    { value: 'IVa', description: 'Life-threatening complication requiring ICU management (single organ dysfunction).' },
    { value: 'IVb', description: 'Life-threatening complication requiring ICU management (multi-organ dysfunction).' },
    { value: 'V', description: 'Death of a patient.' },
  ];

  return (
    <section className="clavien-section">
      <div className="clavien-container">
        <h2>Clavien-Dindo Classification</h2>
        <p className="subtitle">Standard grading of postoperative complications</p>

        <div className="clavien-options">
          {grades.map((item, i) => (
            <button
              key={i}
              className={`clavien-option ${grade === item.value ? 'active' : ''}`}
              onClick={() => setGrade(item.value)}
            >
              <strong>Grade {item.value}:</strong> {item.description}
            </button>
          ))}
        </div>

        {grade && (
          <div className="clavien-summary">
            <h3>Selected: Grade {grade}</h3>
            <p>{grades.find(g => g.value === grade).description}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ClavienDindo;