import React from 'react';
import { Play, Clock } from 'lucide-react';
import './VideoCard.css';

const VideoCard = ({ video, onClick }) => {
  return (
    <div className="video-card" onClick={() => onClick(video)}>
      <div className="video-card-content">
        <div className="video-card-header">
          <span className="video-category-badge">{video.category}</span>
          {video.subcategory && (
            <span className="video-subcategory">{video.subcategory}</span>
          )}
          <div className="video-duration">
            <Clock size={14} />
            <span>{video.duration}</span>
          </div>
        </div>

        <h3 className="video-title">{video.title}</h3>
        <p className="video-description">{video.description}</p>

        <div className="video-tags">
          {video.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="video-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
