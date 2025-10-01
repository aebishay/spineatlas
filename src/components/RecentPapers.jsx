import React from 'react';
import { ExternalLink, Calendar, User } from 'lucide-react';

/**
 * RecentPapers - A reusable component for displaying recent publications from RSS feeds
 *
 * @param {Object} props
 * @param {Array} props.papers - Array of paper objects with structure:
 *   - title: string (paper title)
 *   - author: string (first author et al.)
 *   - link: string (PubMed URL or DOI)
 *   - date: string (YYYY-MM-DD format)
 * @param {number} props.limit - Maximum number of papers to display (default: 10)
 * @param {string} props.title - Section title (default: "Recent Publications")
 */
const RecentPapers = ({ papers, limit = 10, title = "Recent Publications" }) => {
  // Get the most recent papers up to the limit
  const displayPapers = papers.slice(0, limit);

  // Format date to be more readable (e.g., "Sep 27, 2025")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <div className="h-1 w-20 bg-blue-600 rounded"></div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayPapers.map((paper, index) => (
          <a
            key={index}
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-400 hover:-translate-y-1"
          >
            {/* Paper Title */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors flex-1 pr-2">
                {paper.title}
              </h3>
              <ExternalLink
                size={18}
                className="text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1"
              />
            </div>

            {/* Author */}
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <User size={14} className="mr-2 text-gray-400" />
              <span className="font-medium">{paper.author}</span>
            </div>

            {/* Date */}
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={14} className="mr-2 text-gray-400" />
              <span>{formatDate(paper.date)}</span>
            </div>
          </a>
        ))}
      </div>

      {/* Show message if no papers available */}
      {displayPapers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No publications available at this time.</p>
        </div>
      )}
    </div>
  );
};

export default RecentPapers;
