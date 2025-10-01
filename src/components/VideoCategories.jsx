import './VideoCategories.css';

const categories = [
  {
    title: 'Deformity Surgery',
    description: 'Techniques in three-column osteotomy, rod contouring, and correction strategies.',
    count: 0,
  },
  {
    title: 'Degenerative Spine',
    description: 'MIS decompression, TLIFs, ALIFs, and lateral approaches.',
    count: 9,
  },
  {
    title: 'Tumor & Oncology',
    description: 'En bloc spondylectomy, vertebral reconstruction, and staging workflows.',
    count: 6,
  },
  {
    title: 'Spinal Trauma',
    description: 'Instrumentation techniques for unstable fractures, corpectomies, and trauma exposure.',
    count: 7,
  },
  {
    title: 'Pediatric Spine',
    description: 'Craniosynostosis repair, early onset scoliosis, and pediatric-specific hardware.',
    count: 5,
  },
];

const VideoCategories = () => {
  return (
    <section className="video-section">
      <div className="video-container">
        <h2 className="video-title">Operative Video Library</h2>
        <p className="video-subtitle">
          High-quality surgical footage categorized by pathology and technique.
        </p>

        <div className="video-grid">
          {categories.map((cat, index) => (
            <div key={index} className="video-card">
              <div className="video-card-content">
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
              </div>
              <span className="video-count">{cat.count} videos →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoCategories;
