/**
 * RSS Feed Parser Utility
 *
 * This utility fetches and parses PubMed RSS feeds (or other RSS feeds)
 * and converts them into a standardized JSON format for use with RecentPapers component.
 */

/**
 * Fetches and parses an RSS feed from PubMed
 *
 * @param {string} feedUrl - The RSS feed URL
 * @param {number} limit - Maximum number of entries to return (default: 10)
 * @returns {Promise<Array>} Array of paper objects with structure:
 *   - title: string
 *   - author: string (first author et al.)
 *   - link: string
 *   - date: string (YYYY-MM-DD)
 */
export const fetchRSSFeed = async (feedUrl, limit = 10) => {
  try {
    // Fetch the RSS feed
    const response = await fetch(feedUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
    }

    // Parse the XML
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    // Check for parsing errors
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      throw new Error('Error parsing RSS feed XML');
    }

    // Extract items
    const items = xmlDoc.querySelectorAll('item');
    const papers = [];

    // Process each item (up to limit)
    for (let i = 0; i < Math.min(items.length, limit); i++) {
      const item = items[i];

      // Extract title
      const titleElement = item.querySelector('title');
      const title = titleElement ? titleElement.textContent.trim() : 'Untitled';

      // Extract link
      const linkElement = item.querySelector('link');
      const link = linkElement ? linkElement.textContent.trim() : '#';

      // Extract authors (dc:creator or author field)
      const authorElement = item.querySelector('creator, author');
      let author = 'Unknown';
      if (authorElement) {
        const authorText = authorElement.textContent.trim();
        // Extract first author's last name
        const firstAuthor = authorText.split(',')[0].trim();
        author = `${firstAuthor} et al.`;
      }

      // Extract publication date
      const dateElement = item.querySelector('pubDate, dc\\:date, date');
      let date = new Date().toISOString().split('T')[0]; // Default to today
      if (dateElement) {
        const pubDate = new Date(dateElement.textContent.trim());
        if (!isNaN(pubDate)) {
          date = pubDate.toISOString().split('T')[0]; // YYYY-MM-DD format
        }
      }

      papers.push({
        title,
        author,
        link,
        date
      });
    }

    return papers;
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    return [];
  }
};

/**
 * Converts RSS feed data to the format expected by RecentPapers component
 * This is useful if you have RSS data from another source
 *
 * @param {Array} items - Array of RSS item objects
 * @param {number} limit - Maximum number to process
 * @returns {Array} Formatted papers array
 */
export const formatRSSItems = (items, limit = 10) => {
  return items.slice(0, limit).map(item => ({
    title: item.title || 'Untitled',
    author: item.author || 'Unknown et al.',
    link: item.link || '#',
    date: item.date || new Date().toISOString().split('T')[0]
  }));
};

export default { fetchRSSFeed, formatRSSItems };
