import './SeminalPapers.css';
import { useState } from 'react';

const paperGroups = {
  "Deformity": [
    {
      title: 'SRS-Schwab Classification (2012)',
      authors: 'Schwab et al.',
      link: 'https://doi.org/10.3171/2012.7.SPINE12312',
      summary: 'A standardized framework for adult spinal deformity classification, integrating PI–LL mismatch, PT, and SVA.'
    },
    {
      title: 'Three-Column Osteotomy for Fixed Sagittal Imbalance (2008)',
      authors: 'Smith et al.',
      link: 'https://doi.org/10.1016/j.spinee.2007.09.003',
      summary: 'Seminal series detailing complication and outcome rates following aggressive correction for fixed sagittal malalignment.'
    },
    {
      title: 'The Ideal Lumbar Lordosis (2010)',
      authors: 'Roussouly et al.',
      link: 'https://doi.org/10.1016/j.spinee.2010.04.032',
      summary: 'Identified four sagittal spinal profiles and their relationship to alignment and surgical planning.'
    },
    {
      title: 'Pedicle Subtraction Osteotomy for Ankylosing Spondylitis (2002)',
      authors: 'Bridwell KH',
      link: 'https://doi.org/10.2106/00004623-200203000-00011',
      summary: 'Landmark description of PSO technique and outcomes for severe fixed sagittal deformity.'
    }
  ],

  "Degenerative": [
    {
      title: 'Lumbar Spinal Stenosis SPORT Trial (2008)',
      authors: 'Weinstein JN et al.',
      link: 'https://doi.org/10.1056/NEJMoa0707136',
      summary: 'Randomized controlled trial comparing surgical vs. nonsurgical treatment for spinal stenosis, showing surgical superiority at 2 years.'
    },
    {
      title: 'Disc Degeneration: Summary and Future Directions (2005)',
      authors: 'Luoma K et al.',
      link: 'https://doi.org/10.1097/01.brs.0000162280.95076.bb',
      summary: 'Comprehensive review of disc degeneration pathophysiology and natural history from longitudinal MRI studies.'
    },
    {
      title: 'Adjacent Segment Disease After Lumbar Fusion (2004)',
      authors: 'Park P et al.',
      link: 'https://doi.org/10.1097/01.brs.0000109992.98018.9e',
      summary: 'Key study establishing incidence and risk factors for adjacent segment degeneration after fusion.'
    }
  ],

  "Trauma": [
    {
      title: 'Thoracolumbar Injury Classification System (TLICS) (2005)',
      authors: 'Vaccaro AR et al.',
      link: 'https://doi.org/10.1097/01.brs.0000180479.99717.d5',
      summary: 'Evidence-based classification using morphology, neurologic status, and PLC integrity to guide treatment.'
    },
    {
      title: 'The AOSpine Classification of Thoracolumbar Spine Injuries (2013)',
      authors: 'Vaccaro AR et al.',
      link: 'https://doi.org/10.1007/s00586-013-2738-0',
      summary: 'Internationally validated comprehensive classification system for thoracolumbar trauma.'
    },
    {
      title: 'Cervical Spine Trauma: SLIC Score (2007)',
      authors: 'Vaccaro AR et al.',
      link: 'https://doi.org/10.3171/SPI-07/10/328',
      summary: 'Subaxial cervical spine injury classification system incorporating morphology, discoligamentous complex, and neurology.'
    }
  ],

  "Tumor": [
    {
      title: 'Total En Bloc Spondylectomy for Spinal Tumors (1997)',
      authors: 'Tomita K et al.',
      link: 'https://doi.org/10.1016/S0020-1383(97)00102-6',
      summary: 'Pioneering technique for complete vertebral resection achieving wide margins in primary spinal tumors.'
    },
    {
      title: 'Spinal Instability Neoplastic Score (SINS) (2010)',
      authors: 'Fisher CG et al.',
      link: 'https://doi.org/10.1097/BRS.0b013e3181ce3ae7',
      summary: 'Validated scoring system to assess mechanical instability in patients with spinal metastases.'
    },
    {
      title: 'Neurologic, Functional, and Quality-of-Life Outcomes After Metastatic Disease (2005)',
      authors: 'Patchell RA et al.',
      link: 'https://doi.org/10.1016/S0140-6736(05)66954-1',
      summary: 'Randomized trial demonstrating superiority of surgery plus radiation vs. radiation alone for spinal metastases.'
    }
  ],

  "Infection": [
    {
      title: 'Pyogenic Vertebral Osteomyelitis: Treatment Principles (2006)',
      authors: 'Guerado E, Cerván AM',
      link: 'https://doi.org/10.1007/s00264-011-1304-4',
      summary: 'Comprehensive review of diagnosis, antibiotic management, and surgical indications for spinal infections.'
    },
    {
      title: 'Surgical Site Infection After Spine Surgery (2014)',
      authors: 'Pull ter Gunne AF et al.',
      link: 'https://doi.org/10.1097/BRS.0b013e3182a42a68',
      summary: 'Meta-analysis identifying risk factors and prevention strategies for postoperative spinal infections.'
    }
  ],

  "Cervical Spine": [
    {
      title: 'Anterior Cervical Discectomy and Fusion Outcomes (1999)',
      authors: 'Bohlman HH et al.',
      link: 'https://doi.org/10.2106/00004623-199311000-00005',
      summary: 'Long-term outcomes of ACDF establishing it as gold standard for cervical radiculopathy and myelopathy.'
    },
    {
      title: 'Cervical Spondylotic Myelopathy Natural History (2013)',
      authors: 'Fehlings MG et al.',
      link: 'https://doi.org/10.1097/BRS.0b013e3182a7f478',
      summary: 'Landmark study defining natural history and surgical timing for degenerative cervical myelopathy.'
    },
    {
      title: 'Ossification of the Posterior Longitudinal Ligament (OPLL) (2001)',
      authors: 'Matsunaga S et al.',
      link: 'https://doi.org/10.1097/00007632-200105010-00011',
      summary: 'Comprehensive analysis of OPLL pathophysiology, classification, and surgical approaches.'
    }
  ],

  "Minimally Invasive": [
    {
      title: 'MIS TLIF Outcomes and Complications (2006)',
      authors: 'Foley KT et al.',
      link: 'https://doi.org/10.3171/spi.2006.5.4.309',
      summary: 'Pioneering series establishing safety and efficacy of minimally invasive transforaminal lumbar interbody fusion.'
    },
    {
      title: 'Lateral Lumbar Interbody Fusion Technique (2006)',
      authors: 'Ozgur BM et al.',
      link: 'https://doi.org/10.1016/j.spinee.2005.10.004',
      summary: 'Original description of the lateral retroperitoneal approach for interbody fusion.'
    }
  ]
};

