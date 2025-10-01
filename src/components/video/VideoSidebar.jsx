import React, { useState, useMemo, useEffect } from 'react';
import { X, Filter } from 'lucide-react';
import './VideoSidebar.css';

const VideoSidebar = ({ videos, onFilterChange, searchTerm = '', selectedCategory: propCategory = 'All', onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(propCategory);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Sync with prop changes
  useEffect(() => {
    setSelectedCategory(propCategory);
  }, [propCategory]);

  // Extract unique categories and tags from videos
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(videos.map(v => v.category))];
    return cats.sort();
  }, [videos]);

  const allTags = useMemo(() => {
    const tags = new Set();
    videos.forEach(video => {
      video.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [videos]);

  // Apply filters whenever dependencies change
  useEffect(() => {
    let filtered = videos;

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        video =>
          video.title.toLowerCase().includes(searchLower) ||
          video.description.toLowerCase().includes(searchLower) ||
          video.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(video =>
        selectedTags.every(tag => video.tags.includes(tag))
      );
    }

    onFilterChange(filtered);
  }, [searchTerm, selectedCategory, selectedTags, videos, onFilterChange]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  const handleTagToggle = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedTags([]);
    if (onCategoryChange) {
      onCategoryChange('All');
    }
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || selectedTags.length > 0;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <button
        className="video-sidebar-mobile-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Filter size={20} />
        <span>Filters</span>
        {hasActiveFilters && <span className="filter-badge">{
          (selectedCategory !== 'All' ? 1 : 0) +
          selectedTags.length +
          (searchTerm ? 1 : 0)
        }</span>}
      </button>

      {/* Sidebar */}
      <div className={`video-sidebar ${isMobileOpen ? 'video-sidebar-open' : ''}`}>
        <div className="video-sidebar-content">
          {/* Mobile Close Button */}
          <button
            className="video-sidebar-close"
            onClick={() => setIsMobileOpen(false)}
          >
            <X size={24} />
          </button>

          {/* Categories */}
          <div className="video-sidebar-section">
            <h3 className="video-sidebar-title">Categories</h3>
            <div className="video-categories-list">
              {categories.map(category => (
                <button
                  key={category}
                  className={`video-category-button ${
                    selectedCategory === category ? 'active' : ''
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="video-sidebar-section">
            <h3 className="video-sidebar-title">Tags</h3>
            <div className="video-tags-list">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`video-tag-button ${
                    selectedTags.includes(tag) ? 'active' : ''
                  }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              className="video-clear-filters"
              onClick={handleClearFilters}
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="video-sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default VideoSidebar;
