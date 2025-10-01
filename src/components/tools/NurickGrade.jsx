import { useState } from 'react';
import './NurickGrade.css';

function NurickGrade() {
  const [grade, setGrade] = useState(null);

  const grades = [
    { value: 0, label: 'Grade 0', description: 'Signs or symptoms of root involvement but no evidence of spinal cord disease.' },
    { value: 1, label: 'Grade 1', description: 'Signs of spinal cord disease but no difficulty in walking.' },
    { value: 2, label: 'Grade 2', description: 'Slight difficulty in walking which does not prevent full-time employment.' },
    { value: 3, label: 'Grade 3', description: 'Difficulty in walking which prevents full-time employment or ability to do all housework, but not so severe as to require assistance to walk.' },
    { value: 4, label: 'Grade 4', description: 'Able to walk only with assistance or with the aid of a walker or cane.' },
    { value: 5, label: 'Grade 5', description: 'Chairbound or bedridden.' },
  ];

  return (
    <section className="nurick-section">
      <div className="nurick-container">
        <h2>Nurick Grade</h2>
        <p className="subtitle">Functional grading for cervical myelopathy</p>

        <div className="nurick-options">
          {grades.map((item, i) => (
            <button
              key={i}
              className={`nurick-option ${grade === item.value ? 'active' : ''}`}
              onClick={() => setGrade(item.value)}
            >
              <strong>{item.label}:</strong> {item.description}
            </button>
          ))}
        </div>

        {grade !== null && (
          <div className="nurick-summary">
            <h3>Selected: Grade {grade}</h3>
            <p>{grades.find((g) => g.value === grade).description}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default NurickGrade;