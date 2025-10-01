import React, { useState, useEffect } from 'react';
import { Video, Search, X } from 'lucide-react';
import VideoCard from './video/VideoCard';
import VideoPlayer from './video/VideoPlayer';
import VideoSidebar from './video/VideoSidebar';
import videoData from '../data/videoLibrary.json';
import './VideoLibraryNew.css';

const VideoLibraryNew = () => {
  const [allVideos] = useState(videoData);
  const [filteredVideos, setFilteredVideos] = useState(videoData);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Handle video card click
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
  };

  // Handle player close
  const handlePlayerClose = () => {
    setIsPlayerOpen(false);
    // Delay clearing selected video to allow close animation
    setTimeout(() => setSelectedVideo(null), 300);
  };

  // Get related videos based on category and tags
  const getRelatedVideos = (video) => {
    if (!video) return [];

    return allVideos
      .filter(v => v.id !== video.id)
      .filter(v =>
        v.category === video.category ||
        v.tags.some(tag => video.tags.includes(tag))
      )
      .slice(0, 3);
  };

  // Handle search from header
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Listen for custom event to open video (from related videos)
  useEffect(() => {
    const handleOpenVideo = (e) => {
      handleVideoClick(e.detail);
    };

    window.addEventListener('openVideo', handleOpenVideo);
    return () => window.removeEventListener('openVideo', handleOpenVideo);
  }, []);

  return (
    <div className="video-library-new">
      {/* Header */}
      <header className="video-library-header">
        <div className="video-library-header-content">
          <h1 className="video-library-title">Operative Video Library</h1>
          <p className="video-library-subtitle">
            High-quality surgical footage categorized by pathology and technique.
          </p>

          {/* Search Bar in Header */}
          <div className="video-library-header-search">
            <div className="video-header-search-container">
              <Search className="header-search-icon" size={20} />
              <input
                type="text"
                placeholder="Search videos by title, description, or tags..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="video-header-search-input"
              />
              {searchTerm && (
                <button className="header-search-clear" onClick={handleClearSearch}>
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="video-library-container">
        {/* Sidebar */}
        <aside className="video-library-sidebar">
          <VideoSidebar
            videos={allVideos}
            onFilterChange={setFilteredVideos}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </aside>

        {/* Video Grid */}
        <main className="video-library-main">
          {filteredVideos.length > 0 ? (
            <div className="video-grid">
              {filteredVideos.map(video => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={handleVideoClick}
                />
              ))}
            </div>
          ) : (
            <div className="video-library-empty">
              <Video size={64} className="empty-icon" />
              <h3>No videos found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </main>
      </div>

      {/* Video Player Modal */}
      {isPlayerOpen && selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={handlePlayerClose}
          relatedVideos={getRelatedVideos(selectedVideo)}
        />
      )}
    </div>
  );
};

export default VideoLibraryNew;
