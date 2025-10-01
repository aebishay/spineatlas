import './InteractiveTools.css';
import { useNavigate } from 'react-router-dom';

function InteractiveTools() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Calculators',
      description: 'Visual calculators and grading scales for spine surgery.',
      route: '/tools/calculators',
    },
    {
      title: 'Complication Predictor',
      description: 'AI-driven models to estimate complication risk. (Coming soon)',
      route: null,
    },
    {
      title: 'Augmented Reality',
      description: 'AR tools to assist surgical planning. (Coming soon)',
      route: null,
    },
  ];

  return (
    <section className="interactive-section">
      <div className="interactive-container">
        <h2 className="interactive-title">Interactive Tools</h2>
        <p className="interactive-subtitle">
          Explore smart tools to support surgical decision-making.
        </p>

        <div className="interactive-grid">
          {features.map((item, index) => (
            <div
              key={index}
              className="interactive-card"
              data-coming-soon={!item.route}
              onClick={() =>
                item.route ? navigate(item.route) : alert('Coming soon!')
              }
            >
              <div className="interactive-card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InteractiveTools;