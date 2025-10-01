import './Newresearch.css';
import { useState } from 'react';
import { MapPin } from 'lucide-react';
import USMap from './USMap';

const labs = [
  { lab: 'Barrow Neurological Institute', city: 'Phoenix, AZ', count: 2, x: 180, y: 370 },
  { lab: 'UCSF Spine Center', city: 'San Francisco, CA', count: 2, x: 35, y: 255 },
  { lab: 'Hospital for Special Surgery', city: 'New York, NY', count: 2, x: 820, y: 280 },
  { lab: 'Cedars‑Sinai Spine Center', city: 'Los Angeles, CA', count: 2, x: 90, y: 355 },
  { lab: 'Cleveland Clinic', city: 'Cleveland, OH', count: 2, x: 710, y: 295 },
  { lab: 'Mayo Clinic Spine Center', city: 'Rochester, MN', count: 2, x: 570, y: 240 },
  { lab: 'Massachusetts General Hospital', city: 'Boston, MA', count: 2, x: 835, y: 255 },
  { lab: 'Johns Hopkins', city: 'Baltimore, MD', count: 2, x: 790, y: 310 },
  { lab: 'Rush University', city: 'Chicago, IL', count: 2, x: 620, y: 285 },
  { lab: 'University of Miami', city: 'Miami, FL', count: 2, x: 785, y: 475 },
  { lab: 'Columbia University', city: 'New York, NY', count: 2, x: 822, y: 278 },
  { lab: 'Duke Spine Center', city: 'Durham, NC', count: 2, x: 770, y: 355 },
  { lab: 'Northwestern Medicine', city: 'Chicago, IL', count: 2, x: 622, y: 287 },
  { lab: 'University of Washington', city: 'Seattle, WA', count: 2, x: 100, y: 35 },
  { lab: 'NYU Langone', city: 'New York, NY', count: 2, x: 824, y: 282 },
  { lab: 'University of Utah', city: 'Salt Lake City, UT', count: 2, x: 225, y: 295 },
  { lab: 'Vanderbilt', city: 'Nashville, TN', count: 2, x: 650, y: 350 },
];

// Placeholder paper used for all labs
const placeholderPaper = {
  title: 'Sample New Study',
  authors: 'Your Team et al.',
  link: '#',
  summary: 'Quick summary of the new research coming from this lab.'
};

const NewResearch = () => {
  const [activeLab, setActiveLab] = useState(null);

  const toggleLab = (idx) =>
    setActiveLab(idx === activeLab ? null : idx);

  return (
    <section className="newresearch-section">
      <div className="newresearch-container">
        <h2 className="newresearch-title">New Research</h2>
        <p className="newresearch-subtitle">
          Explore cutting-edge spine surgery research from leading institutions across the United States
        </p>

        <div className="map-wrapper">
          {/* US Map Background */}
          <div className="map-container">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Blank_US_Map_%28states_only%29.svg/1280px-Blank_US_Map_%28states_only%29.svg.png"
              alt="United States Map"
              className="us-map-image"
            />

            {/* Location markers */}
            <svg viewBox="0 0 960 600" className="map-markers-svg" preserveAspectRatio="xMidYMid meet">
              {labs.map((lab, idx) => (
                <g key={idx}>
                  <circle
                    cx={lab.x}
                    cy={lab.y}
                    r={activeLab === idx ? "12" : "8"}
                    fill={activeLab === idx ? "#2563eb" : "#3b82f6"}
                    className="map-marker"
                    onClick={() => toggleLab(idx)}
                    style={{ cursor: 'pointer' }}
                  />
                  <circle
                    cx={lab.x}
                    cy={lab.y}
                    r={activeLab === idx ? "20" : "16"}
                    fill={activeLab === idx ? "#2563eb" : "#3b82f6"}
                    opacity="0.3"
                    className="map-marker-glow"
                    onClick={() => toggleLab(idx)}
                    style={{ cursor: 'pointer' }}
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Active lab details */}
          {activeLab !== null && (
            <div className="lab-detail-panel">
              <div className="lab-detail-header">
                <div>
                  <h3>{labs[activeLab].lab}</h3>
                  <p className="lab-location">
                    <MapPin size={16} /> {labs[activeLab].city}
                  </p>
                </div>
                <button
                  className="close-btn"
                  onClick={() => setActiveLab(null)}
                >
                  ×
                </button>
              </div>

              <div className="papers-list">
                {[...Array(labs[activeLab].count)].map((_, i) => (
                  <a
                    key={i}
                    className="paper-item"
                    href={placeholderPaper.link}
                  >
                    <h4>{placeholderPaper.title}</h4>
                    <p className="authors">{placeholderPaper.authors}</p>
                    <p className="summary">{placeholderPaper.summary}</p>
                    <span className="view-link">View Paper →</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Institution list below map */}
        <div className="institution-list">
          <h3>Research Institutions</h3>
          <div className="institution-grid">
            {labs.map((lab, idx) => (
              <div
                key={idx}
                className={`institution-card ${activeLab === idx ? 'active' : ''}`}
                onClick={() => toggleLab(idx)}
              >
                <MapPin size={18} className="institution-icon" />
                <div>
                  <h4>{lab.lab}</h4>
                  <p>{lab.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewResearch;