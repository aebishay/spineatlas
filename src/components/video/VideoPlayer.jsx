import React, { useEffect } from 'react';
import { X, Calendar, Tag } from 'lucide-react';
import './VideoPlayer.css';

const VideoPlayer = ({ video, onClose, relatedVideos = [] }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!video) return null;

  return (
    <div className="video-player-overlay" onClick={onClose}>
      <div className="video-player-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="video-player-close" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Video Container */}
        <div className="video-player-container">
          <div className="video-embed-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-embed"
            />
          </div>
        </div>

        {/* Video Details */}
        <div className="video-player-details">
          <div className="video-player-header">
            <div className="video-player-badges">
              <span className="video-player-category">{video.category}</span>
              {video.subcategory && (
                <span className="video-player-subcategory">{video.subcategory}</span>
              )}
            </div>
            <h2 className="video-player-title">{video.title}</h2>
          </div>

          <div className="video-player-meta">
            <div className="video-player-meta-item">
              <Calendar size={16} />
              <span>Added {new Date(video.dateAdded).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="video-player-meta-item">
              <Tag size={16} />
              <span>{video.duration}</span>
            </div>
          </div>

          <div className="video-player-description">
            <h3>Description</h3>
            <p>{video.description}</p>
          </div>

          <div className="video-player-tags">
            <h4>Tags</h4>
            <div className="video-player-tag-list">
              {video.tags.map((tag, index) => (
                <span key={index} className="video-player-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Videos */}
          {relatedVideos.length > 0 && (
            <div className="video-player-related">
              <h3>Related Videos</h3>
              <div className="related-videos-list">
                {relatedVideos.map((relatedVideo) => (
                  <div
                    key={relatedVideo.id}
                    className="related-video-item"
                    onClick={() => {
                      onClose();
                      // Small delay to allow modal to close before opening new one
                      setTimeout(() => {
                        const event = new CustomEvent('openVideo', { detail: relatedVideo });
                        window.dispatchEvent(event);
                      }, 100);
                    }}
                  >
                    <img
                      src={relatedVideo.thumbnail}
                      alt={relatedVideo.title}
                      className="related-video-thumbnail"
                    />
                    <div className="related-video-info">
                      <h4 className="related-video-title">{relatedVideo.title}</h4>
                      <p className="related-video-duration">{relatedVideo.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
