import './Newresearch.css';
import { useState } from 'react';
import { MapPin } from 'lucide-react';
import USMap from './USMap';
import barrowPapers from '../data/barrowPapers.json';
import hopkinsPapers from '../data/hopkinsPapers.json';
import clevelandPapers from '../data/clevelandPapers.json';
import mghPapers from '../data/mghPapers.json';
import mayoPapers from '../data/mayoPapers.json';

const labs = [
  { lab: 'Barrow Neurological Institute', city: 'Phoenix, AZ', count: 2, x: 180, y: 370, id: 'neuro-barrow' },
  { lab: 'Cleveland Clinic', city: 'Cleveland, OH', count: 2, x: 710, y: 295, id: 'neuro-cleveland' },
  { lab: 'Johns Hopkins University', city: 'Baltimore, MD', count: 2, x: 790, y: 310, id: 'neuro-hopkins' },
  { lab: 'Massachusetts General Hospital / Harvard', city: 'Boston, MA', count: 2, x: 835, y: 255, id: 'neuro-mgh' },
  { lab: 'Mayo Clinic (Rochester)', city: 'Rochester, MN', count: 2, x: 570, y: 240, id: 'neuro-mayo' },
  { lab: 'UCLA', city: 'Los Angeles, CA', count: 2, x: 90, y: 355, id: 'neuro-ucla' },
  { lab: 'UCSF', city: 'San Francisco, CA', count: 2, x: 35, y: 255, id: 'neuro-ucsf' },
  { lab: 'University of Miami', city: 'Miami, FL', count: 2, x: 785, y: 475, id: 'neuro-miami' },
  { lab: 'University of Pittsburgh', city: 'Pittsburgh, PA', count: 2, x: 750, y: 290, id: 'neuro-pitt' },
  { lab: 'Vanderbilt University Medical Center', city: 'Nashville, TN', count: 2, x: 650, y: 350, id: 'neuro-vandy' },
  { lab: 'Washington University (Barnes-Jewish)', city: 'St. Louis, MO', count: 2, x: 600, y: 320, id: 'neuro-washu' },
  { lab: 'Duke University', city: 'Durham, NC', count: 2, x: 770, y: 355, id: 'ortho-duke' },
  { lab: 'Emory University', city: 'Atlanta, GA', count: 2, x: 700, y: 380, id: 'ortho-emory' },
  { lab: 'Hospital for Special Surgery', city: 'New York, NY', count: 2, x: 820, y: 280, id: 'ortho-hss' },
  { lab: 'NYU Langone', city: 'New York, NY', count: 2, x: 824, y: 282, id: 'ortho-nyu' },
  { lab: 'Rothman Institute / Thomas Jefferson', city: 'Philadelphia, PA', count: 2, x: 800, y: 300, id: 'ortho-rothman' },
  { lab: 'Rush University', city: 'Chicago, IL', count: 2, x: 620, y: 285, id: 'ortho-rush' },
  { lab: 'UC San Diego', city: 'San Diego, CA', count: 2, x: 110, y: 380, id: 'ortho-ucsd' },
  { lab: 'University of Minnesota', city: 'Minneapolis, MN', count: 2, x: 570, y: 220, id: 'ortho-umn' },
  { lab: 'Washington University Orthopaedics', city: 'St. Louis, MO', count: 2, x: 602, y: 322, id: 'ortho-washu' },
];

// Placeholder paper used for most labs (except Barrow which has real data)
const placeholderPaper = {
  title: 'Sample New Study',
  authors: 'Your Team et al.',
  link: '#',
  summary: 'Quick summary of the new research coming from this lab.'
};

// Function to get papers for a specific institution
const getPapersForLab = (labId) => {
  if (labId === 'neuro-barrow') {
    return barrowPapers.slice(0, 10);
  }
  if (labId === 'neuro-hopkins') {
    return hopkinsPapers.slice(0, 10);
  }
  if (labId === 'neuro-cleveland') {
    return clevelandPapers.slice(0, 10);
  }
  if (labId === 'neuro-mgh') {
    return mghPapers.slice(0, 10);
  }
  if (labId === 'neuro-mayo') {
    return mayoPapers.slice(0, 10);
  }
  // Return placeholder for other institutions
  return [placeholderPaper, placeholderPaper];
};

