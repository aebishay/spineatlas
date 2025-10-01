/**
 * Update Papers Script
 *
 * This script fetches the latest papers from PubMed RSS feeds and updates the JSON files.
 *
 * Usage:
 *   node scripts/updatePapers.js
 *
 * Or add to package.json:
 *   "update-papers": "node scripts/updatePapers.js"
 * Then run: npm run update-papers
 */

const fs = require('fs');
const path = require('path');

// RSS Feed URLs for each institution
const RSS_FEEDS = {
  'barrow': 'https://pubmed.ncbi.nlm.nih.gov/rss/search/1fmfIeN4X5QaHfwLTMrvfbsQp6BuAvsIkzEkjuo7xIBqG4TMVB/?limit=20&utm_campaign=pubmed-2&fc=20251001143945',
  'hopkins': 'https://pubmed.ncbi.nlm.nih.gov/rss/search/1pMPQVclnMM-hpDMUjT6IHHkPCzoicewaMG_03DDXT9nGoiMg3/?limit=15&utm_campaign=pubmed-2&fc=20251001144803',
  // Add more institutions here as you add them
};

/**
 * Fetches and parses an RSS feed
 */
async function fetchRSSFeed(feedUrl, limit = 10) {
  try {
    const response = await fetch(feedUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const xmlText = await response.text();

    // Use a simple XML parser (requires JSDOM in Node.js environment)
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(xmlText, { contentType: 'text/xml' });
    const xmlDoc = dom.window.document;

    const items = xmlDoc.querySelectorAll('item');
    const papers = [];

    for (let i = 0; i < Math.min(items.length, limit); i++) {
      const item = items[i];

      // Extract title
      const titleElement = item.querySelector('title');
      const title = titleElement ? titleElement.textContent.trim() : 'Untitled';

      // Extract link
      const linkElement = item.querySelector('link');
      const link = linkElement ? linkElement.textContent.trim() : '#';

      // Extract authors
      const authorElement = item.querySelector('dc\\:creator, creator, author');
      let author = 'Unknown';
      if (authorElement) {
        const authorText = authorElement.textContent.trim();
        const firstAuthor = authorText.split(',')[0].trim();
        author = `${firstAuthor} et al.`;
      }

      // Extract publication date
      const dateElement = item.querySelector('pubDate, dc\\:date, date');
      let date = new Date().toISOString().split('T')[0];
      if (dateElement) {
        const pubDate = new Date(dateElement.textContent.trim());
        if (!isNaN(pubDate)) {
          date = pubDate.toISOString().split('T')[0];
        }
      }

      papers.push({ title, author, link, date });
    }

    return papers;
  } catch (error) {
    console.error(`Error fetching RSS feed: ${error.message}`);
    return null;
  }
}

/**
 * Updates all paper JSON files
 */
async function updateAllPapers() {
  console.log('🔄 Starting paper updates...\n');

  const dataDir = path.join(__dirname, '..', 'src', 'data');

  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  let successCount = 0;
  let failCount = 0;

  for (const [institution, feedUrl] of Object.entries(RSS_FEEDS)) {
    console.log(`📡 Fetching ${institution} papers...`);

    const papers = await fetchRSSFeed(feedUrl, 10);

    if (papers && papers.length > 0) {
      const filePath = path.join(dataDir, `${institution}Papers.json`);
      fs.writeFileSync(filePath, JSON.stringify(papers, null, 2));
      console.log(`✅ Updated ${institution}Papers.json (${papers.length} papers)\n`);
      successCount++;
    } else {
      console.log(`❌ Failed to fetch ${institution} papers\n`);
      failCount++;
    }
  }

  console.log('─────────────────────────────────');
  console.log(`✨ Update complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
  console.log(`   Last updated: ${new Date().toLocaleString()}`);
  console.log('─────────────────────────────────');
}

// Run the update
updateAllPapers().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
