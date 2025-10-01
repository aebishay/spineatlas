import { useState } from 'react';
import './CharlsonComorbidity.css';

const conditions = [
  { label: 'Myocardial infarction', points: 1 },
  { label: 'Congestive heart failure', points: 1 },
  { label: 'Peripheral vascular disease', points: 1 },
  { label: 'Cerebrovascular disease', points: 1 },
  { label: 'Dementia', points: 1 },
  { label: 'Chronic pulmonary disease', points: 1 },
  { label: 'Connective tissue disease', points: 1 },
  { label: 'Ulcer disease', points: 1 },
  { label: 'Mild liver disease', points: 1 },
  { label: 'Diabetes (without complications)', points: 1 },
  { label: 'Hemiplegia', points: 2 },
  { label: 'Moderate/severe kidney disease', points: 2 },
  { label: 'Diabetes with end organ damage', points: 2 },
  { label: 'Any tumor (non-metastatic)', points: 2 },
  { label: 'Leukemia', points: 2 },
  { label: 'Lymphoma', points: 2 },
  { label: 'Moderate/severe liver disease', points: 3 },
  { label: 'Metastatic solid tumor', points: 6 },
  { label: 'AIDS', points: 6 },
];

function CharlsonCalculator() {
  const [selected, setSelected] = useState([]);

  const toggleCondition = (label) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const totalScore = selected.reduce((sum, label) => {
    const condition = conditions.find((c) => c.label === label);
    return sum + (condition ? condition.points : 0);
  }, 0);

  const mortalityRisk =
    totalScore >= 7
      ? 'Estimated 10-year survival < 0%'
      : totalScore >= 5
      ? 'Estimated 10-year survival ~21%'
      : totalScore >= 3
      ? 'Estimated 10-year survival ~53%'
      : totalScore >= 1
      ? 'Estimated 10-year survival ~75%'
      : 'Estimated 10-year survival ~98%';

  return (
    <section className="charlson-section">
      <div className="charlson-container">
        <h2>Charlson Comorbidity Index</h2>
        <p className="subtitle">Select applicable comorbidities to calculate 10-year mortality risk.</p>

        <div className="charlson-grid">
          {conditions.map((cond, i) => (
            <button
              key={i}
              className={`charlson-option ${selected.includes(cond.label) ? 'active' : ''}`}
              onClick={() => toggleCondition(cond.label)}
            >
              {cond.label} ({cond.points})
            </button>
          ))}
        </div>

        <div className="charlson-summary">
          <h3>Total Score: {totalScore}</h3>
          <p>{mortalityRisk}</p>
        </div>
      </div>
    </section>
  );
}

export default CharlsonCalculator;