const SeminalPapers = () => {
  const [search, setSearch] = useState('');
  const [expandedTopics, setExpandedTopics] = useState({});

  const toggleTopic = (topic) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topic]: !prev[topic]
    }));
  };

  const filterPapers = (papers) =>
    papers.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.authors.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <section className="seminal-section">
      <div className="seminal-container">
        <h2 className="seminal-title">Seminal Papers</h2>
        <p className="seminal-subtitle">
          Foundational studies that shaped the field of spine surgery and deformity correction.
        </p>

        <input
          className="seminal-search"
          type="text"
          placeholder="Search by keyword, author, or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {Object.entries(paperGroups).map(([topic, papers]) => {
          const filtered = filterPapers(papers);
          if (filtered.length === 0) return null;
          const isExpanded = expandedTopics[topic];

          return (
            <div key={topic} className="paper-topic">
              <h3 onClick={() => toggleTopic(topic)} className="topic-header">
                <span>{topic}</span>
                <span className="toggle-icon">{isExpanded ? '−' : '+'}</span>
              </h3>
              {isExpanded && (
                <div className="paper-scroll-container">
                  <div className="paper-grid">
                    {filtered.map((paper, idx) => (
                      <a
                        key={idx}
                        className="paper-card"
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h4>{paper.title}</h4>
                        <p className="authors">{paper.authors}</p>
                        <p className="summary">{paper.summary}</p>
                        <span className="view-link">View Paper →</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SeminalPapers;