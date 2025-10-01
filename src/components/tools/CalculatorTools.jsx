import './CalculatorTools.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Spline,
  Activity,
  AlertCircle,
  Stethoscope,
  Siren,
  Calculator,
  Droplet,
  Frown,
  Search,
  PersonStanding,
  ClipboardList
} from 'lucide-react';

const categoryIcons = {
  'Deformity & Alignment': Spline,
  'Myelopathy & Functional Scales': PersonStanding,
  'Trauma & Injury Classification': ClipboardList,
  'Spinal Cord Injury': Activity,
  'Tumor & Oncology': Stethoscope,
  'Surgical Risk & Complications': Siren,
  'Intraoperative Planning': Calculator,
  'Pain & Disability Scales': Frown
};

const tools = [
  // Deformity & Alignment
  {
  name: 'GAP Score',
  category: 'Deformity & Alignment',
  description: 'Global Alignment and Proportion score for predicting mechanical complications after ASD surgery'
},
{
  name: 'SRS-Schwab Classification',
  category: 'Deformity & Alignment',
  description: 'Standardized adult spinal deformity classification system using PI–LL mismatch, pelvic tilt, and sagittal vertical axis'
},
{
  name: 'PI–LL Mismatch',
  category: 'Deformity & Alignment',
  description: 'Difference between pelvic incidence and lumbar lordosis, used to assess sagittal alignment in spinal deformity surgery'
},




  // Myelopathy & Functional Scales
  { name: 'Modified Japanese Orthopaedic Association (mJOA)', category: 'Myelopathy & Functional Scales', description: 'Score for cervical myelopathy severity' },
  { name: 'Nurick Grade', category: 'Myelopathy & Functional Scales', description: 'Functional grading for cervical myelopathy' },

  // Trauma & Injury Classification
  { name: 'TLICS', category: 'Trauma & Injury Classification', description: 'Thoracolumbar Injury Classification and Severity Score' },
  { name: 'AOSpine TL Injury', category: 'Trauma & Injury Classification', description: 'AO Spine Thoracolumbar Injury Classification' },
  { name: 'AOSpine Cervical', category: 'Trauma & Injury Classification', description: 'AO Spine Subaxial Cervical Spine Classification' },

  // Spinal Cord Injury
  { name: 'ASIA', category: 'Spinal Cord Injury', description: 'ASIA Impairment Scale for spinal cord injury' },
  { name: 'Frankel Grade', category: 'Spinal Cord Injury', description: 'Neurological function grading for spinal cord injury' },
  { name: 'Spinal Shock', category: 'Spinal Cord Injury', description: 'Criteria for spinal shock and resolution' },

  // Tumor & Oncology
  { name: 'SINS', category: 'Tumor & Oncology', description: 'Spinal Instability Neoplastic Score' },

  // Surgical Risk & Complications
  { name: 'Charlson Comorbidity Index', category: 'Surgical Risk & Complications', description: 'Predicts 10-year survival in patients with multiple comorbidities' },
  { name: 'Clavien-Dindo', category: 'Surgical Risk & Complications', description: 'Surgical complication classification system' },

  // Intraoperative Planning
  { name: 'EBL Estimator', category: 'Intraoperative Planning', description: 'Estimated blood loss calculator based on levels and osteotomies' },

  // Pain & Disability Scales
  { name: 'Oswestry Disability Index (ODI)', category: 'Pain & Disability Scales', description: 'Quantifies disability from low back pain' },
  { name: 'VAS Pain Scale', category: 'Pain & Disability Scales', description: 'Visual analog scale for pain assessment' },

  // Other / Experimental
  // (Leave this empty or drop AI predictors, radiograph auto-measure later)
];

function CalculatorTools() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const grouped = filteredTools.reduce((acc, tool) => {
    acc[tool.category] = acc[tool.category] || [];
    acc[tool.category].push(tool);
    return acc;
  }, {});

  const routeMap = {
    'TLICS': '/tools/tlics',
    'SINS': '/tools/sins',
    'ASIA': '/tools/asia',
    'VAS Pain Scale': '/tools/vas',
    'Charlson Comorbidity Index': '/tools/charlson',
    'Spinal Shock': '/tools/spinal-shock',
    'Modified Japanese Orthopaedic Association (mJOA)': '/tools/mjoa',
    'Frankel Grade': '/tools/frankel',
    'AOSpine TL Injury': '/tools/ao-thoracolumbar',
    'Nurick Grade': '/tools/nurick',
    'Clavien-Dindo': '/tools/clavien-dindo',
    'Oswestry Disability Index (ODI)': '/tools/odi',
    'EBL Estimator': '/tools/ebl-estimator',
    'AOSpine Cervical': '/tools/ao-cervical',
    'GAP Score': '/tools/gap-score',
'SRS-Schwab Classification': '/tools/srs-schwab',
'PI–LL Mismatch': '/tools/pi-ll-mismatch',

  };

  return (
    <section className="tools-section">
      <h2 className="tools-title">Calculators</h2>
      <p className="tools-subtitle">
        Visual calculators and classification systems to support clinical decision-making in spine surgery.
      </p>

     <div className="search-wrapper">
  <div className="search-input-wrapper">
    <Search className="search-icon" size={20} />
    <input
      type="text"
      placeholder="Search calculators and classification systems..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
  </div>
  {searchTerm && (
    <div className="autocomplete-dropdown">
      {filteredTools.slice(0, 5).map((tool, index) => (
        <div
          key={index}
          className="autocomplete-item"
          onClick={() => {
            const route = routeMap[tool.name];
            if (route) navigate(route);
          }}
        >
          <strong>{tool.name}</strong>
          <span className="autocomplete-category">{tool.category}</span>
        </div>
      ))}
      {filteredTools.length === 0 && (
        <div className="autocomplete-item no-result">No matches found</div>
      )}
    </div>
  )}
</div>

      {Object.entries(grouped).map(([category, items]) => {
        const IconComponent = categoryIcons[category] || Calculator;
        return (
        <div key={category} className="tool-category">
         <h3
  className="category-title clickable"
  onClick={() => toggleCategory(category)}
>
  <div className="category-label-with-icon">
    <IconComponent className="category-icon" size={28} />
    <span className="category-label">{category}</span>
  </div>
  <span className="toggle-icon">{openCategories[category] ? '−' : '+'}</span>
</h3>
          {openCategories[category] && (
           
             <div className="tools-grid-wrapper">
    <div className="tools-grid">
      {items.map((tool, index) => (
        <div className="tool-card" key={index}>
          <h3>{tool.name}</h3>
          <p>{tool.description}</p>
          <button
            className="tool-button"
            onClick={() => navigate(routeMap[tool.name] || '#')}
          >
            Launch
          </button>
        </div>
      ))}
    </div>
  </div>
)}
        </div>
      );
      })}
    </section>
  );
}

export default CalculatorTools;