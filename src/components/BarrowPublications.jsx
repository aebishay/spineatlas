import React, { useState, useEffect } from 'react';
import RecentPapers from './RecentPapers';
import { fetchRSSFeed } from '../utils/rssFeedParser';
import barrowPapersStatic from '../data/barrowPapers.json';

/**
 * BarrowPublications - Example page showing Barrow Neurological Institute publications
 *
 * This component demonstrates two approaches:
 * 1. Using pre-fetched static JSON data (faster, no CORS issues)
 * 2. Dynamically fetching from RSS feed (requires CORS proxy or backend)
 */
const BarrowPublications = () => {
  const [papers, setPapers] = useState(barrowPapersStatic);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useStatic, setUseStatic] = useState(true);

  const RSS_FEED_URL = 'https://pubmed.ncbi.nlm.nih.gov/rss/search/1fmfIeN4X5QaHfwLTMrvfbsQp6BuAvsIkzEkjuo7xIBqG4TMVB/?limit=20&utm_campaign=pubmed-2&fc=20251001143945';

  // Function to fetch fresh data from RSS feed
  const loadFromRSS = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedPapers = await fetchRSSFeed(RSS_FEED_URL, 10);
      if (fetchedPapers.length > 0) {
        setPapers(fetchedPapers);
        setUseStatic(false);
      } else {
        setError('No papers found in RSS feed');
      }
    } catch (err) {
      setError('Failed to load RSS feed. Using cached data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Switch back to static data
  const loadStatic = () => {
    setPapers(barrowPapersStatic);
    setUseStatic(true);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Barrow Neurological Institute
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Latest Spine Surgery Research Publications
          </p>

          {/* Toggle Buttons - For demonstration purposes */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={loadStatic}
              disabled={useStatic}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                useStatic
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Use Cached Data
            </button>
            <button
              onClick={loadFromRSS}
              disabled={loading || !useStatic}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                !useStatic
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } disabled:opacity-50`}
            >
              {loading ? 'Loading...' : 'Fetch from RSS'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-md mx-auto bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Info Note */}
          <p className="text-sm text-gray-500 mt-4">
            {useStatic
              ? 'Displaying cached publications from JSON file'
              : 'Displaying live data from PubMed RSS feed'}
          </p>
        </div>

        {/* Recent Papers Component */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading publications...</p>
          </div>
        ) : (
          <RecentPapers
            papers={papers}
            limit={10}
            title="Recent Publications"
          />
        )}
      </div>
    </div>
  );
};

export default BarrowPublications;
