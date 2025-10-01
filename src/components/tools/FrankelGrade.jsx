import { useState } from 'react';
import './FrankelGrade.css';

function FrankelGrade() {
  const [selection, setSelection] = useState(null);

  const grades = [
    { grade: 'A', description: 'Complete motor and sensory loss' },
    { grade: 'B', description: 'Sensory preserved, motor function absent' },
    { grade: 'C', description: 'Motor function present but not useful' },
    { grade: 'D', description: 'Useful motor function present' },
    { grade: 'E', description: 'Normal motor and sensory function' },
  ];

  return (
    <section className="frankel-section">
      <div className="frankel-container">
        <h2>Frankel Grade</h2>
        <p className="subtitle">Neurologic function grading in spinal cord injury</p>

        <div className="frankel-options">
          {grades.map((item, i) => (
            <button
              key={i}
              className={`frankel-option ${selection === item.grade ? 'active' : ''}`}
              onClick={() => setSelection(item.grade)}
            >
              <strong>{item.grade}</strong>: {item.description}
            </button>
          ))}
        </div>

        {selection && (
          <div className="frankel-summary">
            <h3>Selected Grade: {selection}</h3>
            <p>{grades.find((g) => g.grade === selection).description}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FrankelGrade;