const NewResearch = () => {
  const [activeLab, setActiveLab] = useState(null);
  const [hoveredLab, setHoveredLab] = useState(null);

  const toggleLab = (idx) => {
    const newLab = idx === activeLab ? null : idx;
    setActiveLab(newLab);

    // Scroll to the specific institution card when clicking from map or card
    if (newLab !== null) {
      setTimeout(() => {
        const targetCard = document.querySelector(`[data-institution-id="${newLab}"]`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

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
                    r={activeLab === lab.id ? "12" : "8"}
                    fill={activeLab === lab.id ? "#2563eb" : "#3b82f6"}
                    className="map-marker"
                    onClick={() => toggleLab(lab.id)}
                    onMouseEnter={() => setHoveredLab(lab.id)}
                    onMouseLeave={() => setHoveredLab(null)}
                    style={{ cursor: 'pointer' }}
                  />
                  <circle
                    cx={lab.x}
                    cy={lab.y}
                    r={activeLab === lab.id ? "20" : "16"}
                    fill={activeLab === lab.id ? "#2563eb" : "#3b82f6"}
                    opacity="0.3"
                    className="map-marker-glow"
                    onClick={() => toggleLab(lab.id)}
                    onMouseEnter={() => setHoveredLab(lab.id)}
                    onMouseLeave={() => setHoveredLab(null)}
                    style={{ cursor: 'pointer' }}
                  />
                  {/* Tooltip */}
                  {hoveredLab === lab.id && (
                    <g className="map-tooltip">
                      <foreignObject
                        x={lab.x - 100}
                        y={lab.y - 50}
                        width="200"
                        height="40"
                      >
                        <div className="tooltip-content">
                          {lab.lab}
                        </div>
                      </foreignObject>
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </div>

        </div>

        {/* Institution list below map */}
        <div className="institution-list">
          <h3 className="section-heading">Major U.S. Neurosurgery Spine Research Programs</h3>
          <div className="institution-grid">
            <div className={`institution-item ${activeLab === 'neuro-barrow' ? 'active' : ''}`} onClick={() => toggleLab('neuro-barrow')} data-institution-id="neuro-barrow">
              <h4>Barrow Neurological Institute</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Phoenix, AZ
              </p>
              <p className="institution-description">Deformity and MIS spine research</p>
            </div>
            {activeLab === 'neuro-barrow' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {getPapersForLab('neuro-barrow').map((paper, i) => (
                    <a key={i} className="paper-card" href={paper.link} target="_blank" rel="noopener noreferrer">
                      <h5>{paper.title}</h5>
                      <p className="authors">{paper.author}</p>
                      <p className="date">
                        {new Date(paper.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'neuro-cleveland' ? 'active' : ''}`} onClick={() => toggleLab('neuro-cleveland')} data-institution-id="neuro-cleveland">
              <h4>Cleveland Clinic</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Cleveland, OH
              </p>
              <p className="institution-description">Deformity, cervical and lumbar outcomes, innovation</p>
            </div>
            {activeLab === 'neuro-cleveland' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {getPapersForLab('neuro-cleveland').map((paper, i) => (
                    <a key={i} className="paper-card" href={paper.link} target="_blank" rel="noopener noreferrer">
                      <h5>{paper.title}</h5>
                      <p className="authors">{paper.author}</p>
                      <p className="date">
                        {new Date(paper.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'neuro-hopkins' ? 'active' : ''}`} onClick={() => toggleLab('neuro-hopkins')} data-institution-id="neuro-hopkins">
              <h4>Johns Hopkins University</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Baltimore, MD
              </p>
              <p className="institution-description">Biomechanics, outcomes, and minimally invasive spine</p>
            </div>
            {activeLab === 'neuro-hopkins' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {getPapersForLab('neuro-hopkins').map((paper, i) => (
                    <a key={i} className="paper-card" href={paper.link} target="_blank" rel="noopener noreferrer">
                      <h5>{paper.title}</h5>
                      <p className="authors">{paper.author}</p>
                      <p className="date">
                        {new Date(paper.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'neuro-mgh' ? 'active' : ''}`} onClick={() => toggleLab('neuro-mgh')} data-institution-id="neuro-mgh">
              <h4>Massachusetts General Hospital / Harvard</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Boston, MA
              </p>
              <p className="institution-description">Registry-based outcomes and biomechanics</p>
            </div>
            {activeLab === 'neuro-mgh' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {getPapersForLab('neuro-mgh').map((paper, i) => (
                    <a key={i} className="paper-card" href={paper.link} target="_blank" rel="noopener noreferrer">
                      <h5>{paper.title}</h5>
                      <p className="authors">{paper.author}</p>
                      <p className="date">
                        {new Date(paper.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'neuro-mayo' ? 'active' : ''}`} onClick={() => toggleLab('neuro-mayo')} data-institution-id="neuro-mayo">
              <h4>Mayo Clinic (Rochester)</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Rochester, MN
              </p>
              <p className="institution-description">Deformity, outcomes registries, cost-effectiveness</p>
            </div>
            {activeLab === 'neuro-mayo' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {getPapersForLab('neuro-mayo').map((paper, i) => (
                    <a key={i} className="paper-card" href={paper.link} target="_blank" rel="noopener noreferrer">
                      <h5>{paper.title}</h5>
                      <p className="authors">{paper.author}</p>
                      <p className="date">
                        {new Date(paper.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'neuro-ucla' ? 'active' : ''}`} onClick={() => toggleLab('neuro-ucla')} data-institution-id="neuro-ucla">
              <h4>University of California, Los Angeles (UCLA)</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Los Angeles, CA
              </p>
              <p className="institution-description">Deformity and motion preservation</p>
            </div>
            {activeLab === 'neuro-ucla' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'neuro-ucsf' ? 'active' : ''}`} onClick={() => toggleLab('neuro-ucsf')} data-institution-id="neuro-ucsf">
              <h4>University of California, San Francisco (UCSF)</h4>
              <p className="institution-location">
                <MapPin size={14} />
                San Francisco, CA
              </p>
              <p className="institution-description">Deformity, scoliosis, translational spine work</p>
            </div>
            {activeLab === 'neuro-ucsf' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'neuro-miami' ? 'active' : ''}`} onClick={() => toggleLab('neuro-miami')} data-institution-id="neuro-miami">
              <h4>University of Miami (Miller / Jackson)</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Miami, FL
              </p>
              <p className="institution-description">Deformity, tumor, and trauma spine research</p>
            </div>
            {activeLab === 'neuro-miami' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'neuro-pitt' ? 'active' : ''}`} onClick={() => toggleLab('neuro-pitt')} data-institution-id="neuro-pitt">
              <h4>University of Pittsburgh</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Pittsburgh, PA
              </p>
              <p className="institution-description">Biomechanics and outcomes research</p>
            </div>
            {activeLab === 'neuro-pitt' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'neuro-vandy' ? 'active' : ''}`} onClick={() => toggleLab('neuro-vandy')} data-institution-id="neuro-vandy">
              <h4>Vanderbilt University Medical Center</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Nashville, TN
              </p>
              <p className="institution-description">Adult spinal deformity and outcomes lab (Zuckerman, Devin, etc.)</p>
            </div>
            {activeLab === 'neuro-vandy' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'neuro-washu' ? 'active' : ''}`} onClick={() => toggleLab('neuro-washu')} data-institution-id="neuro-washu">
              <h4>Washington University in St. Louis (Barnes-Jewish)</h4>
              <p className="institution-location">
                <MapPin size={14} />
                St. Louis, MO
              </p>
              <p className="institution-description">Large deformity and tumor outcomes</p>
            </div>
            {activeLab === 'neuro-washu' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <h3 className="section-heading">Major U.S. Orthopaedic Spine Research Programs</h3>
          <div className="institution-grid">
            <div className={`institution-item ${activeLab === 'ortho-duke' ? 'active' : ''}`} onClick={() => toggleLab('ortho-duke')} data-institution-id="ortho-duke">
              <h4>Duke University</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Durham, NC
              </p>
              <p className="institution-description">Biomechanics and clinical outcomes</p>
            </div>
            {activeLab === 'ortho-duke' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'ortho-emory' ? 'active' : ''}`} onClick={() => toggleLab('ortho-emory')} data-institution-id="ortho-emory">
              <h4>Emory University</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Atlanta, GA
              </p>
              <p className="institution-description">Tumor, deformity, registry research</p>
            </div>
            {activeLab === 'ortho-emory' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'ortho-hss' ? 'active' : ''}`} onClick={() => toggleLab('ortho-hss')} data-institution-id="ortho-hss">
              <h4>Hospital for Special Surgery (HSS, New York)</h4>
              <p className="institution-location">
                <MapPin size={14} />
                New York, NY
              </p>
              <p className="institution-description">Orthopaedic spine deformity, motion preservation, registry work</p>
            </div>
            {activeLab === 'ortho-hss' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'ortho-nyu' ? 'active' : ''}`} onClick={() => toggleLab('ortho-nyu')} data-institution-id="ortho-nyu">
              <h4>NYU Langone / Hospital for Joint Diseases</h4>
              <p className="institution-location">
                <MapPin size={14} />
                New York, NY
              </p>
              <p className="institution-description">Deformity, biologics, and outcomes</p>
            </div>
            {activeLab === 'ortho-nyu' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'ortho-rothman' ? 'active' : ''}`} onClick={() => toggleLab('ortho-rothman')} data-institution-id="ortho-rothman">
              <h4>Rothman Institute / Thomas Jefferson University (Philadelphia)</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Philadelphia, PA
              </p>
              <p className="institution-description">Big volume, outcomes and registry research</p>
            </div>
            {activeLab === 'ortho-rothman' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'ortho-rush' ? 'active' : ''}`} onClick={() => toggleLab('ortho-rush')} data-institution-id="ortho-rush">
              <h4>Rush University (Chicago)</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Chicago, IL
              </p>
              <p className="institution-description">Deformity and motion preservation</p>
            </div>
            {activeLab === 'ortho-rush' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'ortho-ucsd' ? 'active' : ''}`} onClick={() => toggleLab('ortho-ucsd')} data-institution-id="ortho-ucsd">
              <h4>UC San Diego (UCSD)</h4>
              <p className="institution-location">
                <MapPin size={14} />
                San Diego, CA
              </p>
              <p className="institution-description">Scoliosis, translational spine research</p>
            </div>
            {activeLab === 'ortho-ucsd' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'ortho-umn' ? 'active' : ''}`} onClick={() => toggleLab('ortho-umn')} data-institution-id="ortho-umn">
              <h4>University of Minnesota / Twin Cities</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Minneapolis, MN
              </p>
              <p className="institution-description">Biomechanics and deformity</p>
            </div>
            {activeLab === 'ortho-umn' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'ortho-washu' ? 'active' : ''}`} onClick={() => toggleLab('ortho-washu')} data-institution-id="ortho-washu">
              <h4>Washington University Orthopaedics (St. Louis)</h4>
              <p className="institution-location">
                <MapPin size={14} />
                St. Louis, MO
              </p>
              <p className="institution-description">Deformity and cervical spine research</p>
            </div>
            {activeLab === 'ortho-washu' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <h3 className="section-heading">Big Multicenter Collaboratives</h3>
          <div className="institution-grid">
            <div className={`institution-item ${activeLab === 'collab-ao' ? 'active' : ''}`} onClick={() => toggleLab('collab-ao')} data-institution-id="collab-ao">
              <h4>AO Spine</h4>
              <p className="institution-location">
                <MapPin size={14} />
                International
              </p>
              <p className="institution-description">International registry and randomized trials</p>
            </div>
            {activeLab === 'collab-ao' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'collab-csrs' ? 'active' : ''}`} onClick={() => toggleLab('collab-csrs')} data-institution-id="collab-csrs">
              <h4>CSRS (Cervical Spine Research Society)</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Multicenter
              </p>
              <p className="institution-description">Cervical deformity, motion preservation</p>
            </div>
            {activeLab === 'collab-csrs' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'collab-issg' ? 'active' : ''}`} onClick={() => toggleLab('collab-issg')} data-institution-id="collab-issg">
              <h4>ISSG (International Spine Study Group)</h4>
              <p className="institution-location">
                <MapPin size={14} />
                International
              </p>
              <p className="institution-description">Deformity outcomes</p>
            </div>
            {activeLab === 'collab-issg' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'collab-qod' ? 'active' : ''}`} onClick={() => toggleLab('collab-qod')} data-institution-id="collab-qod">
              <h4>N2QOD / QOD Registries</h4>
              <p className="institution-location">
                <MapPin size={14} />
                Multicenter
              </p>
              <p className="institution-description">Multicenter neurosurgery registry projects</p>
            </div>
            {activeLab === 'collab-qod' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className={`institution-item ${activeLab === 'collab-srs' ? 'active' : ''}`} onClick={() => toggleLab('collab-srs')} data-institution-id="collab-srs">
              <h4>SRS (Scoliosis Research Society)</h4>
              <p className="institution-location">
                <MapPin size={14} />
                International
              </p>
              <p className="institution-description">Deformity registry work</p>
            </div>
            {activeLab === 'collab-srs' && (
              <div className="expanded-papers">
                <div className="papers-scroll">
                  {[...Array(2)].map((_, i) => (
                    <a key={i} className="paper-card" href={placeholderPaper.link}>
                      <h5>{placeholderPaper.title}</h5>
                      <p className="authors">{placeholderPaper.authors}</p>
                      <p className="summary">{placeholderPaper.summary}</p>
                      <span className="view-link">View Paper →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewResearch;